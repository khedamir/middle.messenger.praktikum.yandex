import constants from '../constants';
import queryStringify from './queryStringify';

export type Options = {
  method: METHODS;
  headers?: { [key: string]: string };
  data?: unknown;
  timeout?: number;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;
type HTTPMethod = (
  url: string,
  options?: OptionsWithoutMethod,
) => Promise<XMLHttpRequest>;

export enum METHODS {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

export class HTTPTransport {
  private apiUrl: string = '';
  constructor(apiPath: string) {
    this.apiUrl = `${constants.HOST}${apiPath}`;
  }

  get: HTTPMethod = (url, options) => {
    return this.request(url, {
      ...options,
      method: METHODS.GET,
    });
  };

  post: HTTPMethod = (url, options) => {
    return this.request(url, {
      ...options,
      method: METHODS.POST,
    });
  };

  put: HTTPMethod = (url, options) => {
    return this.request(url, {
      ...options,
      method: METHODS.PUT,
    });
  };

  delete: HTTPMethod = (url, options) => {
    return this.request(url, {
      ...options,
      method: METHODS.DELETE,
    });
  };

  request = (url: string, options: Options): Promise<XMLHttpRequest> => {
    const { headers = {}, method, data, timeout = 5000 } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject('No method');
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(
        method,
        isGet && !!data
          ? `${this.apiUrl}${url}${queryStringify(data)}`
          : `${this.apiUrl}${url}`,
      );

      !headers['Content-Type'] &&
        !(data instanceof FormData) &&
        (headers['content-type'] = 'application/json');

      for (const key in headers) {
        if (Object.prototype.hasOwnProperty.call(headers, key)) {
          xhr.setRequestHeader(key, headers[key]);
        }
      }

      xhr.timeout = timeout;
      xhr.withCredentials = true;

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        const body = data instanceof FormData ? data : JSON.stringify(data);
        xhr.send(body);
      }
    });
  };
}
