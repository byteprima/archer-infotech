"use client";

import { useState, useTransition } from "react";
import { Plus, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { recordAiCitationAudit } from "../_actions/citations";

const ENGINES = [
  { value: "chatgpt", label: "ChatGPT" },
  { value: "claude", label: "Claude" },
  { value: "perplexity", label: "Perplexity" },
  { value: "google-aio", label: "Google AI Overviews" },
  { value: "bing-copilot", label: "Bing Copilot" },
  { value: "gemini", label: "Gemini" },
];

const SENTIMENTS = [
  { value: "none", label: "—" },
  { value: "positive", label: "Positive" },
  { value: "neutral", label: "Neutral" },
  { value: "negative", label: "Negative" },
  { value: "inaccurate", label: "Inaccurate" },
];

const SAMPLE_PROMPTS = [
  "Best IT training institute in Pune",
  "Tell me about Archer Infotech Pune",
  "Best Java training institute in Pune",
  "Top Python course Pune 2026",
  "Java Full Stack course fees Pune",
  "Generative AI course in Kothrud",
  "Average salary for a Java developer in Pune",
  "Archer Infotech vs SevenMentor",
  "MERN vs Java Full Stack for freshers in Pune",
];

export function CitationForm() {
  const today = new Date().toISOString().slice(0, 10);
  const [auditDate, setAuditDate] = useState(today);
  const [engine, setEngine] = useState<string>("chatgpt");
  const [prompt, setPrompt] = useState<string>("");
  const [mentioned, setMentioned] = useState(false);
  const [cited, setCited] = useState(false);
  const [citedUrl, setCitedUrl] = useState("");
  const [sentiment, setSentiment] = useState("none");
  const [notes, setNotes] = useState("");
  const [pending, startTransition] = useTransition();
  const [savedFlash, setSavedFlash] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function submit() {
    setError(null);
    startTransition(async () => {
      const result = await recordAiCitationAudit({
        auditDate,
        engine,
        prompt,
        mentioned,
        cited,
        citedUrl: citedUrl || undefined,
        sentiment: sentiment === "none" ? undefined : sentiment,
        notes: notes || undefined,
      });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      // Reset prompt + mention/cite/notes; keep date+engine for fast
      // entry of multiple rows in the same audit session.
      setPrompt("");
      setMentioned(false);
      setCited(false);
      setCitedUrl("");
      setSentiment("none");
      setNotes("");
      setSavedFlash(true);
      setTimeout(() => setSavedFlash(false), 1500);
    });
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-semibold mb-1">Log a new audit row</h3>
        <p className="text-sm text-muted-foreground mb-5">
          Run a prompt against an AI engine, record what happened. Date
          and engine stay the same across submissions for fast batch
          entry.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium mb-1">Audit date</label>
            <Input
              type="date"
              value={auditDate}
              onChange={(e) => setAuditDate(e.target.value)}
              max={today}
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Engine</label>
            <Select value={engine} onValueChange={(v) => v && setEngine(v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ENGINES.map((e) => (
                  <SelectItem key={e.value} value={e.value}>
                    {e.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-xs font-medium mb-1">Prompt</label>
          <Textarea
            placeholder="e.g. Best Java training institute in Pune"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={2}
          />
          <div className="flex flex-wrap gap-1.5 mt-2">
            {SAMPLE_PROMPTS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPrompt(p)}
                className="text-[11px] px-2 py-0.5 rounded border bg-muted/40 hover:bg-muted text-muted-foreground"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={mentioned}
              onChange={(e) => setMentioned(e.target.checked)}
              className="h-4 w-4 rounded border-input"
            />
            <span>Archer mentioned</span>
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={cited}
              onChange={(e) => setCited(e.target.checked)}
              className="h-4 w-4 rounded border-input"
            />
            <span>archerinfotech.in cited as source</span>
          </label>
        </div>

        {cited && (
          <div className="mt-3">
            <label className="block text-xs font-medium mb-1">Cited URL (optional)</label>
            <Input
              placeholder="https://archerinfotech.in/about"
              value={citedUrl}
              onChange={(e) => setCitedUrl(e.target.value)}
            />
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-xs font-medium mb-1">Sentiment</label>
            <Select value={sentiment} onValueChange={(v) => v && setSentiment(v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SENTIMENTS.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-xs font-medium mb-1">
            Notes <span className="text-muted-foreground">(observations: which competitor was mentioned, what facts were attributed, etc.)</span>
          </label>
          <Textarea
            placeholder="Optional free-text notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
          />
        </div>

        {error && (
          <p className="text-sm text-rose-700 mt-3">{error}</p>
        )}

        <div className="flex items-center gap-3 mt-5">
          <Button onClick={submit} disabled={pending || !prompt.trim()}>
            {pending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving…
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Log row
              </>
            )}
          </Button>
          {savedFlash && (
            <span className="text-sm text-emerald-700 inline-flex items-center gap-1">
              <Check className="h-4 w-4" aria-hidden="true" />
              Saved
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
