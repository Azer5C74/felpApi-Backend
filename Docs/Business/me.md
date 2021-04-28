# Get the logged in business account

    GET /api/businesses/me

## Description

Returns a boolean indicating if the current login user has a business account or not

## Requires authentication

**Bearer Authentication is required**

## Parameters

**No Parameters are required**

## Return format

     JSON

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
curl --request GET \
  --url https://felp-api.herokuapp.com/api/businesses/me/ \
  --header 'authorization: Bearer <JWT>'
```

**Return Body**

```json
{
  "id": "60B9AC4B-757C-4A92-9DCB-987D1D5966C6",
  "isBusinessAcount": true
}
```

**Return Code**

- **200**
