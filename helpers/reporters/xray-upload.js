/**
 * Uploads the JUnit XML produced by @xray-app/playwright-junit-reporter to
 * Xray Cloud.
 *
 * Flow: authenticate with the client id/secret -> POST the JUnit report to the
 * import endpoint. Run AFTER your tests, e.g. `npm run report:xray`.
 *
 * Required env vars (see .env): XRAY_CLIENT_ID, XRAY_CLIENT_SECRET,
 * XRAY_PROJECT_KEY. Optional: XRAY_OUTPUT_FILE, XRAY_TEST_PLAN_KEY.
 */
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '..', '.env') });

const XRAY_BASE_URL = 'https://xray.cloud.getxray.app/api/v2';

class XrayUploader {
  constructor(config) {
    this.config = config;
  }

  static fromEnv() {
    const config = {
      clientId: process.env.XRAY_CLIENT_ID,
      clientSecret: process.env.XRAY_CLIENT_SECRET,
      projectKey: process.env.XRAY_PROJECT_KEY,
      testPlanKey: process.env.XRAY_TEST_PLAN_KEY,
      reportFile: process.env.XRAY_OUTPUT_FILE || 'xray-report/results.xml',
    };

    const missing = ['clientId', 'clientSecret', 'projectKey'].filter(
      (key) => !config[key],
    );
    if (missing.length > 0) {
      const names = missing
        .map((k) => `XRAY_${k.replace(/([A-Z])/g, '_$1').toUpperCase()}`)
        .join(', ');
      throw new Error(`Missing required Xray env vars: ${names}`);
    }

    return new XrayUploader(config);
  }

  async authenticate() {
    const response = await fetch(`${XRAY_BASE_URL}/authenticate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Xray authentication failed: ${response.status} ${await response.text()}`,
      );
    }

    // The token is returned as a quoted JSON string.
    return (await response.json());
  }

  async upload(token) {
    const xml = fs.readFileSync(path.resolve(this.config.reportFile), 'utf8');

    const params = new URLSearchParams({ projectKey: this.config.projectKey });
    if (this.config.testPlanKey) {
      params.set('testPlanKey', this.config.testPlanKey);
    }

    const response = await fetch(
      `${XRAY_BASE_URL}/import/execution/junit?${params.toString()}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/xml',
          Authorization: `Bearer ${token}`,
        },
        body: xml,
      },
    );

    if (!response.ok) {
      throw new Error(
        `Xray import failed: ${response.status} ${await response.text()}`,
      );
    }

    return response.json();
  }

  async run() {
    const token = await this.authenticate();
    const result = await this.upload(token);
    console.log('[Xray] Imported execution:', result.key ?? result);
  }
}

XrayUploader.fromEnv()
  .run()
  .catch((error) => {
    console.error(`[Xray] ${error.message}`);
    process.exit(1);
  });
