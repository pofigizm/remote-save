import stringify from 'json-stable-stringify'

const saver = (options = {}) => (file, content) => {
  if (!options.url) {
    return
  }
  const body = stringify(content, { space: '  ' })

  fetch(`${options.url}?file=${file}.json`, {
    method: 'POST',
    body,
  })
}

export default saver
