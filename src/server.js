import fs from 'fs'
import path from 'path'
import querystring from 'querystring'

import parseUrl from 'parseurl'
import stringify from 'json-stable-stringify'

import { deepAssign } from './helpers'

const debug = require('debug')(`remote-save:${__dirname}`)

const errorHandler = (err, res) => {
  debug('res-error', err)
  res.statusCode = 400
  res.end('ERROR: ' + err)
}

const extend = (file, data, cb) => {
  let prev
  try {
    prev = require(file)
  } catch (err) {
    prev = {}
  }
  const next = deepAssign({}, prev, data)
  debug('extend', file)
  // sync for prevent parallel writing
  // TODO rewrite it
  fs.writeFileSync(file, stringify(next, { space: '  ' }))
  cb()
}

const handler = (options = {}) => (req, res) => {
  if (req.method !== 'POST') {
    return errorHandler('only post method is allowed', res)
  }

  if (!options.folder && !options.handler) {
    return errorHandler('folder or handler are not specified', res)
  }

  const parsedUrl = parseUrl(req)
  const filename = querystring.parse(parsedUrl.query).file

  if (!filename) {
    return errorHandler('file name is not specified in query params', res)
  }

  let body = ''

  req.on('data', (data) => {
    body += data
  })

  req.on('end', () => {
    const cb = err => {
      if (err) {
        return errorHandler(err, res)
      }
      debug('cb-ok')
      res.statusCode = 200
      res.end('OK')
    }

    const file = path.join(options.folder, filename)
    if (options.extend) {
      let parsed
      try {
        parsed = JSON.parse(body)
      } catch(err) {
        cb(err.message)
        return
      }

      extend(file, parsed, cb)
      return
    }

    debug('replace', file)
    // sync for prevent parallel writing
    // TODO rewrite it
    fs.writeFileSync(file, body)
    cb()
  })
}

export default handler
