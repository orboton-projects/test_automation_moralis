import Moralis from 'moralis';

export class MoralisActions {
  static async start(apiKey: string): Promise<void> {
    await Moralis.start({ apiKey });
  }

  static async getWalletNFTs(address: string): Promise<any> {
    try {
      const response = await Moralis.EvmApi.nft.getWalletNFTs({
        chain: "0x1",
        format: "decimal",
        mediaItems: false,
        address,
      });
      return response.raw;
    } catch (error) {
      throw new Error(`Failed to fetch NFTs: ${error.message}`);
    }
  }
}
