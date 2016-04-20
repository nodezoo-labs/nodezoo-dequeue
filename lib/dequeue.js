'use strict'

module.exports = function (options) {
  var seneca = this

  seneca.add('role:updater,info:update', dequeue)

  return {
    name: 'nodezoo-dequeue'
  }
}

function dequeue (pkg, respond) {
  var seneca = this
  seneca.act({role: 'info', req: 'part', name: pkg.name}, (err) => {
    respond(err, {message: `${pkg.name} package was updated `})
  })
}
