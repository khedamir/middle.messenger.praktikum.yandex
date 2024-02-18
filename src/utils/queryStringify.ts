type StringIndexed = Record<string, any>;

export default function queryStringify(data: StringIndexed): string | never {
  if (typeof data !== 'object' || data === null) {
    throw new Error('input must be an object');
  }

  const encodeParam = (key: string, value: any): string => {
    if (Array.isArray(value)) {
      return value
        .map((item, index) => encodeParam(`${key}[${index}]`, item))
        .join('&');
    } else if (typeof value === 'object' && value !== null) {
      return Object.entries(value)
        .map(([subKey, subValue]) => encodeParam(`${key}[${subKey}]`, subValue))
        .join('&');
    } else {
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    }
  };

  return Object.entries(data)
    .map(([key, value]) => encodeParam(key, value))
    .join('&');
}
