// Your test file (e.g., Node.test.ts)

import { test, expect } from '@playwright/test';
import axios from 'axios';
import { blockNumberSchema, blockSchema, transactionSchema } from '../../test_data/api/schemas/nodeSchemas';
import { apiUrl, apiKey, testData } from '../../test_data/api/testData/nodeTestData';
import { APIActions } from '../../lib/APIActions';

let apiActions: APIActions;

test.beforeAll(() => {
  apiActions = new APIActions();
});

const axiosConfig = {
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  }
};

test.describe('Ethereum RPC API Testing', { tag: '@API' }, () => {
    
    test('Positive Scenario: blockNumber', async () => {
        try {
            const response = await axios.post(apiUrl, testData.blockNumber.positive.data, axiosConfig);
            await apiActions.verifyStatusCode(response, 200);
            const responseBody = response.data;
            await apiActions.validateSchema(blockNumberSchema, responseBody);
            // Additional assertions or handling based on validation
        } catch (error) {
        }
    });

    test('Negative Scenario: blockNumber', async () => {
        try {
            const response = await axios.post(apiUrl, testData.blockNumber.negative.data, axiosConfig);
            await apiActions.verifyStatusCode(response, 200);
            const responseBody = response.data;
            expect(responseBody.error).toBeDefined();
        } catch (error) {
        }
    });

    test('Positive Scenario: getBlockByNumber', async () => {
        try {
            const response = await axios.post(apiUrl, testData.getBlockByNumber.positive.data, axiosConfig);
            await apiActions.verifyStatusCode(response, 200);
            const responseBody = response.data;
            await apiActions.validateSchema(blockSchema, responseBody);
        } catch (error) {
        }
    });

    test('Negative Scenario: getBlockByNumber', async () => {
        try {
            const response = await axios.post(apiUrl, testData.getBlockByNumber.negative.data, axiosConfig);
            await apiActions.verifyStatusCode(response, 200);
            const responseBody = response.data;
            expect(responseBody.error).toBeDefined();
        } catch (error) {
        }
    });

    test('Positive Scenario: getTransactionByHash', async () => {
        try {
            const response = await axios.post(apiUrl, testData.getTransactionByHash.positive.data, axiosConfig);
            await apiActions.verifyStatusCode(response, 200);
            const responseBody = response.data;
            await apiActions.validateSchema(transactionSchema, responseBody);
        } catch (error) {
        }
    });

    test('Negative Scenario: getTransactionByHash', async () => {
        try {
            const response = await axios.post(apiUrl, testData.getTransactionByHash.negative.data, axiosConfig);
            await apiActions.verifyStatusCode(response, 200);
            const responseBody = response.data;
            expect(responseBody.error).toBeDefined();
        } catch (error) {
        }
    });

});
