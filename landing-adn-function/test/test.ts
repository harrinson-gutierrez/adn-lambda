import { APIGatewayEvent, APIGatewayProxyEventV2 } from 'aws-lambda/trigger/api-gateway-proxy';
import { describe, it, afterEach } from 'mocha';
import { handler } from '../index';
import { expect } from 'chai';

const executeLambda = async (adn: string[]): Promise<any> => {
    let event: APIGatewayEvent = {
        body: JSON.stringify({ adn: adn }),
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

describe('handler', () => {
    it('Its a Clon', async () => {
        const response = await executeLambda(["WSYEWW", "EWWYYY", "EYWSSY", "WSYWEY", "WESSYY", "YEEEES"]);
        expect(response).to.have.property("statusCode").equal(200);
    })
    /*
       it('Its not a Clon', async () => {
            const response = await executeLambda(["WSYEWW", "EWWYYY", "EYWSSY", "WSYWEY", "WESSYY", "YEEEES"]);
            expect(response).to.have.property("statusCode").equal(200);
        })*/
});
