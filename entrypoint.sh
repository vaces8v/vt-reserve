#!/bin/sh
set -e

echo "⏳ Running Prisma generate..."
bun ./node_modules/prisma/build/index.js generate

echo "⏳ Pushing database schema..."
bun ./node_modules/prisma/build/index.js db push --skip-generate

echo "🌱 Running seed..."
bun run prisma/seed.ts

echo "🚀 Starting application..."
exec bun server.js
