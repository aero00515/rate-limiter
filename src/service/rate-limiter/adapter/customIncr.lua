-- Reference from redis incr implement rate limiter pattern 2.
-- This can avoid race condition.
-- https://redis.io/commands/incr#pattern-rate-limiter-2

local current
current = redis.call("incr", ARGV[1])
if tonumber(current) == 1 then
  redis.call("expire", ARGV[1], ARGV[2])
end
return current
