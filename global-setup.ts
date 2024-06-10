import { FullConfig } from '@playwright/test';
import { rimraf } from 'rimraf';

async function globalSetup(config: FullConfig): Promise<void> {
  console.log('Running global setup...');

  const directoryPath = './allure-results';
  try {
    await rimraf(directoryPath);
    console.log(`${directoryPath} deleted successfully.`);
  } catch (err) {
    console.error(`Error while deleting ${directoryPath}:`, err);
  }
}

export default globalSetup;
