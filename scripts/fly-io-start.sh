#!/usr/bin/env bash

# Exit if any command exits with a non-zero exit code
set -o errexit


if [[ ! -f /postgres-volume/data/postgresql.conf ]]; then
  echo "❗️ No PostgreSQL database found, run the setup script"
  sleep infinity
fi

echo "Setting up PostgreSQL on Fly.io..."


su postgres -c "pg_ctl start --pgdata=/postgres-volume/data"

pnpm migrate up
pnpm start
