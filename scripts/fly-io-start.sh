#!/usr/bin/env bash

# Exit if any command fails
set -o errexit

if [[ ! -f /postgres-volume/postgresql/data/postgresql.conf ]]; then
  echo "❗️ No PostgreSQL database found, run the setup script"
  sleep infinity
fi

echo " Starting PostgreSQL..."
su postgres -c "pg_ctl start --pgdata=/postgres-volume/postgresql/data"

pnpm migrate up
pnpm start
