// NFTApi.test.ts

import { test, expect } from '@playwright/test';
import { MoralisActions } from '../../lib/MoralisAction';
import { nftSchema } from '../../test_data/api/nftSchemas';
import { apiKey, positiveTestData, negativeTestData } from '../../test_data/api/nftTestData';

let moralisActions: MoralisActions;

test.beforeAll(async () => {
  moralisActions = new MoralisActions();
  await moralisActions.start(apiKey);
});

test.describe('Moralis NFT API Tests', { tag: '@API' }, () => {
  
  test('Positive Scenario: Get Wallet NFTs', async () => {
    const response = await moralisActions.getWalletNFTs(positiveTestData.address);
    expect(response).toBeDefined();
    const validationResult = nftSchema.validate(response);
    expect(validationResult.error).toBeNull();
  });

  test('Negative Scenario: Get Wallet NFTs with Invalid Address', async () => {
    try {
      await moralisActions.getWalletNFTs(negativeTestData.address);
      // If it doesn't throw error, fail the test
      expect(true).toBe(false); // Fail the test if no error is thrown
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toContain('Failed to fetch NFTs');
    }
  });
});
