import { APIGatewayProxyResult, SQSEvent } from 'aws-lambda';

interface InputEvent {
    adn: string[],
    isClon: boolean
}
import AWS from "aws-sdk";

export const handler = async (event: SQSEvent): Promise<APIGatewayProxyResult> => {

    console.log("Event", JSON.stringify(event));

    var firstEvent = event.Records[0];

    var input = JSON.parse(firstEvent.body) as InputEvent;
    var joinAdn = input.adn.join().replace(/,/g, "");

    AWS.config.update({
        region: "us-east-1",
        accessKeyId: "AKIA5RRY3JSXCMWLZUIG",
        secretAccessKey: "5xpjZ05Vs6deyx19R1W8N4NfNWAoCpuiQL3RDYaE"
    });

    var documentClient = new AWS.DynamoDB.DocumentClient();

    //////////////////////////////////

    try {
        console.log("Searching ADN in DynamoDB");
        const data = await documentClient.query({
            TableName: "ADN",
            IndexName: "adn-index",
            KeyConditionExpression: "#adn = :id",
            ExpressionAttributeNames: {
                "#adn" : "adn"
            },
            ExpressionAttributeValues: {
                ":id": joinAdn,
            },
        }).promise();

        if (data.Items && data.Items.length == 0) {
            console.log("Creating new ADN into DynamoDB");

            var params = {
                TableName: "ADN",
                Item: {
                    "adn": joinAdn,
                    "sequence": input.adn,
                    "type": input.isClon ? "CLON" : "FRIEND",
                    "created_at": new Date().getTime().toString(),
                }
            }
            console.log("Params:", JSON.stringify(params));
            var response = await documentClient.put(params).promise();

            console.log("Response new ADN: ", JSON.stringify(response));
        }else{
            console.log("Query ADN Exists", data.Items);
            console.log("Skip process");
        }

        return {
            statusCode: 200, body: "Proccess Correct!"
        }
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500, body: "Not Process ADN"
        }
    }
}

