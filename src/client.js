import stringify from 'json-stable-stringify'

const saver = (options = {}) => (file, content) => {
  if (!options.url) {
    return Promise.reject()
  }
  const body = stringify(content, { space: '  ' })
  const funcFetch = options.fetch || window.fetch
  return funcFetch(`${options.url}?file=${file}.json`, {
    method: 'POST',
    body,
  })
}

export default saver
