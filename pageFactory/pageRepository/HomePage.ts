import { Page, BrowserContext, expect } from '@playwright/test';
import { testConfig } from '../../testConfig';
import { WebActions } from '../../lib/WebActions';

let webActions: WebActions;

export class HomePage {
    readonly page: Page;
    readonly context: BrowserContext;
    

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        webActions = new WebActions(this.page, this.context);
    }

    async verifyHomePage(): Promise<void> {
        await expect(this.page).toHaveTitle('Moralis | The Ultimate Web3 Development Platform');
    }

    async navigateToNode(): Promise<void> {
        await this.page.getByRole('button', { name: 'Nodes New' }).click();
    }
}