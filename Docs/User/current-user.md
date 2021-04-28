# current user
    GET api/auth/me

## Description
This endpoint is used to get currently logged in user's data.



## Requires authentication

**Authentication is required**


## Parameters

## Return format

JSON



## Errors

- **Unauthorized (code:401)** : this occur when a non authenticated user tries to reach this endpoint.

```json

{
  "success": false,
  "error": "Not authorized to access this route"
}

```


## Example

**Request**

```bash
curl --request GET \
  --url http://localhost:5000/api/auth/me
```


**Return Body**

```json

{
  "success": true,
  "data": {
    "role": "user",
    "_id": "60861fe34f90608716828f2b",
    "firstname": "azser",
    "lastname": "taboubi",
    "email": "azser.u@gmail.com",
    "createdAt": "2021-04-26T02:05:23.042Z",
    "__v": 0
  }
}
```

**Return Code**

- **200**











## Example

**Request**


```bash
curl --request GET \
  --url http://localhost:5000/api/auth/me
```


```json

{
  "success": true,
  "data": {
    "role": "user",
    "_id": "60861fe34f90608716828f2b",
    "firstname": "azser",
    "lastname": "taboubi",
    "email": "azser.u@gmail.com",
    "createdAt": "2021-04-26T02:05:23.042Z",
    "__v": 0
  }
}

```

**Return Code**

- **200**

