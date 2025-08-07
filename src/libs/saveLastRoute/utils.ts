/**
 * Helpers for encoding / decoding the value stored in ONYXKEYS.LAST_ROUTE.
 * A timestamp prefix allows us to treat the value as valid only for a short
 * window after it was written (used for the iOS Settings round-trip flow).
 */
const SEPARATOR = '|';
const TTL_MS = 30_000; // 30 seconds

/**
 * Returns a string composed of the current epoch time and the given route.
 */
export function encodeLastRoute(route: string): string {
    return `${Date.now()}${SEPARATOR}${route}`;
}

/**
 * Parses the stored value and returns the route if it is still considered
 * fresh. Supports legacy values that were stored as plain routes without the
 * timestamp prefix.
 */
export function decodeLastRoute(value: string | undefined | null): string | null {
    if (!value) {
        return null;
    }

    const idx = value.indexOf(SEPARATOR);
    if (idx === -1) {
        // Legacy value (no timestamp)
        return value;
    }

    const ts = Number(value.slice(0, idx));
    if (Number.isNaN(ts)) {
        return null;
    }

    const route = value.slice(idx + 1);
    return Date.now() - ts < TTL_MS ? route : null;
}
