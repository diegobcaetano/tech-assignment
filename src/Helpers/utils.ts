//for simplicity sake this function just check the first position of the array to assert that is an array of objects
export function isArrayOfObjects(property: any): boolean {
  return Array.isArray(property) && property[0] instanceof Object;
}

export function getPropertyValueByPath(path, obj) {
  return path.split('.').reduce(function (prev, curr) {
    return prev ? prev[curr] : null
  }, obj)
}
