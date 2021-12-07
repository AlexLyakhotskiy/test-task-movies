export function errorSerializer(error) {
  return Object.entries(error).reduce((acc, [key, value]) => {
    if (key.includes('data')) {
      const newKey = key.replace('data/', '');
      acc[newKey] = value;
      return acc;
    }
    acc[key] = value;
    return acc;
  }, {});
}
