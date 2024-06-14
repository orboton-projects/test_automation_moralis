import { test, request } from '@playwright/test';
import Ajv, { JSONSchemaType } from 'ajv';
import { apiKey } from '../../test_data/api/testData/nftTestData';
import { baseURL, testData } from '../../test_data/api/testData/nodeTestData';

const ajv = new Ajv();

export function validateSchema<T>(schema: JSONSchemaType<T>, data: any): void {
  const validate = ajv.compile(schema);
  const valid = validate(data);
  if (!valid) {
    throw new Error('Schema validation failed: ' + ajv.errorsText(validate.errors));
  }
}

const apiUrl = baseURL + '/eth/1ee8a759c5fb48fe994bdeb7eddafdb5';

interface BlockNumberResponse {
  jsonrpc: string;
  id: number;
  result: string;
}

interface BlockResponse {
  jsonrpc: string;
  id: number;
  result: {
    number: string;
    hash: string;
    // Add other block properties as needed
  };
}

interface TransactionResponse {
  jsonrpc: string;
  id: number;
  result: {
    hash: string;
    // Add other transaction properties as needed
  };
}

const blockNumberSchema: JSONSchemaType<BlockNumberResponse> = {
  type: "object",
  properties: {
    jsonrpc: { type: "string" },
    id: { type: "number" },
    result: { type: "string" },
  },
  required: ["jsonrpc", "id", "result"],
};

const blockSchema: JSONSchemaType<BlockResponse> = {
  type: "object",
  properties: {
    jsonrpc: { type: "string" },
    id: { type: "number" },
    result: {
      type: "object",
      properties: {
        number: { type: "string" },
        hash: { type: "string" },
        // Add other block properties as needed
      },
      required: ["number", "hash"],
    },
  },
  required: ["jsonrpc", "id", "result"],
};

const transactionSchema: JSONSchemaType<TransactionResponse> = {
  type: "object",
  properties: {
    jsonrpc: { type: "string" },
    id: { type: "number" },
    result: {
      type: "object",
      properties: {
        hash: { type: "string" },
        // Add other transaction properties as needed
      },
      required: ["hash"],
    },
  },
  required: ["jsonrpc", "id", "result"],
};

test.describe.skip('Ethereum RPC API tests - Skipped', { tag: '@API' }, () => {
  const makeRequest = async (url: string, method: string, params: any[]) => {
    const response = await (await request.newContext()).post(url, {
      data: {
        jsonrpc: "2.0",
        method: method,
        params: params,
        id: 1,
      },
    });
    return response.json();
  };

  test('blockNumber - positive', async () => {
    console.log(apiUrl, apiKey)
    const response = await makeRequest( apiUrl, 'eth_blockNumber', ['18541416']);
    validateSchema(blockNumberSchema, response);

  });

  test('blockNumber - negative', async () => {
    const response = await makeRequest(apiUrl, 'eth_blockNumber', 
        []);
    test.expect(response.error).toBeDefined();
  });

  test('getBlockByNumber - positive', async () => {
    const response = await makeRequest(apiUrl, 'eth_getBlockByNumber', 
        ['0x11bca28', false]);  
        // '0x11bca28' is the hex representation of block number 18541416
    validateSchema(blockSchema, response);
  });

  test('getBlockByNumber - negative', async () => {
    const response = await makeRequest(apiUrl, 'eth_getBlockByNumber', 
        ['invalid', false]);
    test.expect(response.error).toBeDefined();
  });

  test('getTransactionByHash - positive', async () => {
    const response = await makeRequest(apiUrl, 'eth_getTransactionByHash', 
        ['0xdc85cb1b75fd09c2f6d001fea4aba83764193cbd7881a1fa8ccde350a5681109']);
    validateSchema(transactionSchema, response);

  });

  test('getTransactionByHash - negative', async () => {
    const response = await makeRequest(apiUrl, 'eth_getTransactionByHash', 
        ['invalid']);
    test.expect(response.error).toBeDefined();
  });
});


