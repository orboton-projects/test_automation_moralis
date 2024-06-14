import Joi from 'joi';

export const blockNumberSchema = Joi.object({
    jsonrpc: Joi.string().valid('2.0').required(),
    id: Joi.number().required(),
    result: Joi.string().regex(/^0x[0-9a-fA-F]+$/).required()
});

export const blockSchema = Joi.object({
    jsonrpc: Joi.string().valid('2.0').required(),
    id: Joi.number().required(),
    result: Joi.object({
        number: Joi.string().regex(/^0x[0-9a-fA-F]+$/).required(),
        hash: Joi.string().regex(/^0x[0-9a-fA-F]+$/).required(),
        parentHash: Joi.string().regex(/^0x[0-9a-fA-F]+$/).required(),
        // Add other block properties as needed
    }).required()
});

export const transactionSchema = Joi.object({
    jsonrpc: Joi.string().valid('2.0').required(),
    id: Joi.number().required(),
    result: Joi.object({
        blockHash: Joi.string().regex(/^0x[0-9a-fA-F]+$/).required(),
        blockNumber: Joi.string().regex(/^0x[0-9a-fA-F]+$/).required(),
        // Add other transaction properties as needed
    }).required()
});
