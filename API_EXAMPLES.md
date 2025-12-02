# API Examples - Locations

## Base URL
```
Development: http://localhost:3001
Production: https://your-app.onrender.com
```

## Headers
```
Content-Type: application/json
```

---

## 1. Create Location

### Request
```http
POST /locations HTTP/1.1
Content-Type: application/json

{
  "name": "Cristo Redentor",
  "description": "Monumento icônico do Rio de Janeiro, uma das Sete Maravilhas do Mundo Moderno",
  "latitude": -22.9519,
  "longitude": -43.2105,
  "imageUrl": "https://images.unsplash.com/photo-1483729558449-99ef09a8c325"
}
```

### cURL
```bash
curl -X POST http://localhost:3001/locations \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Cristo Redentor",
    "description": "Monumento icônico do Rio de Janeiro",
    "latitude": -22.9519,
    "longitude": -43.2105,
    "imageUrl": "https://images.unsplash.com/photo-1483729558449-99ef09a8c325"
  }'
```

### Response (201 Created)
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Cristo Redentor",
  "description": "Monumento icônico do Rio de Janeiro",
  "latitude": -22.9519,
  "longitude": -43.2105,
  "imageUrl": "https://images.unsplash.com/photo-1483729558449-99ef09a8c325",
  "createdAt": "2024-12-02T00:00:00.000Z",
  "updatedAt": "2024-12-02T00:00:00.000Z"
}
```

---

## 2. List All Locations

### Request
```http
GET /locations HTTP/1.1
```

### cURL
```bash
curl -X GET http://localhost:3001/locations
```

### Response (200 OK)
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Cristo Redentor",
    "description": "Monumento icônico do Rio de Janeiro",
    "latitude": -22.9519,
    "longitude": -43.2105,
    "imageUrl": "https://images.unsplash.com/photo-1483729558449-99ef09a8c325",
    "createdAt": "2024-12-02T00:00:00.000Z",
    "updatedAt": "2024-12-02T00:00:00.000Z"
  },
  {
    "id": "660f9511-f39c-52e5-b827-557766551111",
    "name": "Pão de Açúcar",
    "description": "Complexo de morros com bondinho",
    "latitude": -22.9489,
    "longitude": -43.1566,
    "imageUrl": "https://images.unsplash.com/photo-1548963670",
    "createdAt": "2024-12-02T00:01:00.000Z",
    "updatedAt": "2024-12-02T00:01:00.000Z"
  }
]
```

---

## 3. Get Location by ID

### Request
```http
GET /locations/550e8400-e29b-41d4-a716-446655440000 HTTP/1.1
```

### cURL
```bash
curl -X GET http://localhost:3001/locations/550e8400-e29b-41d4-a716-446655440000
```

### Response (200 OK)
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Cristo Redentor",
  "description": "Monumento icônico do Rio de Janeiro",
  "latitude": -22.9519,
  "longitude": -43.2105,
  "imageUrl": "https://images.unsplash.com/photo-1483729558449-99ef09a8c325",
  "createdAt": "2024-12-02T00:00:00.000Z",
  "updatedAt": "2024-12-02T00:00:00.000Z"
}
```

### Response (404 Not Found)
```json
{
  "statusCode": 404,
  "message": "Location not found",
  "timestamp": "2024-12-02T00:00:00.000Z"
}
```

---

## 4. Update Location

### Request (Partial Update)
```http
PUT /locations/550e8400-e29b-41d4-a716-446655440000 HTTP/1.1
Content-Type: application/json

{
  "name": "Cristo Redentor - Updated",
  "description": "Nova descrição atualizada"
}
```

### cURL
```bash
curl -X PUT http://localhost:3001/locations/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Cristo Redentor - Updated",
    "description": "Nova descrição atualizada"
  }'
```

### Response (200 OK)
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Cristo Redentor - Updated",
  "description": "Nova descrição atualizada",
  "latitude": -22.9519,
  "longitude": -43.2105,
  "imageUrl": "https://images.unsplash.com/photo-1483729558449-99ef09a8c325",
  "createdAt": "2024-12-02T00:00:00.000Z",
  "updatedAt": "2024-12-02T00:05:00.000Z"
}
```

