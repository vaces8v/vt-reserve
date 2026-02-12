#!/bin/sh
set -e

echo "⏳ Running Prisma generate..."
bunx prisma generate

echo "⏳ Pushing database schema..."
bunx prisma db push --skip-generate

echo "🌱 Running seed..."
bun run prisma/seed.ts

echo "🚀 Starting application..."
exec bun server.js
