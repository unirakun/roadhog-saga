export const encodeParams = (params) => {
  let toEncode = params
  if (!Array.isArray(params)) toEncode = [params]

  return toEncode.map(param => encodeURIComponent(param))
}

export const isEmpty = (o) => {
  return !o ||
    ((typeof o === 'object' && Object.keys(o).length === 0) ||
    (Array.isArray(o) && o.length === 0))
}
