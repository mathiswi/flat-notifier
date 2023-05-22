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


resource "aws_iam_role" "iam_for_lambda" {
  name               = "iam_for_lambda"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}


resource "aws_iam_policy_attachment" "lambda_attachment" {
  name = "ebayLambda-attachment"

  roles = [
    "${aws_iam_role.iam_for_lambda.name}",
  ]

  policy_arn = aws_iam_policy.lambda_policy.arn
}
