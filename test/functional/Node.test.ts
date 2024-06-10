

// We can use Steps like in Cucmber format as shown below

import test from "../../lib/BaseTest";


test(`Create Node`, { tag: '@Smoke'}, async ({ loginPage, homePage, nodePage }) => {
    await test.step(`Navigate to Application`, async () => {
        await loginPage.navigateToURL();
    });
        // Check if the "Accept all" button exists and click it if present
    await loginPage.acceptAll();
        
    await test.step(`Login to Moralis`, async () => {
        await loginPage.loginToApplication();
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

    await test.step(`Delete the node`, async () => {
        await nodePage.deleteNode();
    });

}); 