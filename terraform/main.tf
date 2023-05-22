resource "aws_dynamodb_table" "ebay-table" {
  name = "ebayTable"

  billing_mode   = "PROVISIONED"
  read_capacity  = 20
  write_capacity = 20

  hash_key = "flatId"

  attribute {
    name = "flatId"
    type = "S"
  }

}
