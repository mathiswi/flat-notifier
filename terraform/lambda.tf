data "archive_file" "function_archive" {
  type        = "zip"
  source_dir  = "${path.module}/../dist/src/ebay"
  output_path = "${path.module}/../dist/function.zip"

}


resource "aws_lambda_function" "lambda" {
  filename      = data.archive_file.function_archive.output_path
  function_name = "ebayLambda"
  handler       = "ebay.handler"
  role          = aws_iam_role.iam_for_lambda.arn

  layers = ["arn:aws:lambda:eu-central-1:161489297905:layer:discordjs-lambda-layer:3", "arn:aws:lambda:eu-central-1:161489297905:layer:jsdom-lambda-layer:5"]

  runtime     = "nodejs14.x"
  timeout     = "30"
  memory_size = "256"
}

