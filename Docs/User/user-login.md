# user login using email and password
    POST api/auth/login

## Description
This endpoint is used to login a pre registered User.


## Requires authentication

**No Authentication is required**

## Parameters

- **email** : required (type:email)
- **password** : required (type:password)

## Return format

     JSON

## Errors

- **Bad Request (code:400)** : this occur when a parameter is missing

```json
{
  "success": false,
  "error": "Please provide an email and password"
}
```

- **Not Found (code:401)** : this occur when wrong format parameters is entered

```json
{
  "success": false,
  "error": "Invalid credentials"
}
```



- **Not Found (code:401)** : this occur when wrong credentials are entered

```json
{
  "success": false,
  "error": "Invalid credentials"
}
```

## Example

**Request**

```bash
curl --request POST \
  --url http://127.0.0.1:8080/api/auth/login
```

**Return Body**

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwODJlNzYxZDdmM2QzOWFlZWRmNTJhZCIsImlhdCI6MTYxOTYwNzkzMSwiZXhwIjoxNjIyMTk5OTMxfQ.VoBnIqWwGWjK5pu-4X8sgrWw4DMjLLMDTdnomBkLnbQ"
}
```

**Return Code**

- **200**

