export default (action) => {
  if (!/.*_.*/.test(action)) {
    throw new Error(`Wrong format for action: '${action}'. should be '<METHOD_NAME>_<RESOURCE_NAME>' (ie: GET_USERS)`)
  }
}

