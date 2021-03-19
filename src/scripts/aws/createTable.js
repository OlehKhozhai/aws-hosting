const AWS = require("aws-sdk")

AWS.config.update({ region: "us-east-1" })

const dynamoDB = new AWS.DynamoDB()

const params = {
  TableName: "ToDo",
  KeySchema: [
    { AttributeName: "id", KeyType: "HASH" },
    { AttributeName: "text", KeyType: "RANGE" },
  ],
  LocalSecondaryIndexes: [
    {
      IndexName: "ActiveIndex",
      KeySchema: [
        { AttributeName: "id", KeyType: "HASH" },
        { AttributeName: "active", KeyType: "RANGE" },
      ],
      Projection: { ProjectionType: "KEYS_ONLY" },
    },
  ],
  AttributeDefinitions: [
    { AttributeName: "id", AttributeType: "S" },
    { AttributeName: "text", AttributeType: "S" },
    { AttributeName: "active", AttributeType: "S" },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10,
  },
}

dynamoDB.createTable(params, (error, data) => {
  if (error) {
    console.log("error---", JSON.stringify(error, null, 2))
  } else {
    console.log("data---", JSON.stringify(data, null, 2))
  }
})
