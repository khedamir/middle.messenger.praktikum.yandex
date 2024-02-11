type Options = {
  method: METHODS;
  headers?: object;
  data?: unknown;
  timeout?: number;
};

type HTTPMethod = (url: string, options?: Options) => Promise<unknown>;

enum METHODS {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

function queryStringify(data: object = {}) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys: string[] = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key as keyof typeof data]}${
      index < keys.length - 1 ? '&' : ''
    }`;
  }, '?');
}

export class HTTPTransportProfi {
  get: HTTPMethod = (url, options) => {
    return this.request(
      url,
      { ...options, method: METHODS.GET },
      options?.timeout,
    );
  };

  post: HTTPMethod = (url, options) => {
    return this.request(
      url,
      { ...options, method: METHODS.POST },
      options?.timeout,
    );
  };

  put: HTTPMethod = (url, options) => {
    return this.request(
      url,
      { ...options, method: METHODS.PUT },
      options?.timeout,
    );
  };

  delete: HTTPMethod = (url, options) => {
    return this.request(
      url,
      { ...options, method: METHODS.DELETE },
      options?.timeout,
    );
  };

  request = (url: string, options: Options, timeout = 5000) => {
    const { headers = {}, method, data } = options;

    return new Promise(function (resolve, reject) {
      if (!method) {
        reject('No method');
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key as keyof typeof headers]);
      });

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        const json = JSON.stringify(data);
        xhr.send(json);
      }
    });
  };
}
