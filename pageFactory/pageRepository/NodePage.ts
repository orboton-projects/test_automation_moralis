import { Page, BrowserContext, expect } from '@playwright/test';
import { WebActions } from '../../lib/WebActions';

let webActions: WebActions;

export class NodePage {
    readonly page: Page;
    readonly context: BrowserContext;
    

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        webActions = new WebActions(this.page, this.context);
    }

    async createNode(): Promise<void> {
        // Create Node
       await expect(this.page.locator('#main_top')).toContainText('Create a New Node');
       await this.page.getByRole('button', { name: 'Create a New Node' }).click();
       await this.page.getByTestId('test-CardCountrySelect').selectOption('Ethereum');
       await this.page.getByTestId('mui-select').selectOption('0x1-Mainnet');
       await this.page.getByTestId('mui-modal').getByTestId('mui-button-primary').click();
       await expect(this.page.locator('h2')).toContainText('Your Nodes');
   }

   async verifyNodeCreated(): Promise<void> {
    // Verify Node Created
   await expect(this.page.getByTestId('mui-accordion').getByRole('paragraph')).toContainText('1 Nodes');
}

    async deleteNode(): Promise<void> {
        // Delete Node
        await this.page.locator('[data-testid="mui-button-outline"] [data-icon="trash"]').click();
        await this.page.getByTestId('mui-button-destructive').click();
        await expect(this.page.locator('#main_top')).toContainText('You don’t have any Nodes yet');
}}