import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as events from '@aws-cdk/aws-events';
import * as targets from '@aws-cdk/aws-events-targets';
import { Duration } from '@aws-cdk/core';

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class FlatNotifierStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const discordLayer = lambda.LayerVersion.fromLayerVersionArn(this, 'discordjs-lambda-layer', 'arn:aws:lambda:eu-central-1:161489297905:layer:discordjs-lambda-layer:3');
    const jsdomLayer = lambda.LayerVersion.fromLayerVersionArn(this, 'jsdom-lambda-layer', 'arn:aws:lambda:eu-central-1:161489297905:layer:jsdom-lambda-layer:5');

    const ebayLambda = new lambda.Function(this, 'ebay', {
      code: lambda.Code.fromAsset('dist/src/ebay/', { exclude: ['*.ts', 'local.js', '*.html', ''] }),
      handler: 'ebay.handler',
      runtime: lambda.Runtime.NODEJS_14_X,
      timeout: Duration.seconds(20),
      memorySize: 256,
      layers: [discordLayer, jsdomLayer],
    });

    const schedule = new events.Rule(this, 'ebay-scraper', {
      schedule: events.Schedule.expression('rate(5 minutes)'),
    });
    schedule.addTarget(new targets.LambdaFunction(ebayLambda));
  }
}

const app = new cdk.App();
// eslint-disable-next-line no-new
new FlatNotifierStack(app, 'FlatNotifierStack', {});
app.synth();
