import type { ReporterDescription } from '@playwright/test';
import { isFlagEnabled } from './env';
import type { ReporterProvider } from './types';

/**
 * TestRail — https://www.npmjs.com/package/playwright-testrail-reporter
 *
 * Reports directly to TestRail during the run. All settings are read from the
 * `TESTRAIL_*` env vars by the reporter itself. Toggle with `TESTRAIL_REPORT`.
 */
export class TestRailReporterProvider implements ReporterProvider {
  readonly name = 'TestRail';

  isEnabled(): boolean {
    return isFlagEnabled(process.env.TESTRAIL_REPORT);
  }

  build(): ReporterDescription[] {
    return [['playwright-testrail-reporter']];
  }
}
