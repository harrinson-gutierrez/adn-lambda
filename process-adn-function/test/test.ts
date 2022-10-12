import { describe, it } from 'mocha';
import { handler } from '../index';
import { expect } from 'chai';
import { SQSEvent } from 'aws-lambda';

const executeLambda = async (adn: string[], isClon: boolean): Promise<any> => {
    let event: SQSEvent = {
        Records: [
            {
                messageId: "string",
                receiptHandle: "string",
                body: JSON.stringify({ adn: adn, isClon: isClon }),
                attributes: {} as any,
                messageAttributes: {} as any,
                md5OfBody: "string",
                eventSource: "string",
                eventSourceARN: "string",
                awsRegion: "string",
            }
        ]
    }
    const res = await handler(event);

    return res;
}

describe('handler Proccess', () => {
    it('Process Clon', async () => {
        const response = await executeLambda(["WSYEWW", "EWWYYY", "EYWSSY", "WSYWEY", "WESSYY", "YEEEES"], true);
        expect(response).to.have.property("statusCode").equal(200);
    })
});
