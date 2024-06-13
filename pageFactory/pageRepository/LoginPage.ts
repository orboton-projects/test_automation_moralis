import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { testConfig } from '../../testConfig.js';
import { WebActions } from '../../lib/WebActions';

let webActions: WebActions;

export class LoginPage {
    readonly page: Page;
    readonly context: BrowserContext;
    

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        webActions = new WebActions(this.page, this.context);
    }

    async navigateToURL(): Promise<void> {
        await this.page.goto(testConfig.qa);
    }

    async acceptAll(): Promise<void> {
        const acceptButton = this.page.getByRole('button', { name: 'Accept all' });
        if (await acceptButton.count() > 0) {
            await  acceptButton.click();
          }
    }

    async loginToApplication(): Promise<void> {
        await this.page.getByTestId('test-email').getByTestId('test-typography').click();
        await this.page.getByTestId('test-email').getByTestId('test-input-input').fill(testConfig.email);
        await this.page.getByTestId('test-password').getByTestId('test-typography').click();
        await this.page.getByTestId('test-password').getByTestId('test-input-input').fill(testConfig.password);
        await this.page.getByTestId('test-button').click();
    }

    async handleCaptcha(): Promise<void> {
        console.log('Please solve the CAPTCHA manually.');
        await this.page.waitForTimeout(60000); // Wait for 60s to manual captcha intervention
    }

    async loginWithInvalidEmail(): Promise<void> {
        await this.page.getByTestId('test-email').getByTestId('test-typography').click();
        await this.page.getByTestId('test-email').getByTestId('test-input-input').fill('invalid-email@example.com');
        await this.page.getByTestId('test-password').getByTestId('test-typography').click();
        await this.page.getByTestId('test-password').getByTestId('test-input-input').fill(testConfig.password);
        await this.page.getByTestId('test-button').click();
    }

    async loginWithInvalidPassword(): Promise<void> {
        await this.page.getByTestId('test-email').getByTestId('test-typography').click();
        await this.page.getByTestId('test-email').getByTestId('test-input-input').fill(testConfig.email);
        await this.page.getByTestId('test-password').getByTestId('test-typography').click();
        await this.page.getByTestId('test-password').getByTestId('test-input-input').fill("invalidPassword");
        await this.page.getByTestId('test-button').click();
    }

    async loginWithEmptyEmail(): Promise<void> {
        await this.page.getByTestId('test-email').getByTestId('test-typography').click();
        await this.page.getByTestId('test-email').getByTestId('test-input-input').fill('');
        await this.page.getByTestId('test-password').getByTestId('test-typography').click();
        await this.page.getByTestId('test-password').getByTestId('test-input-input').fill(testConfig.password);
    }

    async verifySomethingWentWrong(): Promise<void> {
        await expect(this.page.getByTestId(
            'test-notification-title')).toContainText('Something went wrong!');
    }

    async verifyPleaseFillInTheFieldEmail(): Promise<void> {
        await expect(this.page.getByTestId('test-email').getByTestId(
            'test-input-feedback')).toContainText('Please fill in this field.');
        }
    
}