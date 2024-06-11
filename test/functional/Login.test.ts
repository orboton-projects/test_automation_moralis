

// We can use Steps like in Cucmber format as shown below

import test from "../../lib/BaseTest";


test.describe('Positive Login Scenarios', () => {
    test(`Verify Homepage Login`, { tag: '@Smoke'}, async ({ loginPage, homePage}) => {
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
}); 
});


// Negative Tests
test.describe('Negative Login Scenarios', () => {

    test(`Should not login with invalid email`, { tag: '@Smoke'}, async ({ loginPage }) => {
    await test.step(`Navigate to Application`, async () => {
        await loginPage.navigateToURL();
    });
        // Check if the "Accept all" button exists and click it if present
    await loginPage.acceptAll();
        
    await test.step(`Login with Invalid Email`, async () => {
        await loginPage.loginWithInvalidEmail();
    });
    await test.step(`Verify Login Failed with Error`, async () => {
        await loginPage.verifySomethingWentWrong();
    });  });


    test(`Should not login with invalid password`, { tag: '@Smoke'}, async ({ loginPage }) => {
        await test.step(`Navigate to Application`, async () => {
            await loginPage.navigateToURL();
        });
            // Check if the "Accept all" button exists and click it if present
        await loginPage.acceptAll();
            
        await test.step(`Login with Invalid Password`, async () => {
            await loginPage.loginWithInvalidPassword();
        });
        await test.step(`Verify Login Failed with Error`, async () => {
            await loginPage.verifySomethingWentWrong();
        });
    });  
    test(`Should not login with empty email`, { tag: '@Smoke'}, async ({ loginPage }) => {
        await test.step(`Navigate to Application`, async () => {
            await loginPage.navigateToURL();
        });
            // Check if the "Accept all" button exists and click it if present
        await loginPage.acceptAll();
            
        await test.step(`Login to Moralis`, async () => {
            await loginPage.loginWithEmptyEmail();
        });
        await test.step(`Verify Error - Please Fill In The Field Email`, async () => {
            await loginPage.verifyPleaseFillInTheFieldEmail();
        });
    }); 
});
