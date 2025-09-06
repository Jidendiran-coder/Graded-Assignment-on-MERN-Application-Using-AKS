#!/bin/bash

echo "=============================="
echo "🚀 Starting Advanced Test Plan"
echo "=============================="

# Helper function to generate random suffix
rand_suffix() {
  echo $RANDOM$RANDOM
}

# ----------------------------
# Hello-Service Tests
# ----------------------------
echo -e "\n🔹 Testing Hello-Service..."
echo "1️⃣ /health"
curl -s http://localhost:4000/health | jq .
echo "2️⃣ /"
curl -s http://localhost:4000/ | jq .

# ----------------------------
# Profile-Service Tests
# ----------------------------
echo -e "\n🔹 Testing Profile-Service..."
USER_NAME="TestUser$(rand_suffix)"
echo "1️⃣ /health"
curl -s http://localhost:5000/health | jq .

echo "2️⃣ /addUser"
ADD_USER_RESPONSE=$(curl -s -X POST http://localhost:5000/addUser \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"$USER_NAME\",\"age\":30}")
echo $ADD_USER_RESPONSE | jq .

echo "3️⃣ /fetchUser"
curl -s http://localhost:5000/fetchUser | jq .

echo "4️⃣ /addUser (duplicate test)"
curl -s -X POST http://localhost:5000/addUser \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"$USER_NAME\",\"age\":30}" | jq .

# ----------------------------
# Trip-Service Tests
# ----------------------------
echo -e "\n🔹 Testing Trip-Service..."
TRIP_TITLE="TestTrip$(rand_suffix)"
TRIP_LOCATION="TestCity"

echo "1️⃣ /health"
curl -s http://localhost:4000/health | jq .

echo "2️⃣ /trip"
ADD_TRIP_RESPONSE=$(curl -s -X POST http://localhost:4000/trip \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"$TRIP_TITLE\",\"location\":\"$TRIP_LOCATION\",\"date\":\"2025-12-31\"}")
echo $ADD_TRIP_RESPONSE | jq .

echo "3️⃣ /trip (fetch)"
curl -s http://localhost:4000/trip | jq .

# ----------------------------
# Inter-Service Connectivity Tests
# ----------------------------
echo -e "\n🔹 Testing Inter-Service Connectivity..."

echo "1️⃣ Hello-Service -> Profile-Service"
curl -s http://profile-service:5000/health | jq .

echo "2️⃣ Profile-Service -> MongoDB"
docker exec -it profile-service sh -c "echo 'db.runCommand({ping:1})' | mongo" 

echo "3️⃣ Trip-Service -> Profile-Service (if applicable)"
curl -s http://profile-service:5000/health | jq .

echo "=============================="
echo "✅ Advanced Test Plan Completed!"
echo "=============================="
