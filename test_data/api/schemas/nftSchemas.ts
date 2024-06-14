import Joi from 'joi';

export const nftSchema = Joi.object({
  amount: Joi.string().required(),
  token_id: Joi.string().required(),
  token_address: Joi.string().required(),
  contract_type: Joi.string().required(),
  owner_of: Joi.string().required(),
  last_metadata_sync: Joi.string().isoDate().required(),
  last_token_uri_sync: Joi.string().isoDate().required(),
  metadata: Joi.any().allow(null),
  block_number: Joi.string().required(),
  block_number_minted: Joi.any().allow(null),
  name: Joi.string().required(),
  symbol: Joi.string().required(),
  token_hash: Joi.string().required(),
  token_uri: Joi.string().uri().required(),
  minter_address: Joi.any().allow(null),
  verified_collection: Joi.boolean().required(),
  possible_spam: Joi.boolean().required(),
  collection_logo: Joi.string().uri().required(),
  collection_banner_image: Joi.string().uri().required()
});



export const responseSchema = Joi.object({
  status: Joi.string().required(),
  page: Joi.number().integer().required(),
  page_size: Joi.number().integer().required(),
  cursor: Joi.string().required(),
  result: Joi.array().items(nftSchema).required()
});
