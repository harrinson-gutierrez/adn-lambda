import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { isClon } from './src/adn';
import AWS from 'aws-sdk';

export interface ADNInput {
    adn: string[]
}

export interface ADNOuput {
    adn:string[],
    isClon: boolean;
}

export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {

    AWS.config.update({
        region: "us-east-1",
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.ACCESS_SECRET
    });
    
    var sqs = new AWS.SQS({ region: 'us-east-1'});


    console.log("Event", event);

    const body = JSON.parse(event.body as string) as ADNInput;

    console.log("Body", body);

    const clon = isClon(body.adn)
    
    const paramsClon: ADNOuput = {
        adn: body.adn,
        isClon: clon
    }

    var params = {
        DelaySeconds: 2,
        MessageBody: JSON.stringify(paramsClon),
        QueueUrl: "https://sqs.us-east-1.amazonaws.com/931053391022/ADN_SQS",
    };
    console.log("Params for SQS:", params);
    const response = await sqs.sendMessage(params).promise();
    console.log(`Response:" ${JSON.stringify(response, null, 2)}`)

    if (!clon) {
        return {
            statusCode: 200,
            body: JSON.stringify({ clon: clon })
        };
    } else {
        return {
            statusCode: 403,
            body: JSON.stringify({ clon: clon })
        };
    }
}