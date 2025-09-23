// Utility function to strip out keys with `undefined` values from an object.
export function clean<T extends Record<string, any>>(obj: T): Partial<T> {
  const result: Partial<T> = {};

  for (const key in obj) {
    const value = obj[key];

    // Only include keys that are not undefined
    if (value !== undefined) {
      result[key] = value;
    }
  }

  return result;
}
