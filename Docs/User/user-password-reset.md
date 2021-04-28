# password reset
    PUT api/auth/passwordreset/:token


## Description
This endpoint is used to set new password


## Requires authentication

**No Authentication is required**

## Parameters

- **password** : required (type:password,min-length:6)

## Return format

JSON



## Errors

- **Bad Request (code:400)** : this occur when a parameter is missing


```json
{
  "success": false,
  "error": "Please add a password"
}
```



- **Bad Request (code:400)** : this occur when an expired or invalid token is entered.

```json
{
  "success": false,
  "error": "Invalid token"
}
```


- **Bad Request (code:400)** : this occur when a short password is entered.

```json

{
  "success": false,
  "error": "Path `password` (`s`) is shorter than the minimum allowed length (6)."
}
```






## Example

**Request**

```bash
curl --request PUT \
  --url http://localhost:5000/api/auth/resetpassword/5ae9146e1150583cc3338262d1f495c61cb2d81a
```



**Return Body**

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwODYxZmUzNGY5MDYwODcxNjgyOGYyYiIsImlhdCI6MTYxOTYxMTA5NCwiZXhwIjoxNjIyMjAzMDk0fQ.qp9wOJF0N1wOaN1EgF1FPfSZlkg3-e6VAzS3OS6csm0"
}
```

**Return Code**

- **200**
