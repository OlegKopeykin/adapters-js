import { Config } from '@jest/reporters';
import { TestClient } from './testClient';
import { formatError } from './utils';

export default async (
  globalConfig: Config.GlobalConfig,
  projectConfig: Config.ProjectConfig
) => {
  globalThis.testClient = new TestClient(projectConfig.testEnvironmentOptions);
  try {
    const testRunId = await globalThis.testClient.createAndStartTestRun();
    projectConfig.globals['testRunId'] = testRunId;
  } catch (err) {
    console.error('Failed to create and start test run', formatError(err));
  }
};
