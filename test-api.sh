#!/bin/bash

echo "🧪 Testing Locations API..."
echo ""

BASE_URL="http://localhost:3001"

echo "1️⃣  Testing Health Check..."
curl -s $BASE_URL/health | jq '.'
echo ""
echo ""

echo "2️⃣  Creating test location..."
CREATE_RESPONSE=$(curl -s -X POST $BASE_URL/locations \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Location",
    "description": "This is a test location",
    "latitude": -22.9519,
    "longitude": -43.2105,
    "imageUrl": "https://images.unsplash.com/photo-1483729558449-99ef09a8c325"
  }')

echo $CREATE_RESPONSE | jq '.'
LOCATION_ID=$(echo $CREATE_RESPONSE | jq -r '.id')
echo ""
echo "Created location with ID: $LOCATION_ID"
echo ""

echo "3️⃣  Listing all locations..."
curl -s $BASE_URL/locations | jq '.'
echo ""
echo ""

echo "4️⃣  Getting location by ID..."
curl -s $BASE_URL/locations/$LOCATION_ID | jq '.'
echo ""
echo ""

echo "5️⃣  Updating location..."
curl -s -X PUT $BASE_URL/locations/$LOCATION_ID \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Test Location",
    "description": "This location has been updated"
  }' | jq '.'
echo ""
echo ""

echo "6️⃣  Deleting location..."
curl -s -X DELETE $BASE_URL/locations/$LOCATION_ID
echo "Location deleted"
echo ""
echo ""

echo "✅ All tests completed!"
echo ""
echo "📚 View API docs at: $BASE_URL/api/docs"


