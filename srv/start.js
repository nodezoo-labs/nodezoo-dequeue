'use strict'

var Seneca = require('seneca')
var Entities = require('seneca-entity')
var RedisQ = require('seneca-redis-queue-transport')
var Mesh = require('seneca-mesh')
var Dequeue = require('../lib/dequeue')

var envs = process.env

var opts = {
  redisQ: {
    'redis-queue': {
      timeout: 22222,
      type: 'redis-queue',
      host: envs.DEQUEUE_REDIS_HOST || 'localhost',
      port: envs.DEQUEUE_REDIS_PORT || '6379'
    }
  },
  mesh: {
    auto: true,
    host: envs.DEQUEUE_HOST || '127.0.0.1',
    bases: [envs.BASE_HOST || '127.0.0.1:39999']
  }
}

var Service = Seneca()

Service
  .use(Mesh, opts.mesh)
  .use(Entities)
  .use(RedisQ, opts.redisQ)
  .use(Dequeue)

Service.ready((err) => {
  if (err) Service.log.error(err)
  Service.listen({pin: 'role:updater,info:update', type: 'redis-queue'})
})
