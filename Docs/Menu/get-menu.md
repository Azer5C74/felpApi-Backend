# Get a business using its ID

    GET /api/menus/:id

## Description

Gets menu details

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
  "reason": "the menu with the given ID is not found"
}
```

## Example

**Request**

```bash
curl --request GET \
  --url https://felp-api.herokuapp.com/api/menus/60877029deada46e8fa0ce39
```

**Return Body**

```json
{
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
```

**Return Code**

- **200**
