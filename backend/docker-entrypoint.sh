#!/bin/sh
set -e

echo "Waiting for PostgreSQL..."
until pg_isready -h "$DB_HOST" -p "${DB_PORT:-5432}" -U "$DB_USERNAME" -q; do
  sleep 1
done
echo "PostgreSQL is ready."

# Run migrations; if db doesn't exist yet, create and seed it
if bundle exec rake db:migrate 2>/dev/null; then
  echo "Migrations completed."
else
  echo "Database does not exist. Running db:setup..."
  bundle exec rake db:setup
  echo "Database setup completed."
fi

exec "$@"
