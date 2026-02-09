workers ENV.fetch("WEB_CONCURRENCY", 2)

max_threads = ENV.fetch("RAILS_MAX_THREADS", 5)
threads max_threads, max_threads

preload_app!

port ENV.fetch("RAILS_PORT", 3000)
environment ENV.fetch("RAILS_ENV", "production")

on_worker_boot do
  ActiveRecord::Base.establish_connection
end
