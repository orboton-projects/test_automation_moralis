// import { test, expect, Page } from '@playwright/test';

// // Login function
// async function login(page: Page, email: string, password: string): Promise<boolean> {
//   await page.goto('https://admin.moralis.io/');
  
//     // Check if the "Accept all" button exists and click it if present
//     const acceptButton = page.getByRole('button', { name: 'Accept all' });
//     if (await acceptButton.count() > 0) {
//       await acceptButton.click();
//     }

//   await page.getByTestId('test-email').getByTestId('test-typography').click();
//   await page.getByTestId('test-email').getByTestId('test-input-input').fill(email);
//   await page.getByTestId('test-password').getByTestId('test-typography').click();
//   await page.getByTestId('test-password').getByTestId('test-input-input').fill(password);
//   await page.getByTestId('test-button').click();

//   // Check if login was successful
//   try {
//     await page.waitForSelector('span:has-text("orb")', { timeout: 5000 });
//     return true;
//   } catch {
//     return false;
//   }
// }

// // Logout function
// async function logout(page: Page) {
//   await page.locator('span').filter({ hasText: /^orb$/ }).first().click();
//   await page.getByRole('button', { name: 'Log Out' }).click();
// }

// // Define a variable to track login success
// let loginSuccessful = false;

// // Fixture to handle login and conditional logout
// test.beforeEach(async ({ page }) => {
//   loginSuccessful = await login(page, 'orboton@gmail.com', 'Admin123');
// });

// test.afterEach(async ({ page }) => {
//   if (loginSuccessful) {
//     await logout(page);
//   }
// });

// test.describe('Moralis Admin UI Tests', () => {
//   test('should create and delete a node', async ({ page }) => {
//     if (!loginSuccessful) {
//       console.log('Login was not successful, skipping test.');
//       return;
//     }

//     // Added an explicit wait for manual intervention (adjust the timeout as needed)
//     console.log('Please solve the CAPTCHA manually.');
//     await page.waitForTimeout(6000); // Wait for 60 seconds for manual intervention

//     // Assert the page title
//     await expect(page).toHaveTitle('Moralis | The Ultimate Web3 Development Platform');

//     // Create Node
//     await page.getByRole('button', { name: 'Nodes New' }).click();
//     await expect(page.locator('#main_top')).toContainText('Create a New Node');
//     await page.getByRole('button', { name: 'Create a New Node' }).click();
//     await page.getByTestId('test-CardCountrySelect').selectOption('Ethereum');
//     await page.getByTestId('mui-select').selectOption('0x1-Mainnet');
//     await page.getByTestId('mui-modal').getByTestId('mui-button-primary').click();
//     await expect(page.locator('h2')).toContainText('Your Nodes');
//     await expect(page.getByTestId('mui-accordion').getByRole('paragraph')).toContainText('1 Nodes');

//     // Delete the created node
//     await page.locator('[data-testid="mui-button-outline"] [data-icon="trash"]').click();
//     await page.getByTestId('mui-button-destructive').click();
//     await expect(page.locator('#main_top')).toContainText('You don’t have any Nodes yet');
//   });

//   // Negative scenarios for login

// });
