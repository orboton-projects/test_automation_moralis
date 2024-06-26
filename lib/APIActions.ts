import axios, { AxiosResponse } from 'axios';
import Joi from 'joi';
import { expect } from 'playwright/test';


export class APIActions {
  public async verifyStatusCode(response: AxiosResponse<any>, expectedStatusCode: number) {
    expect(response.status).toBe(expectedStatusCode);
  }

  public async validateSchema(schema: Joi.Schema, responseBody: any) {
    const validation = schema.validate(responseBody);
    expect(validation.error).toBeNull();
  }

  public async validateResponseBody(responseBody: any, schema: Joi.Schema) {
    // Example validation using blockNumberSchema
    const validation = schema.validate(responseBody);
    expect(validation.error).toBeNull();
    // Add more specific assertions or handling based on validation if needed
  }
}
