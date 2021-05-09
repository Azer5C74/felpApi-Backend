# Get business recommendations

    GET /api/businesses/recommendations

## Description

Gets a list of recommended businesses based on user location and current time.

## Requires authentication

**No Authentication is required**

## Parameters

**No Parameters are required**

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
  "reason": "there are no recommendations. Check your input attributes"
}
```

## Example

**Request**

```bash
curl --request GET \
  --url http://localhost:5000/api/businesses/recommendations \
  --header 'content-type: application/json' \
  --data '{
	"currentUserLocation": {
		"longitude": 35.812222346567395,
		"altitude": 10.638351007547316
	},
	"radiusInKm": 5,
	"currentTimeStampInMs": 1620162525000
}'
```

**Return Body**

```json
{
  "recommendedBusinesses": [
    {
      "hasDelivery": true,
      "hasBooking": false,
      "_id": "60917eda2c90f63842065c6f",
      "name": "Sendai",
      "email": "Sendai@issatso.com",
      "type": "restaurant",
      "description": "hello everyone welcome to my business. It's my pleasure to serve you !",
      "location": {
        "_id": "60917eda2c90f63842065c70",
        "longitude": "35.84301470724398",
        "altitude": "10.628311378748785"
      },
      "__v": 0
    }
  ]
}
```

**Return Code**

- **200**
