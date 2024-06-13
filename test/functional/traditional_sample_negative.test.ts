import { test, expect, Page } from '@playwright/test'; 
 
 // Negative scenarios for login
 test.describe.skip('This negative tests are skipped as its just traditional framework sample', () => {
    test('should not login with invalid email', { tag: '@Smoke'}, async ({ page }) => {
        await page.goto('https://admin.moralis.io/');
  
        // Check if the "Accept all" button exists and click it if present
        const acceptButton = page.getByRole('button', { name: 'Accept all' });
        if (await acceptButton.count() > 0) {
          await acceptButton.click();
        }

        await page.getByTestId('test-email').getByTestId('test-typography').click();
        await page.getByTestId('test-email').getByTestId('test-input-input').fill('invalid-email@example.com');
        await page.getByTestId('test-password').getByTestId('test-typography').click();
        await page.getByTestId('test-password').getByTestId('test-input-input').fill('Admin123');
        await page.getByTestId('test-button').click();
        await expect(page.getByTestId('test-notification-title')).toContainText('Something went wrong!');
    });

    test('should not login with invalid password', async ({ page }) => {
        await page.goto('https://admin.moralis.io/');
  
        // Check if the "Accept all" button exists and click it if present
        const acceptButton = page.getByRole('button', { name: 'Accept all' });
        if (await acceptButton.count() > 0) {
          await acceptButton.click();
        }
        await page.getByTestId('test-email').getByTestId('test-typography').click();
        await page.getByTestId('test-email').getByTestId('test-input-input').fill('orboton@gmail.com');
        await page.getByTestId('test-password').getByTestId('test-typography').click();
        await page.getByTestId('test-password').getByTestId('test-input-input').fill('InvalidPassword');
        await page.getByTestId('test-button').click();
        await expect(page.getByTestId('test-notification-title')).toContainText('Something went wrong!');
    });

    test('should not login with empty email', async ({ page }) => {
        await page.goto('https://admin.moralis.io/');
  
        // Check if the "Accept all" button exists and click it if present
        const acceptButton = page.getByRole('button', { name: 'Accept all' });
        if (await acceptButton.count() > 0) {
          await acceptButton.click();
        }
        await page.getByTestId('test-email').getByTestId('test-typography').click();
        await page.getByTestId('test-email').getByTestId('test-input-input').fill('');
        await page.getByTestId('test-password').getByTestId('test-typography').click();
        await page.getByTestId('test-password').getByTestId('test-input-input').fill('Admin@123');
        await expect(page.getByTestId('test-email').getByTestId('test-input-feedback')).toContainText('Please fill in this field.');
    });
  });
