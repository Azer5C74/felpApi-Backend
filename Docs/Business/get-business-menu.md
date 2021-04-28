# Get a business using its ID

    GET /api/businesses/:id/menu

## Description

Gets a business menu by providing the business ID

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

- **Not Found (code:404)** : occurs when the business does not have a menu

```json
{
  "error": true,
  "reason": "the menu has not been set for this business yet"
}
```

## Example

**Request**

```bash
curl --request GET \
  --url https://felp-api.herokuapp.com/api/businesses/608767d0f0309266dd9b36ad/menu
```

**Return Body**

```json
{
  "menuID": "60877029deada46e8fa0ce39",
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
```

**Return Code**

- **200**
