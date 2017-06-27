export const encodeParams = (params) => {
  if (!Array.isArray(params)) return encodeURIComponent(params)
  return params.map(param => encodeURIComponent(param))
}

export const isEmpty = (o) => {
  return !o ||
    ((typeof o === 'object' && Object.keys(o).length === 0) ||
    (Array.isArray(o) && o.length === 0))
}
