import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

interface InputEvent {
    adn: string[],
    isClon: boolean
}
import AWS, { DAX } from "aws-sdk";

export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult | any> => {
    AWS.config.update({
        region: "us-east-1",
        accessKeyId: "AKIA5RRY3JSXCMWLZUIG",
        secretAccessKey: "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"
    });

    var documentClient = new AWS.DynamoDB.DocumentClient();

    console.log("Searching ADN FRIEND in DynamoDB");

    const data = await documentClient.query({
        TableName: "ADN",
        KeyConditionExpression: "#dif = :val2",
        ExpressionAttributeValues: {
            ":val2": "FRIEND"
        },
        ExpressionAttributeNames:{
            "#dif": "type"
        }
    }).promise();

    let clonCount = data.ScannedCount;

    console.log("Searching ADN CLON in DynamoDB");

    const data2 = await documentClient.query({
        TableName: "ADN",
        KeyConditionExpression: "#dif = :val2",
        ExpressionAttributeValues: {
            ":val2": "CLON"
        },
        ExpressionAttributeNames:{
            "#dif": "type"
        }
    }).promise();

    let friendCount = data2.ScannedCount;

    let average = (friendCount! * 100) / (clonCount! + friendCount!);

    let result = {
        contador_clon_adn: clonCount,
        contador_amigos_adn: friendCount,
        promedio: !isNaN(average) ? (average / 100).toFixed(1) : 0
    }

    return result;
}

