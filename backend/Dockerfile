# ---------- builder ----------
FROM ruby:3.2.2-alpine AS builder

RUN apk add --no-cache \
    build-base \
    postgresql-dev \
    git \
    tzdata

WORKDIR /app

COPY Gemfile Gemfile.lock ./
RUN bundle config set --local without 'development test' && \
    bundle install --jobs 4 --retry 3

COPY . .

# ---------- runtime ----------
FROM ruby:3.2.2-alpine

RUN apk add --no-cache \
    postgresql-client \
    tzdata \
    libpq

WORKDIR /app

COPY --from=builder /usr/local/bundle /usr/local/bundle
COPY --from=builder /app /app

COPY docker-entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/docker-entrypoint.sh

ENV RAILS_ENV=production \
    RAILS_LOG_TO_STDOUT=true \
    RAILS_SERVE_STATIC_FILES=true

EXPOSE 3000

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["bundle", "exec", "puma", "-C", "config/puma.rb"]
