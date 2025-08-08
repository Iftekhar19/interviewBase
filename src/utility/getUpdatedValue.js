export function getUpdatedValues(oldObj, newObj) {
  const updated = {};

  for (const key in newObj) {
    if (newObj.hasOwnProperty(key) && newObj[key] !== oldObj[key]) {
      updated[key] = newObj[key];
    }
  }

  return updated;
}
