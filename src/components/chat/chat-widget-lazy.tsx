"use client";

/**
 * Lazy mount + lazy load wrapper for the chat widget — mirrors
 * WhatsAppButtonLazy so the chatbot inherits the same first-paint
 * protection:
 *   1. next/dynamic (ssr:false) keeps the widget out of the initial bundle.
 *   2. requestIdleCallback defers the mount until the main thread is free.
 *
 * Rendered from layout.tsx only when NEXT_PUBLIC_CHAT_ENABLED === "true";
 * the /api/chat route additionally requires XAI_API_KEY, so the feature is
 * inert until both are set.
 */
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ChatWidget = dynamic(() => import("./chat-widget").then((m) => m.ChatWidget), {
  ssr: false,
});

export function ChatWidgetLazy() {
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    const ric = (
      window as unknown as {
        requestIdleCallback?: (cb: () => void, opts?: { timeout?: number }) => number;
        cancelIdleCallback?: (id: number) => void;
      }
    ).requestIdleCallback;

    if (typeof ric === "function") {
      const id = ric(() => setShouldMount(true), { timeout: 2500 });
      return () => {
        const cic = (window as unknown as { cancelIdleCallback?: (id: number) => void })
          .cancelIdleCallback;
        cic?.(id);
      };
    }
    const id = window.setTimeout(() => setShouldMount(true), 2500);
    return () => window.clearTimeout(id);
  }, []);

  if (!shouldMount) return null;
  return <ChatWidget />;
}
