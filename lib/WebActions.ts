import fs from 'fs';
import * as CryptoJS from 'crypto-js';
import type { Page } from '@playwright/test';
import { BrowserContext } from '@playwright/test';
import { testConfig } from 'testConfig';

export class WebActions {
    readonly page: Page;
    readonly context: BrowserContext;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
    }

    async decipherPassword(): Promise<string> {
        const key = `SECRET`;
        //ENCRYPT
        // To change password uncomment the below block and replace the "password" and run test.
        // const cipher = CryptoJS.AES.encrypt('password',key);
        // console.log(cipher.toString());
        return CryptoJS.AES.decrypt(testConfig.password, key).toString(CryptoJS.enc.Utf8);
    }

    async delay(time: number): Promise<void> {
        return new Promise(function (resolve) {
            setTimeout(resolve, time);
        });
    }

    async clickByText(text: string): Promise<void> {
        await this.page.getByText(text, { exact: true }).click();  //Matches locator with exact text and clicks
    }

    async clickElementJS(locator: string): Promise<void> {
        await this.page.$eval(locator, (element: HTMLElement) => element.click());
    }

    async readValuesFromTextFile(filePath: string): Promise<string> {
        return fs.readFileSync(`${filePath}`, `utf-8`);
    }
}