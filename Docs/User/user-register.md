# register user

    POST api/auth/register

## Description

This endpoint is used to create a new User Registration.

## Requires authentication

**No Authentication is required**

## Parameters

- **email** : required (type:email,unique:true)
- **password** : required (type:password,min-length:6)
- **firstname** : required(type:string)
- **lastname** : required(type:string)
- **role** : (type:string,default:user)

## Return format

     JSON

## Errors

- **Bad Request (code:400)** : this occur when duplicate unique parameter is entered.

```json
{
  "success": false,
  "error": "Duplicate field value entered"
}
```

- **Bad Request (code:400)** : this occur when a parameter is missing.

```json
{
  "success": false,
  "error": "Please add your first name"
}
```

- **Bad Request (code:400)** : this occur when a short password is entered.

```json
{
  "success": false,
  "error": "Path `password` (`s`) is shorter than the minimum allowed length (6)."
}
```

- **Bad Request (code:400)** : this occurs when a the user tries to register with a registered email.

```json
{
  "success": false,
  "error": "email has already registered."
}
```

## Example

**Request**

```bash
curl --request POST \
  --url http://localhost:5000/api/auth/register
```

**Return Body**

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwODk0NDc4ZDk4Zjg5NDcwYmVmYzcxZCIsImlhdCI6MTYxOTYwODY5NiwiZXhwIjoxNjIyMjAwNjk2fQ.wUU3dNaqeFfInXyzRQEkuzGufV6UWyqR1ehWjd4uhfA"
}
```

**Return Code**

- **200**
