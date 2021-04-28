# Register a business account

    POST /api/menus

## Description

create a new menu for the business.

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
curl --request POST \
  --url https://felp-api.herokuapp.com/api/menus \
  --header 'authorization: Bearer <JWT>' \
  --header 'content-type: application/json' \
  --data '{
	"items": [
		{
			"item": "pizza",
			"price": 151
		}
	]
}'
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
    }
  ]
}
```

**Return Code**

- **201**
