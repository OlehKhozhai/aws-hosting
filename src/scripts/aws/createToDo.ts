import AWS from "aws-sdk"

AWS.config.update({
  region: "us-east-1",
})

const dynamoDB = new AWS.DynamoDB.DocumentClient()

export const createToDo = (todo: any) => {
  dynamoDB.put({ TableName: "ToDoList", Item: todo }, (error, data) => {
    if (error) {
      console.log("error---", JSON.stringify(error, null, 2))
    } else {
      console.log("data---", JSON.stringify(data, null, 2))
    }
  })
}
