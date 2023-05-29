data "aws_iam_policy_document" "assume_role" {
  statement {
    effect = "Allow"
    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
    actions = ["sts:AssumeRole"]
  }
}

data "aws_iam_policy_document" "dynamodb-policy" {
  statement {
    effect = "Allow"
    resources = [
      "arn:aws:dynamodb:eu-central-1*",
    ]

    actions = ["dynamodb:Scan", "dynamodb:PutItem"]
  }
}

resource "aws_iam_policy" "lambda_policy" {
  policy = data.aws_iam_policy_document.dynamodb-policy.json
}


resource "aws_iam_role" "ebay_lambda_role" {
  name               = "ebay_lambda_role"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}


resource "aws_iam_policy_attachment" "lambda_attachment" {
  name = "ebayLambda-attachment"

  roles = [
    "${aws_iam_role.ebay_lambda_role.name}",
  ]

  policy_arn = aws_iam_policy.lambda_policy.arn
}


resource "aws_iam_policy" "function_logging_policy" {
  name = "function-logging-policy"
  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        Action : [
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        Effect : "Allow",
        Resource : "arn:aws:logs:*:*:*"
      }
    ]
  })
}


resource "aws_iam_role_policy_attachment" "function_logging_policy_attachment" {
  role       = aws_iam_role.ebay_lambda_role.id
  policy_arn = aws_iam_policy.function_logging_policy.arn
}
