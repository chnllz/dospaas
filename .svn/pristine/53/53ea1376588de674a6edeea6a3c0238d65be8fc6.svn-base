import storage from 'store'
const url = process.env.VUE_APP_BASE_URL.replace(/\//, '').substr(0, process.env.VUE_APP_BASE_URL.length - 1).replace(/\//g, '-').toUpperCase()
const set = (key, value, time) => {
  const storageKey = url + key
  return storage.set(storageKey, value, time)
}
const get = (key, option) => {
  const storageKey = url + key
  return storage.get(storageKey, option)
}

const remove = (key) => {
  const storageKey = url + key
  return storage.remove(storageKey)
}

export default {
  set,
  get,
  remove
}
