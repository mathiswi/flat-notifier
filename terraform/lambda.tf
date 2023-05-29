data "archive_file" "function_archive" {
  type        = "zip"
  source_dir  = "${path.module}/../dist/src/ebay"
  output_path = "${path.module}/../dist/function.zip"

}


resource "aws_lambda_function" "ebay_lambda" {
  filename         = data.archive_file.function_archive.output_path
  function_name    = "ebayLambda"
  handler          = "ebay.handler"
  role             = aws_iam_role.ebay_lambda_role.arn
  source_code_hash = data.archive_file.function_archive.output_base64sha256
  layers           = ["arn:aws:lambda:eu-central-1:161489297905:layer:discordjs-lambda-layer:3", "arn:aws:lambda:eu-central-1:161489297905:layer:jsdom-lambda-layer:3", "arn:aws:lambda:eu-central-1:161489297905:layer:telegraf-lambda-layer:1"]

  runtime     = "nodejs16.x"
  timeout     = "30"
  memory_size = "256"
}



resource "aws_cloudwatch_log_group" "function_log_group" {
  name              = "/aws/lambda/${aws_lambda_function.ebay_lambda.function_name}"
  retention_in_days = 14
  lifecycle {
    prevent_destroy = false
  }
}
