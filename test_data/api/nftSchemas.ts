// Schemas.ts

import Joi from 'joi';

export const nftSchema = Joi.object({
  status: Joi.string().required(),
  total: Joi.string().required(),
  page: Joi.string().required(),
  page_size: Joi.string().required(),
  cursor: Joi.string().allow('').required(),
  result: Joi.object({
    token_address: Joi.string().required(),
    token_id: Joi.string().required(),
    contract_type: Joi.string().required(),
    owner_of: Joi.string().required(),
    block_number: Joi.string().required(),
    block_number_minted: Joi.string().required(),
    token_uri: Joi.string().allow('').required(),
    metadata: Joi.string().allow('').required(),
    normalized_metadata: Joi.string().allow('').required(),
    media: Joi.string().allow('').required(),
    amount: Joi.string().required(),
    name: Joi.string().required(),
    symbol: Joi.string().required(),
    token_hash: Joi.string().required(),
    last_token_uri_sync: Joi.string().required(),
    last_metadata_sync: Joi.string().required(),
    possible_spam: Joi.string().required(),
    verified_collection: Joi.string().required(),
  }).required(),
});
