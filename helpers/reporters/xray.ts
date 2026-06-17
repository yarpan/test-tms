import type { ReporterDescription } from '@playwright/test';
import { isFlagEnabled } from './env';
import type { ReporterProvider } from './types';

/**
 * Xray (Jira) — https://github.com/Xray-App/playwright-junit-reporter
 *
 * Writes an enhanced JUnit XML during the run; upload it to Xray afterwards via
 * `npm run report:xray` (see xray-upload.js). Toggle with `XRAY_REPORT`.
 */
export class XrayReporterProvider implements ReporterProvider {
  readonly name = 'Xray';

  isEnabled(): boolean {
    return isFlagEnabled(process.env.XRAY_REPORT);
  }

  build(): ReporterDescription[] {
    return [
      [
        '@xray-app/playwright-junit-reporter',
        {
          outputFile: process.env.XRAY_OUTPUT_FILE || 'xray-report/results.xml',
          embedAnnotationsAsProperties: true,
        },
      ],
    ];
  }
}
