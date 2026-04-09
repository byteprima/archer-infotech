import { PostHog } from "posthog-node";

type AnalyticsValue = string | number | boolean | null | undefined;
type AnalyticsProperties = Record<string, AnalyticsValue | AnalyticsValue[]>;

interface ServerEventInput {
  distinctId?: string;
  event: string;
  properties?: AnalyticsProperties;
}

export async function captureServerEvent({
  distinctId,
  event,
  properties,
}: ServerEventInput) {
  const posthogToken = process.env.NEXT_PUBLIC_POSTHOG_TOKEN;

  if (!posthogToken) {
    return;
  }

  const client = new PostHog(posthogToken, {
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
    flushAt: 1,
    flushInterval: 0,
  });

  try {
    client.capture({
      distinctId: distinctId || crypto.randomUUID(),
      event,
      properties,
    });
  } catch (error) {
    console.error(`Failed to capture server analytics event "${event}"`, error);
  } finally {
    try {
      await client.shutdown();
    } catch (error) {
      console.error(`Failed to flush server analytics event "${event}"`, error);
    }
  }
}
