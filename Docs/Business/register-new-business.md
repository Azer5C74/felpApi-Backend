# Register a business account

    POST /api/businesses/register

## Description

register a new business.

## Requires authentication

**No Authentication is required**

## Parameters

**No Parameters are required**

## Return format

```
JSON
```

## Errors

- **Bad Request (code:400)** : occurs when trying to register an already existant business account.

```json
{
  "error": true,
  "message": "email has already registered"
}
```

## Example

**Request**

```bash
curl --request POST \
  --url https://felp-api.herokuapp.com/api/businesses/register \
  --header 'content-type: application/json' \
  --data '{
	"name": "Morning Coffee",
	"email": "coffee@issatso.com",
	"password": "123345678",
	"confirmPassword": "123345678",
	"type": "coffee",
	"hasDelivery": true,
	"description": "hello everyone welcome to my business. It'\''s my pleasure to serve you !",
	"location": {
		"longitude": "8448488484",
		"altitude": "15151151515"
	}
}'
```

**Return Body**

```json
{
  "_id": "6089a0fcf0273b000456f4c9",
  "name": "morning Coffee",
  "email": "coffeemorning@issatso.com",
  "type": "coffee",
  "hasDelivery": true,
  "hasBooking": false,
  "description": "hello everyone welcome to my business. It's my pleasure to serve you !",
  "location": {
    "_id": "6089a0fcf0273b000456f4ca",
    "longitude": "51151551155",
    "altitude": "22112122112"
  }
}
```

**Return Code**

- **201**
