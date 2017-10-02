remote-save
===============

Simple save javascript object from remote host (e.g. browser) to json on file system
NB! Only for develop uses. Not for production.

```
npm install --save-dev remote-save
```

## Example

```js

// on server-side

const path = require('path')
const express = require('express')
const remoteSave = require('remote-save').server

const app = express()

const folder = path.join(__dirname, 'remote-save-folder')
app.use('/remote-save', remoteSave({ folder, extend: false }))


// on remote-side

import { client } from 'remote-save'

const saver = client({ url: '/remote-save' })

saver('file-name', {
  a: true,
  b: [1, 2, 3],
})

```

As a result json file `file-name.json` will be saved in `remote-save-folder`

```json
{
  "a": true,
  "b": [
    1,
    2,
    3
  ]
}
```

NB! Result file will be deep extended, if `extend: true` options is specified 
