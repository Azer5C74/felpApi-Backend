# current user
    GET api/auth/me

## Description
This endpoint is used to get currently logged in user's data including his submitted reviews.



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
        "_id": "6082e761d7f3d39aeedf52ad",
        "firstname": "kabil",
        "lastname": "naceur",
        "email": "kabil.user@gmail.com",
        "createdAt": "2021-04-23T15:27:29.779Z",
        "__v": 0
    },
    "review": [
        {
            "_id": "60994ccd9c2064b27877410d",
            "title": "chayta ki wejhk !",
            "text": "Barra t3allem osmt 3adhma ba3d ija",
            "rating": 1,
            "business": "608767d0f0309266dd9b36ad",
            "user": "6082e761d7f3d39aeedf52ad",
            "createdAt": "2021-05-10T15:10:05.716Z",
            "__v": 0
        },
        {
            "_id": "609c6ab20e4bf62b558e204f",
            "business": "609998cec3a8011467e68610",
            "user": "6082e761d7f3d39aeedf52ad",
            "text": "sa77a gaddour !",
            "rating": 4,
            "createdAt": "2021-05-12T23:54:26.007Z",
            "__v": 0
        }
    ]
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

