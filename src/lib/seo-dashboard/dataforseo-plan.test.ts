import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  estimateLlm,
  estimateMaps,
  estimateSerp,
  gridPoints,
  isDue,
  opportunityScore,
  OUR_GBP_CID,
  parseLlm,
  parseMapsRank,
  parseSerp,
  settledLlmCost,
} from "./dataforseo-plan";

const NOW = new Date("2026-10-20T03:00:00Z");

describe("isDue", () => {
  it("runs any job that has never run", () => {
    assert.equal(isDue("serp", null, NOW), true);
    assert.equal(isDue("backlinks", null, NOW), true);
  });

  it("runs SERP weekly", () => {
    assert.equal(isDue("serp", "2026-10-14", NOW), false); // 6 days
    assert.equal(isDue("serp", "2026-10-13", NOW), true); // 7 days
  });

  it("runs monthly jobs once per calendar month", () => {
    assert.equal(isDue("maps", "2026-10-01", NOW), false);
    assert.equal(isDue("maps", "2026-09-30", NOW), true);
    assert.equal(isDue("llm", "2026-10-19", NOW), false);
  });
});

describe("cost estimates", () => {
  it("prices the weekly SERP batch at depth 100 with async AI Overview", () => {
    // 25 keywords × (10 pages × 0.0006 + 0.0006) = 0.165, matching the
    // charge DataForSEO reported for the 2026-10-04 baseline.
    assert.equal(Number(estimateSerp(25).toFixed(4)), 0.165);
  });

  it("prices the map grid per point", () => {
    assert.equal(Number(estimateMaps(4, 27).toFixed(4)), 0.0648);
  });

  it("prices both LLM engines per prompt", () => {
    assert.equal(Number(estimateLlm(25).toFixed(3)), 1.05);
  });
});

describe("gridPoints", () => {
  const pts = gridPoints({ center: "Kothrud", lat: 18.5074, lng: 73.8077, radiusKm: 5 });

  it("returns a 3×3 lattice with the centre at index 4", () => {
    assert.equal(pts.length, 9);
    assert.equal(pts[4].label, "Kothrud#4");
    assert.equal(pts[4].lat, 18.5074);
    assert.equal(pts[4].lng, 73.8077);
  });

  it("puts north on the top row and spaces points half a radius apart", () => {
    assert.ok(pts[0].lat > pts[4].lat && pts[8].lat < pts[4].lat);
    assert.ok(pts[0].lng < pts[4].lng && pts[2].lng > pts[4].lng);
    const kmNorth = (pts[1].lat - pts[4].lat) * 111.32;
    assert.ok(Math.abs(kmNorth - 2.5) < 0.01);
  });
});

describe("parseSerp", () => {
  const result = {
    items: [
      {
        type: "ai_overview",
        references: [{ domain: "www.sevenmentor.com" }],
        items: [{ type: "ai_overview_element", references: [{ domain: "archerinfotech.in" }] }],
      },
      { type: "local_pack", title: "SevenMentor", domain: "sevenmentor.com", cid: "1" },
      { type: "local_pack", title: "Archer Infotech", domain: "archerinfotech.in", cid: OUR_GBP_CID },
      { type: "organic", rank_group: 1, domain: "www.justdial.com", url: "https://www.justdial.com/x" },
      { type: "organic", rank_group: 2, domain: "www.archerinfotech.in", url: "https://archerinfotech.in/" },
    ],
  };

  it("finds our organic position, ignoring www", () => {
    const s = parseSerp(result);
    assert.equal(s.ourPosition, 2);
    assert.equal(s.ourUrl, "https://archerinfotech.in/");
    assert.deepEqual(s.top10, ["justdial.com", "archerinfotech.in"]);
  });

  it("reads AI Overview citations from nested references", () => {
    const s = parseSerp(result);
    assert.equal(s.aioPresent, true);
    assert.equal(s.aioCitesUs, true);
    assert.deepEqual(s.aioDomains, ["archerinfotech.in", "sevenmentor.com"]);
  });

  it("spots us in the local pack", () => {
    const s = parseSerp(result);
    assert.equal(s.localPackPresent, true);
    assert.equal(s.localPackUs, true);
  });

  it("reports null (not zero) when we don't rank", () => {
    const s = parseSerp({ items: [{ type: "organic", rank_group: 1, domain: "x.com" }] });
    assert.equal(s.ourPosition, null);
    assert.equal(s.aioPresent, false);
    assert.equal(parseSerp(null).resultsCount, 0);
  });
});

describe("parseMapsRank", () => {
  it("matches our listing by GBP CID", () => {
    const r = parseMapsRank({
      items: [
        { type: "maps_search", rank_group: 1, title: "Nadkarni", cid: "9" },
        { type: "maps_search", rank_group: 7, title: "Some name", cid: OUR_GBP_CID },
      ],
    });
    assert.deepEqual(r, { rank: 7, resultsCount: 2 });
  });

  it("returns null when we're not listed", () => {
    assert.deepEqual(parseMapsRank({ items: [{ type: "maps_search", rank_group: 1, title: "X" }] }), {
      rank: null,
      resultsCount: 1,
    });
  });
});

describe("parseLlm", () => {
  it("detects a mention and a citation, and strips the utm tag", () => {
    const l = parseLlm({
      items: [
        { type: "reasoning", sections: [{ text: "thinking about Archer Infotech" }] },
        {
          type: "message",
          sections: [
            {
              text: "Try **Archer Infotech** in Kothrud.",
              annotations: [
                { url: "https://archerinfotech.in/courses?utm_source=openai" },
                { url: "https://www.justdial.com/Pune" },
              ],
            },
          ],
        },
      ],
    });
    assert.equal(l.mentioned, true);
    assert.equal(l.cited, true);
    assert.equal(l.citedUrl, "https://archerinfotech.in/courses");
    assert.deepEqual(l.sourceDomains, ["archerinfotech.in", "justdial.com"]);
  });

  it("ignores reasoning text when deciding whether we were mentioned", () => {
    const l = parseLlm({
      items: [
        { type: "reasoning", sections: [{ text: "Archer Infotech?" }] },
        { type: "message", sections: [{ text: "Try SevenMentor." }] },
      ],
    });
    assert.equal(l.mentioned, false);
    assert.equal(l.cited, false);
  });
});

describe("opportunityScore", () => {
  it("weights volume by closeness to page 1", () => {
    assert.equal(opportunityScore(1900, 14), 1900);
    assert.equal(opportunityScore(320, 33), 80);
    assert.equal(opportunityScore(720, 55), 0);
    assert.equal(opportunityScore(720, null), 0);
    assert.equal(opportunityScore(210, 2), 0);
  });
});

describe("settledLlmCost", () => {
  it("prices a finished task from money_spent, not task_get's zero cost", () => {
    // Real ChatGPT task from 2026-10-04: task_get cost 0, money_spent 0.0246305.
    assert.equal(Number(settledLlmCost({ money_spent: 0.0246305 }).toFixed(7)), 0.0248305);
  });

  it("falls back to the base fee when money_spent is missing", () => {
    assert.equal(settledLlmCost(null), 0.0002);
    assert.equal(settledLlmCost({ money_spent: null }), 0.0002);
  });
});
