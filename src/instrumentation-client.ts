import posthog from "posthog-js";

const posthogToken = process.env.NEXT_PUBLIC_POSTHOG_TOKEN;

if (posthogToken) {
  posthog.init(posthogToken, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
    capture_pageleave: true,
    person_profiles: "identified_only",
    /**
     * Performance: turn off the heaviest PostHog features that mobile
     * PSI flagged as major TBT contributors. Re-enable per-page if a
     * specific surface needs them.
     *
     * Disabled here:
     *   - autocapture: events are already captured explicitly via
     *     captureAnalyticsEvent() across the codebase. Auto-capture
     *     brings duplicate noise + 100KB+ of dependent modules.
     *   - disable_session_recording: posthog-recorder.js was 142KB /
     *     325ms bootup / 732ms long task on mobile. Off by default;
     *     toggle on per-session when investigating something specific.
     *   - disable_surveys: surveys.js was 92KB / 81% unused on every
     *     page. Surveys can still be triggered manually if needed.
     *   - advanced_disable_decide: skip the initial /decide round-trip
     *     a few ms saved + one fewer external request during init.
     */
    autocapture: false,
    disable_session_recording: true,
    disable_surveys: true,
    advanced_disable_decide: true,
  });
}
