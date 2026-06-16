/**
 * Interprets an environment variable as a boolean switch.
 *
 * Accepts `true` / `1` / `yes` / `on` (case-insensitive) as enabled; anything
 * else (including undefined) is treated as disabled.
 */
export function isFlagEnabled(value: string | undefined): boolean {
  if (!value) {
    return false;
  }

  return ['true', '1', 'yes', 'on'].includes(value.trim().toLowerCase());
}
