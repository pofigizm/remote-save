import path from 'path'
import fs from 'fs'
import express from 'express'
import fetch from 'node-fetch'
import rimraf from 'rimraf'

import { server, client } from './'

// server
const app = express()
const port = 8080
const folder = path.join(__dirname, 'tmp')
if (!fs.existsSync(folder)) {
  fs.mkdirSync(folder)
}
app.use('/remote-url', server({ folder, extend: true }))
const srv = app.listen(port)

// client
const saver = client({ fetch, url: 'http://127.0.0.1:8080/remote-url' })

afterAll(() => {
  srv.close()
  rimraf.sync(folder)
})

test('base', async(done) => {
  const file = path.join(__dirname, 'tmp', 'file-name.json')
  const dataOne = {
    a: true,
    b: [1, 2, 3],
  }
  await saver('file-name', dataOne)
  const resultOne = JSON.parse(fs.readFileSync(file))
  expect(resultOne).toEqual(dataOne)
  done()
})

test('extend', async(done) => {
  const file = path.join(__dirname, 'tmp', 'file-name.json')
  const dataOne = {
    a: true,
    b: [1, 2, 3],
  }
  const dataTwo = {
    a: false,
    c: [1, 2, 3],
  }
  await saver('file-name', dataTwo)
  const resultTwo = JSON.parse(fs.readFileSync(file))
  expect(resultTwo).toEqual({ ...dataOne, ...dataTwo })
  done()
})
