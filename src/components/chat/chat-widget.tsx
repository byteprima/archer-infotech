"use client";

/**
 * Archer Infotech website chatbot — floating widget.
 *
 * Talks to /api/chat. That route answers via keyless retrieval over the OKF
 * data by default (free, no hallucination) and silently upgrades to Grok
 * generation when XAI_API_KEY is set — this widget is identical either way.
 *
 * Beyond Q&A it offers quick-reply chips, clickable follow-up suggestions,
 * and an inline name+phone callback form that writes through the same
 * `submitLead` server action (source "chat_widget").
 *
 * Loaded lazily via chat-widget-lazy.tsx. Launcher sits above the WhatsApp
 * button (bottom-6 right-6).
 */

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Loader2, CheckCircle2 } from "lucide-react";
import { submitLead } from "@/lib/actions/leads";

interface Msg {
  role: "user" | "assistant";
  content: string;
  suggestions?: string[];
}

const INITIAL_SUGGESTIONS = ["Our courses", "Placements", "Visit / contact", "Talk to a counsellor"];

const GREETING: Msg = {
  role: "assistant",
  content:
    "Hi! 👋 I'm the Archer Infotech assistant. Ask me about our courses, batches, placements, or how to visit our Kothrud centre.",
  suggestions: INITIAL_SUGGESTIONS,
};

// Client-side chip → query map (keeps OKF server data out of the client bundle).
const CHIP_QUERY: Record<string, string> = {
  "Our courses": "what courses do you offer",
  Courses: "what courses do you offer",
  Placements: "tell me about placements",
  "Fees & EMI": "what are the course fees",
  Fees: "what are the course fees",
  "Visit / contact": "what is your address and contact number",
  "Visit us": "what is your address and contact number",
  "Java Full Stack": "Java Full Stack course",
  "Data Science": "Data Science course",
  "Cloud / DevOps": "Cloud DevOps course",
};
const LEAD_CHIP = "Talk to a counsellor";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Lead callback form
  const [leadMode, setLeadMode] = useState(false);
  const [leadDone, setLeadDone] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadCourse, setLeadCourse] = useState("");
  const [leadBusy, setLeadBusy] = useState(false);
  const [leadError, setLeadError] = useState("");

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, leadMode, leadDone]);

  useEffect(() => {
    if (open && !leadMode) inputRef.current?.focus();
  }, [open, leadMode]);

  async function send(text: string) {
    const t = text.trim();
    if (!t || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: t }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.map((m) => ({ role: m.role, content: m.content })) }),
      });
      const data = await res.json();
      const reply =
        typeof data.reply === "string" && data.reply.trim()
          ? data.reply
          : data.error || "Sorry, I couldn't respond just now. Please call +91 9850 678451 or WhatsApp us.";
      setMessages((m) => [...m, { role: "assistant", content: reply, suggestions: data.suggestions }]);
      if (data.intent === "lead") setLeadMode(true);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: "I'm having trouble connecting. Please call +91 9850 678451 or WhatsApp us.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleChip(label: string) {
    if (label === LEAD_CHIP) {
      setLeadDone(false);
      setLeadMode(true);
      return;
    }
    send(CHIP_QUERY[label] ?? label);
  }

  async function handleLeadSubmit() {
    setLeadError("");
    const name = leadName.trim();
    const phone = leadPhone.replace(/\D/g, "");
    if (name.length < 2) return setLeadError("Please enter your name.");
    if (phone.length !== 10) return setLeadError("Please enter a valid 10-digit phone number.");
    setLeadBusy(true);
    try {
      const course = leadCourse.trim();
      const result = await submitLead({
        name,
        email: "",
        phone,
        course: course || undefined,
        message: `Callback request via website chatbot${course ? ` about ${course}` : ""}.`,
        source: "chat_widget",
      });
      if (result.success) {
        setLeadMode(false);
        setLeadDone(true);
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            content: `Thank you, ${name}! 🎉 Our counsellor will call you on ${phone} during working hours (Mon–Sat, 9 AM–8 PM). Anything else I can help with?`,
            suggestions: ["Our courses", "Placements"],
          },
        ]);
        setLeadName("");
        setLeadPhone("");
        setLeadCourse("");
      } else {
        setLeadError(result.message || "Something went wrong. Please try again.");
      }
    } catch {
      setLeadError("Couldn't submit just now. Please call +91 9850 678451.");
    } finally {
      setLeadBusy(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Chat with Archer Infotech"
        className="fixed bottom-24 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:scale-110 hover:bg-primary/90"
      >
        <MessageCircle className="h-7 w-7" />
      </button>
    );
  }

  const lastAssistantIdx = messages.map((m) => m.role).lastIndexOf("assistant");

  return (
    <div
      role="dialog"
      aria-label="Archer Infotech chat"
      className="fixed bottom-24 right-4 z-50 flex h-[min(34rem,calc(100vh-8rem))] w-[min(23rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl sm:right-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between bg-primary px-4 py-3 text-primary-foreground">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/15">
            <MessageCircle className="h-4 w-4" />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold">Archer Infotech</p>
            <p className="text-xs opacity-80">We usually reply in a few minutes</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close chat"
          className="rounded-md p-1 transition-colors hover:bg-primary-foreground/15"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-muted/30 px-3 py-4">
        {messages.map((m, i) => (
          <div key={i}>
            <div className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
              <div
                className={
                  "max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2 text-sm leading-relaxed " +
                  (m.role === "user"
                    ? "rounded-br-sm bg-primary text-primary-foreground"
                    : "rounded-bl-sm border border-border bg-background text-foreground")
                }
              >
                {m.content}
              </div>
            </div>
            {/* Suggestions under the latest assistant message */}
            {m.role === "assistant" && i === lastAssistantIdx && m.suggestions && !leadMode && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {m.suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => handleChip(s)}
                    className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/10"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 rounded-2xl rounded-bl-sm border border-border bg-background px-3.5 py-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Typing…
            </div>
          </div>
        )}

        {/* Inline callback form */}
        {leadMode && (
          <div className="rounded-xl border border-secondary/40 bg-secondary/5 p-3">
            <p className="mb-2 text-xs font-semibold text-foreground">Request a free callback</p>
            <div className="space-y-2">
              <input
                value={leadName}
                onChange={(e) => setLeadName(e.target.value)}
                placeholder="Your name"
                className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
              />
              <input
                value={leadPhone}
                onChange={(e) => setLeadPhone(e.target.value)}
                inputMode="numeric"
                placeholder="10-digit phone number"
                className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
              />
              <input
                value={leadCourse}
                onChange={(e) => setLeadCourse(e.target.value)}
                placeholder="Course of interest (optional)"
                className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
              />
              {leadError && <p className="text-xs text-destructive">{leadError}</p>}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleLeadSubmit}
                  disabled={leadBusy}
                  className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg bg-secondary text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary/90 disabled:opacity-50"
                >
                  {leadBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
                  Request callback
                </button>
                <button
                  type="button"
                  onClick={() => setLeadMode(false)}
                  className="h-9 rounded-lg border border-border px-3 text-sm text-muted-foreground hover:bg-muted"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-border bg-background p-2">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            rows={1}
            placeholder="Type your question…"
            className="max-h-28 flex-1 resize-none rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
          />
          <button
            type="button"
            onClick={() => send(input)}
            disabled={loading || !input.trim()}
            aria-label="Send message"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground transition-colors hover:bg-secondary/90 disabled:opacity-40"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-1 px-1 text-[10px] text-muted-foreground">
          Assistant may be inaccurate. To confirm, call +91 9850 678451.
        </p>
      </div>
    </div>
  );
}
