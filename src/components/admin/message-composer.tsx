"use client";

/**
 * Prepare a WhatsApp or email message for a lead.
 *
 * Nothing is sent from here. There is no provider configured and the
 * specification says not to add one — this composes the text from the lead's
 * own data, copies it, and records that it was prepared. The counsellor pastes
 * it, which is what they do today from memory, differently each time.
 *
 * The "Open WhatsApp" button uses wa.me with the text prefilled: no API, no
 * credentials, works from the phone in their hand.
 */

import { useState, useTransition } from "react";
import { Check, Copy, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  recordMessageCopied,
  type PreparedMessage,
} from "@/lib/actions/lead-messages";
import { MESSAGE_TEMPLATE_LABELS } from "@/lib/crm/message-templates";
import { toast } from "sonner";

const SELECT =
  "h-10 w-full rounded-md border border-input bg-background px-3 text-sm disabled:opacity-60";

export function MessageComposer({
  leadId,
  waLink,
  messages,
  history,
}: {
  leadId: number;
  waLink: string | null;
  messages: PreparedMessage[];
  history: Array<{ id: number; template: string; createdAt: Date | null }>;
}) {
  const [pending, startTransition] = useTransition();
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [body, setBody] = useState(messages[0]?.body ?? "");
  const [shownFor, setShownFor] = useState(messages[0]?.template ?? null);

  const current = messages[Math.min(index, Math.max(messages.length - 1, 0))];

  // Switching template replaces the draft. Done during render rather than in
  // an effect: React re-runs the render with the new state before committing,
  // so the textarea never flashes the previous template's text.
  if (current && shownFor !== current.template) {
    setShownFor(current.template);
    setBody(current.body);
    setCopied(false);
  }

  if (messages.length === 0 || !current) {
    return (
      <section className="rounded-lg border bg-card p-4">
        <h2 className="mb-2 flex items-center gap-2 font-semibold">
          <MessageSquare className="h-4 w-4" />
          Message
        </h2>
        <p className="text-sm text-muted-foreground">
          Nothing to send yet — a message needs at least a course on the enquiry.
        </p>
      </section>
    );
  }

  function record() {
    startTransition(async () => {
      await recordMessageCopied({
        leadId,
        template: current.template,
        channel: "whatsapp",
        subject: current.subject,
        body,
      });
    });
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(body);
      setCopied(true);
      toast.success("Copied — paste it into WhatsApp.");
      record();
    } catch {
      toast.error("Could not copy. Select the text and copy it manually.");
    }
  }

  return (
    <section className="rounded-lg border bg-card p-4">
      <h2 className="mb-3 flex items-center gap-2 font-semibold">
        <MessageSquare className="h-4 w-4" />
        Message
      </h2>

      <div className="space-y-3">
        <div>
          <Label htmlFor="msg-template" className="text-xs">
            Template
          </Label>
          <select
            id="msg-template"
            className={SELECT}
            value={index}
            disabled={pending}
            onChange={(e) => setIndex(Number(e.target.value))}
          >
            {messages.map((message, i) => (
              <option key={message.template} value={i}>
                {MESSAGE_TEMPLATE_LABELS[message.template]}
              </option>
            ))}
          </select>
        </div>

        <Textarea
          rows={10}
          value={body}
          disabled={pending}
          onChange={(e) => {
            setBody(e.target.value);
            setCopied(false);
          }}
          className="font-mono text-xs"
        />

        <div className="flex flex-wrap gap-2">
          <Button size="sm" disabled={pending} onClick={copy}>
            {copied ? (
              <Check className="mr-2 h-4 w-4" />
            ) : (
              <Copy className="mr-2 h-4 w-4" />
            )}
            {copied ? "Copied" : "Copy text"}
          </Button>
          {waLink && (
            <a
              href={`${waLink}?text=${encodeURIComponent(body)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={record}
            >
              <Button size="sm" variant="outline" disabled={pending}>
                <Send className="mr-2 h-4 w-4" />
                Open WhatsApp
              </Button>
            </a>
          )}
        </div>

        <p className="text-xs text-muted-foreground">
          Nothing is sent automatically — no messaging provider is connected.
          This prepares the text and records that you prepared it.
        </p>

        {history.length > 0 && (
          <div className="border-t pt-3">
            <p className="mb-1 text-xs font-medium">Prepared before</p>
            <ul className="space-y-1">
              {history.slice(0, 5).map((row) => (
                <li key={row.id} className="text-xs text-muted-foreground">
                  {MESSAGE_TEMPLATE_LABELS[
                    row.template as keyof typeof MESSAGE_TEMPLATE_LABELS
                  ] ?? row.template}
                  {row.createdAt
                    ? ` · ${new Date(row.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}`
                    : ""}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
