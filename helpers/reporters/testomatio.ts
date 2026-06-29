import type { ReporterDescription } from '@playwright/test';
import { isFlagEnabled } from './env';
import type { ReporterProvider } from './types';

/**
 * Testomat.io — https://docs.testomat.io
 *
 * Reports directly to Testomat.io during the run via the `TESTOMATIO` API key.
 * Toggle with `TESTOMATIO_REPORT` in .env.
 */
export class TestomatioReporterProvider implements ReporterProvider {
  readonly name = 'Testomat.io';

  isEnabled(): boolean {
    return isFlagEnabled(process.env.TESTOMATIO_REPORT);
  }

  build(): ReporterDescription[] {
    return [
      ['@testomatio/reporter/playwright', { apiKey: process.env.TESTOMATIO }],
    ];
  }
}
