# password forgot
    POST api/auth/passwordforgot


## Description
This endpoint is used to get account recovery token via email when password is forgotten


## Requires authentication

**No Authentication is required**

## Parameters

- **email** : required (type:email,unique:true)

## Return format

JSON



## Errors

- **Bad Request (code:404)** : this occur when a parameter is missing

```json
{
  "success": false,
  "error": "There is no user with that email"
}
```

- **Bad Request (code:404)** : this occur when the email entered is not found in the database or the email format is not valid

```json
{
  "success": false,
  "error": "There is no user with that email"
}
```


## Example

**Request**

```bash
curl --request POST \
  --url http://localhost:5000/api/auth/forgotpassword
```

**Return Body**

```json
{
  "success": true,
  "data": "Email sent"
}
```

**Return Code**

- **200**
