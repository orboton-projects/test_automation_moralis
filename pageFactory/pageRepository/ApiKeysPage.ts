import { Page, BrowserContext, expect } from '@playwright/test';

export class ApiKeysPage {
    readonly page: Page;
    readonly context: BrowserContext;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
    }

    async getApiKeys(): Promise<string> {
        await this.page.getByTestId('mui-copy').click();
        await this.page.waitForTimeout(1000);
        // Retrieve the API key from the clipboard
        const clipboardy = await import('clipboardy'); // Dynamic import for ES Module
        const apiKey = await clipboardy.default.read(); // Use .default to access the default export
        return apiKey;
    }

    async verifyDefaultApiKeyPresent(): Promise<void> {
        await expect(this.page.locator(
            '[class="TextEllipsisStyled-sc-1vnufcq-1 dxRDNc"]'))
            .toContainText('default');
    }

    async deleteDefaultApiKey(): Promise<void> {
        await this.page.getByTestId('mui-button-outline').nth(4).click();
        await this.page.getByTestId('mui-button-destructive').click();
    }

    async createNewApiKey(): Promise<void> {
        await this.page.getByTestId('[data-testid="mui-button-primary"]').click();
        await this.page.getByTestId('test-CardCountrySelect').fill('TestApiKey1');
        await this.page.getByTestId('mui-checkbox-web3-api-checkbox').click();
        await this.page.click('text="Create API Key"');
    }

    async verifyDefaultApiKeyCannotBeDeleted(): Promise<void> {

        await expect(this.page.getByTestId('test-notification-message'))
        .toContainText('Something went wrong!');

        // await expect(this.page.getByTestId('test-notification-message'))
        // .toContainText('Cannot remove the last api key, at least one is required');
    }

    async verifyNewApiKeyCannotBeCreatedOnFreeAccount(): Promise<void> {
        await expect(this.page.locator('#\:r5i\: > div > span:nth-child(1)'))
        .toContainText('Something went wrong!');
    }
}
