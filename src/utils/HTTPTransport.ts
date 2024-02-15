import constants from '../constants';

type Options = {
  method: METHOD;
  data?: unknown;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export class HTTPTransport {
  private apiUrl: string = '';
  constructor(apiPath: string) {
    this.apiUrl = `${constants.HOST}${apiPath}`;
  }

  get<TResponse>(
    url: string,
    options: OptionsWithoutMethod = {},
  ): Promise<TResponse> {
    return this.request<TResponse>(`${this.apiUrl}${url}`, {
      ...options,
      method: METHOD.GET,
    });
  }

  post<TResponse>(
    url: string,
    options: OptionsWithoutMethod = {},
  ): Promise<TResponse> {
    return this.request<TResponse>(`${this.apiUrl}${url}`, {
      ...options,
      method: METHOD.POST,
    });
  }

  delete<TResponse>(
    url: string,
    options: OptionsWithoutMethod = {},
  ): Promise<TResponse> {
    return this.request<TResponse>(`${this.apiUrl}${url}`, {
      ...options,
      method: METHOD.DELETE,
    });
  }

  put<TResponse>(
    url: string,
    options: OptionsWithoutMethod = {},
  ): Promise<TResponse> {
    return this.request<TResponse>(`${this.apiUrl}${url}`, {
      ...options,
      method: METHOD.PUT,
    });
  }

  patch<TResponse>(
    url: string,
    options: OptionsWithoutMethod = {},
  ): Promise<TResponse> {
    return this.request<TResponse>(`${this.apiUrl}${url}`, {
      ...options,
      method: METHOD.PATCH,
    });
  }

  async request<TResponse>(
    url: string,
    options: Options = { method: METHOD.GET },
  ): Promise<TResponse> {
    const { method, data } = options;

    const option: RequestInit = {
      method,
      credentials: 'include',
      mode: 'cors',
    };

    if (!(data instanceof FormData)) {
      option.body = data ? JSON.stringify(data) : null;
      option.headers = { 'Content-Type': 'application/json' };
    } else {
      option.body = data;
    }

    const response = await fetch(url, option);

    const isJson = response.headers
      .get('content-type')
      ?.includes('application/json');
    const resultData = (await isJson) ? response.json() : null;

    return resultData as unknown as TResponse;
  }
}
