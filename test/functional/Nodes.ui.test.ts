// We can use Steps like in Cucumber format as shown below

import test from "../../lib/BaseTest";

test.describe.skip('Positive Node Journey - Skipped due to Captcha Intervention', () => {
    test(`Create Node`, { tag: '@UI' }, async ({ loginPage, homePage, nodePage }) => {
        
        await test.step(`Navigate to Application`, async () => {
            await loginPage.navigateToURL();
        });

        // Check if the "Accept all" button exists and click it if present
        await loginPage.acceptAll();

        await test.step(`Login to Moralis`, async () => {
            await loginPage.loginToApplication();
        });
        
        // To be clarified
        await test.step(`Handle Captcha - Manual`, async () => {
            await loginPage.handleCaptcha();
        });

        await test.step(`Verify User is logged in and navigated to Home page`, async () => {
            await homePage.verifyHomePage();
        });

        await test.step(`Navigate to node page`, async () => {
            await homePage.navigateToNode();
        });

        await test.step(`Create a node`, async () => {
            await nodePage.createNode();
        });

        await test.step(`Verify Node Created`, async () => {
            await nodePage.verifyNodeCreated();
        });

        await test.step(`Delete the node`, async () => {
            await nodePage.deleteNode();
        });
    });
});
