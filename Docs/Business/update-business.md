# Register a business account

    PATCH /api/businesses

## Description

update attributes of an existing business

## Requires authentication

**Authentication is required**

## Parameters

**No Parameters are required**

## Return format

```
JSON
```

## Errors

- **Unauthorized (code:401)** : this occurs when the provided JWT is not valid .

```json
{
  "error": true,
  "reason": "Unauthorized"
}
```

- **Not Found (code:404)** : occurs when there is no business with the provided ID.

```json
{
  "error": true,
  "reason": "the business with the given ID is not found"
}
```

## Example

**Request**

```bash
curl --request PATCH \
  --url https://felp-api.herokuapp.com/api/businesses \
  --header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwODc2N2QwZjAzMDkyNjZkZDliMzZhZCIsImlzQnVzaW5lc3NBY2NvdW50Ijp0cnVlLCJpYXQiOjE2MTk0ODY2NzJ9.UrrW_e73HT7uoDshT8akNvK9x2QkssCkwctwY_b5Wnw' \
  --header 'content-type: application/json' \
  --data '{
	"hasBooking": true,
	"type": "restaurant"
}'
```

**Return Body**

```json
{
  "_id": "608767d0f0309266dd9b36ad",
  "name": "hexoCoffeeee",
  "email": "cacfabfbaz@fefists.com",
  "type": "restaurant",
  "hasDelivery": true,
  "hasBooking": true,
  "description": "hello everyone welcome to my business. It's my pleasure to serve you !",
  "location": {
    "_id": "608767d0f0309266dd9b36ae",
    "longitude": "fb190",
    "altitude": "9eeeefeee"
  },
  "menu": {
    "_id": "60877029deada46e8fa0ce39",
    "items": [
      {
        "_id": "60877029deada46e8fa0ce3a",
        "item": "pizza",
        "price": 151
      },
      {
        "_id": "6087715dc4c2026f2a1afb73",
        "item": "ma9loub",
        "price": 2323
      }
    ]
  }
}
```

**Return Code**

- **200**
