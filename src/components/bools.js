export function isObject(obj) {
  return !Array.isArray(obj) && typeof obj === 'object';
}

export function isArray(obj) {
  return Array.isArray(obj);
}

export const tooBigSize = 1;

export const increaseFactor = 2;
