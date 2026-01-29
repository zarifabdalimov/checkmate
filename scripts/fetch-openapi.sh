#!/bin/bash

# Script to fetch OpenAPI specification from the API
# Usage: ./fetch-openapi.sh
# AI generated :P

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Load environment variables from .env file
if [ ! -f .env ]; then
  echo -e "${RED}Error: .env file not found${NC}"
  echo "Please create a .env file with NEXT_PUBLIC_DEMO_API_BASE_URL and EXPO_PUBLIC_API_KEY"
  exit 1
fi

# Source the .env file
export $(grep -v '^#' .env | xargs)

# Check if required variables are set
if [ -z "$NEXT_PUBLIC_DEMO_API_BASE_URL" ]; then
  echo -e "${RED}Error: NEXT_PUBLIC_DEMO_API_BASE_URL is not set in .env${NC}"
  exit 1
fi

if [ -z "$NEXT_PUBLIC_DEMO_API_KEY" ]; then
  echo -e "${YELLOW}Warning: EXPO_PUBLIC_API_KEY is not set in .env${NC}"
  echo "The API request may fail if authentication is required"
fi

# Remove trailing slash from base URL if present
BASE_URL="${NEXT_PUBLIC_DEMO_API_BASE_URL%/}"

# Construct the full URL
OPENAPI_URL="${BASE_URL}/dev/openapi"

echo -e "${GREEN}Fetching OpenAPI spec from: ${OPENAPI_URL}${NC}"

# Output file
OUTPUT_FILE="openapi-test-showcase.yaml"

# Make the request
if [ -n "$NEXT_PUBLIC_DEMO_API_KEY" ]; then
  # With API key
  curl -f -H "X-Api-Key: $NEXT_PUBLIC_DEMO_API_KEY" \
    -o "$OUTPUT_FILE" \
    "$OPENAPI_URL"
else
  # Without API key (will likely fail if auth is required)
  curl -f -o "$OUTPUT_FILE" "$OPENAPI_URL"
fi

# Check if the request was successful
if [ $? -eq 0 ]; then
  echo -e "${GREEN}✓ OpenAPI spec successfully saved to ${OUTPUT_FILE}${NC}"
  echo -e "${GREEN}File size: $(wc -c < "$OUTPUT_FILE" | tr -d ' ') bytes${NC}"
else
  echo -e "${RED}✗ Failed to fetch OpenAPI spec${NC}"
  exit 1
fi

