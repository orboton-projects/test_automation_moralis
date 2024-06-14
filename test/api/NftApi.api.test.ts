import { test, expect } from '@playwright/test';
import { nftSchema } from '../../test_data/api/schemas/nftSchemas';
import { apiKey, inValidTestAddress, validTestAddress } from '../../test_data/api/testData/nftTestData';
import Moralis from 'moralis';
import { MoralisActions } from '../../lib/MoralisAction';

let moralisActions: MoralisActions;
let moralisStarted = false; // Flag to ensure Moralis is started only once

test.beforeAll(async () => {
  if (!moralisStarted) {
    await Moralis.start({
        apiKey: apiKey,
    });
    moralisStarted = true;
    moralisActions = new MoralisActions(); 
  }
});

test.describe('Moralis NFT API Tests', { tag: '@API' }, () => {
  
  test('Positive Scenario: Get Wallet NFTs', async () => {
    try {
      const response = await moralisActions.getWalletNFTs(validTestAddress);
      expect(response).toBeDefined();

      // Ensure the result array is defined and has items
      expect(response.result).toBeDefined();
      expect(response.result.length).toBeGreaterThan(0);

      // Validate the first item in the result array
      const firstNft = response.result[0];
      const validationResult = nftSchema.validate(firstNft);
      

      // Assert that validationResult.error is either null or undefined
      expect(validationResult.error).toBeUndefined(); 

    } catch (error) {
      // Handle errors
      console.error('Error fetching or validating NFTs:', error.message);
      throw error;  // Re-throw the error to fail the test
    }
  });

  test('Negative Scenario: Get Wallet NFTs with Invalid Address', async () => {
    try {
      await moralisActions.getWalletNFTs(inValidTestAddress);
      // If it doesn't throw error, fail the test
      expect(true).toBe(false); // Fail the test if no error is thrown
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toContain('Failed to fetch NFTs');
    }
  });

});
