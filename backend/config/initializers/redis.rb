redis_url = ENV.fetch("REDIS_URL", "redis://localhost:6379/0")

if redis_url.start_with?("rediss://")
  $redis = Redis.new(url: redis_url, ssl_params: { verify_mode: OpenSSL::SSL::VERIFY_NONE })
else
  $redis = Redis.new(url: redis_url)
end
