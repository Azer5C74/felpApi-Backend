# Register a business account

    PUT /api/menus/items

## Description

add new item to an existing menu

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

## Example

**Request**

```bash
curl --request PUT \
  --url https://felp-api.herokuapp.com/api/menus/items \
  --header 'authorization: Bearer <JWT>' \
  --header 'content-type: application/json' \
  --data '{
		"item": "ma9loub",
		"price": 4
}'
```

**Return Body**

```json
{
  "item": "ma9loub",
  "price": 4
}
```

**Return Code**

- **201**
