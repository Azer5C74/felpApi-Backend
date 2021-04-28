# user update details
    PUT /api/auth/updatedetails



## Description
This endpoint is used to update user's details, it returns the new updated object.


## Requires authentication

**Authentication is required**


## Parameters

- **password** : (type:password,min-length:6)
- **email** :   (type:email)
- **lastname**: (type:string)
- **firstname**: (type:sring)


## Return format

JSON

## Errors


- **Bad Request (code:400)** : this occur when a user tries to change his email(unique parameter) to an occupied email address.

```json

{
  "success": false,
  "error": "Duplicate field value entered"
}
```

- **Bad Request (code:400)** : this occur when a user tries to change his email(unique parameter) to non valid email format

```json

{
  "success": false,
  "error": "Please add a valid email"
}
```

## Example

**Request**

```bash
curl --request GET \
  --url http://localhost:5000/api/auth/updatedetails
```


**Return Body**

```json

{
  "success": true,
  "data": {
    "role": "user",
    "_id": "60861fe34f90608716828f2b",
    "firstname": "azser",
    "lastname": "user Taboubi",
    "email": "azer.user@gmail.com",
    "createdAt": "2021-04-26T02:05:23.042Z",
    "__v": 0
  }
}

```

**Return Code**

- **200**
