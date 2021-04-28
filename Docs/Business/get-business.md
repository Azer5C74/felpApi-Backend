# Get a business using its ID

    GET /api/businesses/:id

## Description

Gets business details including its location and its menu

## Requires authentication

**No Authentication is required**

## Parameters

- **id** : required (type:Object-ID)

## Return format

```
JSON
```

## Errors

- **Bad Request (code:400)** : occurs when a non Object ID type was provided in the URI.

```json
{
  "error": true,
  "reason": "Invalid ID"
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
curl --request GET \
  --url https://felp-api.herokuapp.com/api/businesses/608767d0f0309266dd9b36ad
```

**Return Body**

```json
{
  "_id": "608767d0f0309266dd9b36ad",
  "name": "hexoCoffeeee",
  "email": "cacfabfbaz@fefists.com",
  "type": "cafeeee",
  "hasDelivery": true,
  "hasBooking": false,
  "description": "hello everyone welcome to my business. It's my pleasure to serve you !",
  "location": {
    "_id": "608767d0f0309266dd9b36ae",
    "longitude": "266226622626",
    "altitude": "2112212112121"
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
