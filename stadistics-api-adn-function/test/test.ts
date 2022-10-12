import { describe, it } from 'mocha';
import { handler } from '../index';
import { expect } from 'chai';
import { APIGatewayEvent } from 'aws-lambda';

const executeLambda = async (adn: string[], isClon: boolean): Promise<any> => {
    let event: APIGatewayEvent = {
        body: "",
        headers: {},
        multiValueHeaders: {},
        httpMethod: '',
        isBase64Encoded: false,
        path: '',
        pathParameters: null,
        queryStringParameters: null,
        multiValueQueryStringParameters: null,
        stageVariables: null,
        requestContext: {} as any,
        resource: ''
    }
    const res = await handler(event);

    return res;
}

describe('handler Proccess', () => {
    it('Process Clon', async () => {
        const response = await executeLambda(["WSYEWW", "EWWYYY", "EYWSSY", "WSYWEY", "WESSYY", "YEEEES"], true);
        expect(response).to.have.property("contador_clon_adn");
    })
});
