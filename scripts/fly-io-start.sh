#!/usr/bin/env bash

set -o errexit

# Initialize the database if it doesn't exist
if [[ ! -f /postgres-volume/run/postgresql/data/postgresql.conf ]]; then
  echo "⚙️ Initializing PostgreSQL data directory..."
  su postgres -c "initdb -D /postgres-volume/run/postgresql/data"
fi

echo "🚀 Starting PostgreSQL..."
su postgres -c "pg_ctl start --pgdata=/postgres-volume/run/postgresql/data --wait"

echo "📦 Running migrations..."
pnpm migrate up

echo "🌐 Starting Next.js server..."
pnpm start
