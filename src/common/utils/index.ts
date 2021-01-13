export function uuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

//深拷贝
export function deepCopy(obj, cache = []) {
  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
      return obj
  }


  // if obj is hit, it is in circular structure
  // const hit = find(cache, c => c.original === obj)
  // if (hit) {
  //     return hit.copy
  // }


  const copy = Array.isArray(obj) ? [] : {}
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
      original: obj,
      copy
  })


  Object.keys(obj).forEach(key => {
      copy[key] = deepCopy(obj[key], cache)
  })


  return copy
}

export function getBaseUrl() {
  console.log(location.origin)
  console.log(location.pathname)
  return window.location.origin + window.location.pathname + '#/'
}

