import type { ReporterDescription } from '@playwright/test';

/**
 * Contract every Test Management System (TMS) reporter integration must honor.
 *
 * Keeping a single small interface lets `playwright.config.ts` stay agnostic of
 * any concrete TMS (Dependency Inversion) and makes adding a new system a matter
 * of writing one more class (Open/Closed) without touching the builder.
 */
export interface ReporterProvider {
  /** Human-readable name, used only for logging which integrations are active. */
  readonly name: string;

  /** Reads its own `*_REPORT` switch from the environment. */
  isEnabled(): boolean;

  /** Builds the Playwright reporter description(s) for this TMS. */
  build(): ReporterDescription[];
}
