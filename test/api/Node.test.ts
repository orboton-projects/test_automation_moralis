import { test, expect, APIRequestContext } from '@playwright/test';
import Moralis from 'moralis';
import { APIActions } from '../../lib/APIActions';
import { blockNumberSchema, blockSchema, transactionSchema } from '../../test_data/api/nodeSchemas';
import { apiUrl, apiKey, testData } from '../../test_data/api/nodeTestData';

let apiActions: APIActions;
let context: APIRequestContext;

test.beforeAll(async ({ request }) => {
    await Moralis.start({
        apiKey: apiKey
    });
    apiActions = new APIActions();
    context = await request.newContext({
        baseURL: apiUrl,
        extraHTTPHeaders: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        }
    });
});

test.describe('Ethereum RPC API Testing', { tag: '@API' }, () => {
    
    test('Positive Scenario: blockNumber', async () => {
        console.log(context)
        const response = await context.post('', {
            data: testData.blockNumber.positive.data
        });
        await apiActions.verifyStatusCode(response);
        const responseBody = await response.json();
        const validation = blockNumberSchema.validate(responseBody);
        expect(validation.error).toBeNull();
    });

    test('Negative Scenario: blockNumber', async () => {
        const response = await context.post('', {
            data: testData.blockNumber.negative.data
        });
        await apiActions.verifyStatusCode(response);
        const responseBody = await response.json();
        expect(responseBody.error).toBeDefined();
    });

    test('Positive Scenario: getBlockByNumber', async () => {
        const response = await context.post('', {
            data: testData.getBlockByNumber.positive.data
        });
        await apiActions.verifyStatusCode(response);
        const responseBody = await response.json();
        const validation = blockSchema.validate(responseBody);
        expect(validation.error).toBeNull();
    });

    test('Negative Scenario: getBlockByNumber', async () => {
        const response = await context.post('', {
            data: testData.getBlockByNumber.negative.data
        });
        await apiActions.verifyStatusCode(response);
        const responseBody = await response.json();
        expect(responseBody.error).toBeDefined();
    });

    test('Positive Scenario: getTransactionByHash', async () => {
        const response = await context.post('', {
            data: testData.getTransactionByHash.positive.data
        });
        await apiActions.verifyStatusCode(response);
        const responseBody = await response.json();
        const validation = transactionSchema.validate(responseBody);
        expect(validation.error).toBeNull();
    });

    test('Negative Scenario: getTransactionByHash', async () => {
        const response = await context.post('', {
            data: testData.getTransactionByHash.negative.data
        });
        await apiActions.verifyStatusCode(response);
        const responseBody = await response.json();
        expect(responseBody.error).toBeDefined();
    });
});
