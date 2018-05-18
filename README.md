# AWS Lightsail Microservice

[![Build Status](https://travis-ci.com/alaninchika/aws-lightsail.svg?branch=master)](https://travis-ci.com/alaninchika/aws-lightsail)
[![codecov](https://codecov.io/gh/alaninchika/aws-lightsail/branch/master/graph/badge.svg)](https://codecov.io/gh/alaninchika/aws-lightsail)

AWS Lightsail microservice deployed to AWS Lambda and API Gateway.

### Pipeline
The pipeline is a full CI/CD serverless pipeline for building and deploying lambda function and api. In this application we are using CloudFormation to create the pipeline, all resources, and any permissions needed.

The following resources are created:

- An S3 bucket to store deployment artifacts.
- An AWS CodeBuild stage to build any changes checked into the repo.
- The AWS CodePipeline that will watch for changes on your repo, and push these changes through to build and deployment steps.
- All IAM roles and policies required.

The CloudFormation templates being used to create these resources can be found in [pipeline directory](pipeline/).

To create the pipeline stack, click the launch stack button below.

[<img src="https://s3.amazonaws.com/cloudformation-examples/cloudformation-launch-stack.png">](https://console.aws.amazon.com/cloudformation/home?region=ap-southeast-2#/stacks/new?stackName=lambda-lightsail&templateURL=https://s3.amazonaws.com/cf-templates-kyd57s8qgptd-ap-southeast-2/lightsail/main.yaml)

### API
The Serverless API we are building! The [api section](/) contains five files.

1. **[beta.json](beta.json):** The CloudFormation staging file. This will be used by CloudFormation to pass parameters to our CloudFormation template.
2. **[buildspec.yml](buildspec.yml):** This is used by CodeBuild in the build step of our pipeline. We will get to that later.
3. **[index.js](index.js):** The Lambda function code!
4. **[package.json](package.json):** The package.json that defines what packages we need for our Lambda function.
5. **[template.yaml](template.yaml):** This is the template file that will be used to create our API gateway resource, Lambda function and hook them up together

### Usage

The service requires the following GET query strings:

- `action` - The required action
- `reference` - The instance name

Request:

```http
GET /lightsail?action=start&reference=WordPress-512MB-Sydney-TEST HTTP/1.1
Content-Type: application/x-www-form-urlencoded
```

```http
GET /lightsail?action=stop&reference=WordPress-512MB-Sydney-TEST HTTP/1.1
Content-Type: application/x-www-form-urlencoded
```

```http
GET /lightsail?action=status&reference=WordPress-512MB-Sydney-TEST HTTP/1.1
Content-Type: application/x-www-form-urlencoded
```

Response:
```http
HTTP/1.1 200 OK

{
  "id": "43684203-f9fe-4e0b-acdf-9e4eae3dff18",
  "CurrentState": "stopping",
}

{
  "CurrentState": "stopped",
}
```