---

## 5. Delete Location

### Request
```http
DELETE /locations/550e8400-e29b-41d4-a716-446655440000 HTTP/1.1
```

### cURL
```bash
curl -X DELETE http://localhost:3001/locations/550e8400-e29b-41d4-a716-446655440000
```

### Response (204 No Content)
```
(No body)
```

### Response (404 Not Found)
```json
{
  "statusCode": 404,
  "message": "Location not found",
  "timestamp": "2024-12-02T00:00:00.000Z"
}
```

---

## Validation Errors

### Invalid Latitude
```http
POST /locations HTTP/1.1
Content-Type: application/json

{
  "name": "Test",
  "description": "Test",
  "latitude": 91,
  "longitude": 0,
  "imageUrl": "https://example.com/image.jpg"
}
```

### Response (400 Bad Request)
```json
{
  "statusCode": 400,
  "message": "Latitude must be between -90 and 90",
  "timestamp": "2024-12-02T00:00:00.000Z"
}
```

---

## Sample Data

### Multiple Locations for Testing

```json
[
  {
    "name": "Cristo Redentor",
    "description": "Monumento icônico do Rio de Janeiro",
    "latitude": -22.9519,
    "longitude": -43.2105,
    "imageUrl": "https://images.unsplash.com/photo-1483729558449-99ef09a8c325"
  },
  {
    "name": "Pão de Açúcar",
    "description": "Complexo de morros famoso com bondinho",
    "latitude": -22.9489,
    "longitude": -43.1566,
    "imageUrl": "https://images.unsplash.com/photo-1548963670-aaaa8f73a5e3"
  },
  {
    "name": "Copacabana",
    "description": "Praia mundialmente famosa",
    "latitude": -22.9711,
    "longitude": -43.1822,
    "imageUrl": "https://images.unsplash.com/photo-1483729558449-99ef09a8c325"
  },
  {
    "name": "Maracanã",
    "description": "Um dos maiores estádios de futebol do mundo",
    "latitude": -22.9122,
    "longitude": -43.2302,
    "imageUrl": "https://images.unsplash.com/photo-1574629810360-7efbbe195018"
  },
  {
    "name": "Jardim Botânico",
    "description": "Jardim histórico com mais de 6.500 espécies",
    "latitude": -22.9661,
    "longitude": -43.2258,
    "imageUrl": "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae"
  }
]
```

---

## Testing with HTTPie

### Install HTTPie
```bash
# macOS
brew install httpie

# Linux
apt install httpie

# Windows
pip install httpie
```

### Examples

```bash
# Create
http POST localhost:3001/locations name="Cristo Redentor" description="Monumento icônico" latitude:=-22.9519 longitude:=-43.2105 imageUrl="https://example.com/img.jpg"

# List
http GET localhost:3001/locations

# Get by ID
http GET localhost:3001/locations/550e8400-e29b-41d4-a716-446655440000

# Update
http PUT localhost:3001/locations/550e8400-e29b-41d4-a716-446655440000 name="Updated Name"

# Delete
http DELETE localhost:3001/locations/550e8400-e29b-41d4-a716-446655440000
```

---

## Postman Collection

Import this into Postman:

```json
{
  "info": {
    "name": "Locations API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Create Location",
      "request": {
        "method": "POST",
        "header": [{"key": "Content-Type", "value": "application/json"}],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"name\": \"Cristo Redentor\",\n  \"description\": \"Monumento icônico\",\n  \"latitude\": -22.9519,\n  \"longitude\": -43.2105,\n  \"imageUrl\": \"https://example.com/image.jpg\"\n}"
        },
        "url": {"raw": "{{baseUrl}}/locations", "host": ["{{baseUrl}}"], "path": ["locations"]}
      }
    },
    {
      "name": "List Locations",
      "request": {
        "method": "GET",
        "url": {"raw": "{{baseUrl}}/locations", "host": ["{{baseUrl}}"], "path": ["locations"]}
      }
    }
  ],
  "variable": [
    {"key": "baseUrl", "value": "http://localhost:3001"}
  ]
}
```

