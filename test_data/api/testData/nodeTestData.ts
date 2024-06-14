export const baseURL = 'https://site1.moralis-nodes.com';
export const apiUrl = '/eth/';
export const apiKey = '1ee8a759c5fb48fe994bdeb7eddafdb5';

export const testData = {
    blockNumber: {
        positive: {
            data: {
                jsonrpc: '2.0',
                method: 'eth_blockNumber',
                params: [],
                id: 1
            }
        },
        negative: {
            data: {
                jsonrpc: '2.0',
                method: 'eth_blockNumber',
                params: ['invalid'],
                id: 1
            }
        }
    },
    getBlockByNumber: {
        positive: {
            data: {
                jsonrpc: '2.0',
                method: 'eth_getBlockByNumber',
                params: ['0x10D4F', false],
                id: 1
            }
        },
        negative: {
            data: {
                jsonrpc: '2.0',
                method: 'eth_getBlockByNumber',
                params: ['invalid', false],
                id: 1
            }
        }
    },
    getTransactionByHash: {
        positive: {
            data: {
                jsonrpc: '2.0',
                method: 'eth_getTransactionByHash',
                params: ['0x5d6f6c9f30845d4e63db089bda3d8e1c3d779768b1c5e7f209a3b6c4cfedbbc9'],
                id: 1
            }
        },
        negative: {
            data: {
                jsonrpc: '2.0',
                method: 'eth_getTransactionByHash',
                params: ['invalid'],
                id: 1
            }
        }
    }
};
