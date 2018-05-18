# AWS Lightsail Microservice

[![Build Status](https://travis-ci.com/alaninchika/aws-lightsail.svg?branch=master)](https://travis-ci.com/alaninchika/aws-lightsail)
[![codecov](https://codecov.io/gh/alaninchika/aws-lightsail/branch/master/graph/badge.svg)](https://codecov.io/gh/alaninchika/aws-lightsail)

AWS Lightsail microservice deployed to AWS Lambda and API Gateway.

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

