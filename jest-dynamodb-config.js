module.exports = {
  tables: [
    {
      TableName: "TrucksTable",
      KeySchema: [
        {
          AttributeName: "truckID",
          KeyType: "HASH",
        },
      ],
      AttributeDefinitions: [
        {
          AttributeName: "truckID",
          AttributeType: "S",
        },
      ],
      BillingMode: "PAY_PER_REQUEST",
    },
    {
      TableName: "ParcelsTable",
      KeySchema: [
        {
          AttributeName: "parcelID",
          KeyType: "HASH",
        },
      ],
      AttributeDefinitions: [
        {
          AttributeName: "parcelID",
          AttributeType: "S",
        },
      ],
      BillingMode: "PAY_PER_REQUEST",
    },
  ],
};
