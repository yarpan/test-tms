import type { ReporterDescription } from '@playwright/test';
import { isFlagEnabled } from './env';
import type { ReporterProvider } from './types';

/**
 * Zephyr Scale (Jira) — https://github.com/elaichenkov/playwright-zephyr
 *
 * Reports directly during the run. Targets Zephyr Cloud by default, or an
 * on-prem/server Jira when `ZEPHYR_HOST` is set. Toggle with `ZEPHYR_REPORT`.
 */
export class ZephyrReporterProvider implements ReporterProvider {
  readonly name = 'Zephyr Scale';

  isEnabled(): boolean {
    return isFlagEnabled(process.env.ZEPHYR_REPORT);
  }

  build(): ReporterDescription[] {
    const host = process.env.ZEPHYR_HOST;

    const options: Record<string, unknown> = {
      projectKey: process.env.ZEPHYR_PROJECT_KEY,
      authorizationToken: process.env.ZEPHYR_AUTH_TOKEN,
      testCycle: { name: `Playwright Run - ${new Date().toISOString()}` },
    };

    if (host) {
      options.host = host;
      return [['playwright-zephyr', options]];
    }

    return [['playwright-zephyr/lib/src/cloud', options]];
  }
}
