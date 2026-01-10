#!/bin/bash
set -e

echo "Starting Postgres..."
docker-compose up -d postgres

echo "Waiting for Postgres to be ready..."
sleep 3

echo "Running migrations..."
DATABASE_URL="postgresql://postgres:${POSTGRES_PASSWORD}@localhost:5432/myapp" npx prisma migrate deploy

echo "Migration successful"