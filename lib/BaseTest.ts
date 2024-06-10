import { TestInfo, test as baseTest } from '@playwright/test';
import { LoginPage } from '../pageFactory/pageRepository/LoginPage';
import { HomePage } from '../pageFactory/pageRepository/HomePage';
import { NodePage } from '../pageFactory/pageRepository/NodePage';
import { WebActions } from '../lib/WebActions';

const test = baseTest.extend<{
    webActions: WebActions;
    loginPage: LoginPage;
    homePage: HomePage;
    nodePage: NodePage;
    testInfo: TestInfo;
}>({
    webActions: async ({ page, context }, use) => {
        await use(new WebActions(page, context));
    },
    loginPage: async ({ page, context }, use) => {
        await use(new LoginPage(page, context));
    },
    homePage: async ({ page, context }, use) => {
        await use(new HomePage(page, context));
    },
    nodePage: async ({ page, context }, use) => {
        await use(new NodePage(page, context));
    }
})

export default test;