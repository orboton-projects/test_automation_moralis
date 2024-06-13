

// We can use Steps like in Cucmber format as shown below

import test from "../../lib/BaseTest";


test.describe('Positive Login Scenarios', () => {test(`Verify API Keys`, { tag: '@Smoke'}, async ({ loginPage, homePage, apiKeysPage }) => {
    await test.step(`Navigate to Application`, async () => {
        await loginPage.navigateToURL();
    });
        // Check if the "Accept all" button exists and click it if present
    await loginPage.acceptAll();
        
    await test.step(`Login to Moralis`, async () => {
        await loginPage.loginToApplication();
    });
    
    //To be clarified
    await test.step(`Handle Captcha - Manual)`, async () => {
        await loginPage.handleCaptcha();
    });

    await test.step(`Verify User is logged in and navigated to Home page`, async () => {
        await homePage.verifyHomePage();
    });

    await test.step(`Navigate to Api Keys page`, async () => {
        await homePage.navigateToApiKeys();
    });
    
    await test.step('Verify Default Api Keys', async () => {
        await apiKeysPage.verifyDefaultApiKeyPresent(); 
    }); 

});

test(`Verify Default API Keys cannot be deleted`, { tag: '@Smoke'}, async ({ loginPage, homePage, apiKeysPage }) => {
    await test.step(`Navigate to Application`, async () => {
        await loginPage.navigateToURL();
    });
        // Check if the "Accept all" button exists and click it if present
    await loginPage.acceptAll();
        
    await test.step(`Login to Moralis`, async () => {
        await loginPage.loginToApplication();
    });
    
    //To be clarified
    await test.step(`Handle Captcha - Manual)`, async () => {
        await loginPage.handleCaptcha();
    });

    await test.step(`Verify User is logged in and navigated to Home page`, async () => {
        await homePage.verifyHomePage();
    });

    await test.step(`Navigate to Api Keys page`, async () => {
        await homePage.navigateToApiKeys();
    });

    await test.step(`Delete Default Api Keys`, async () => {
        await apiKeysPage.deleteDefaultApiKey();
    });
    
    
    await test.step('Verify Default Api Keys cannot be deleted', async () => {
        await apiKeysPage.verifyDefaultApiKeyCannotBeDeleted(); 
    }); 


test(`Verify API Keys cannot be created on free account`, { tag: '@Smoke'}, async ({ loginPage, homePage, apiKeysPage }) => {
    await test.step(`Navigate to Application`, async () => {
    await loginPage.navigateToURL();
});
            // Check if the "Accept all" button exists and click it if present
        await loginPage.acceptAll();
            
        await test.step(`Login to Moralis`, async () => {
            await loginPage.loginToApplication();
        });
        
        //To be clarified
        await test.step(`Handle Captcha - Manual)`, async () => {
            await loginPage.handleCaptcha();
        });
    
        await test.step(`Verify User is logged in and navigated to Home page`, async () => {
            await homePage.verifyHomePage();
        });
    
        await test.step(`Navigate to Api Keys page`, async () => {
            await homePage.navigateToApiKeys();
        });
        
        await test.step(`Create new Api Key`, async () => {
            await apiKeysPage.createNewApiKey();
        });
    
        await test.step('Verify Api Keys cannot be created on free account', async () => {
            await apiKeysPage.verifyNewApiKeyCannotBeCreatedOnFreeAccount(); 
        }); 
    
    });     

})
});