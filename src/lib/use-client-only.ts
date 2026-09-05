"use client";

import { useSyncExternalStore } from "react";

/**
 * Read a value that only exists in the browser, without the mount-flag dance.
 *
 * The usual version of this is:
 *
 *     const [mounted, setMounted] = useState(false);
 *     useEffect(() => { setMounted(true); }, []);
 *
 * which works but sets state synchronously inside an effect, so every one of
 * these costs an immediate second render of the component and everything below
 * it. React's lint rule flags it for that reason
 * ("Calling setState synchronously within an effect can trigger cascading
 * renders").
 *
 * `useSyncExternalStore` expresses the same intent directly: return the server
 * snapshot while rendering on the server and during hydration, then the client
 * snapshot once hydrated — with no state update and no extra render. Hydration
 * still matches, because the first client render also uses the server snapshot.
 *
 * Typical uses are gating `createPortal` (which needs `document`) and browser
 * feature detection.
 */

// Nothing to subscribe to: these values never change after hydration. The
// reference must be stable across renders or React resubscribes every time.
const subscribe = () => () => {};

export function useClientOnly<T>(getClientValue: () => T, serverValue: T): T {
  return useSyncExternalStore(subscribe, getClientValue, () => serverValue);
}

/** True once hydrated on the client, false on the server. */
export function useIsMounted(): boolean {
  return useClientOnly(() => true, false);
}
