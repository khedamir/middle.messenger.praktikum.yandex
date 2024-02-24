import sinon from 'sinon';
import { HTTPTransport, METHODS } from './HTTPTransport';
import { expect } from 'chai';

describe('HttpTransport', () => {
  afterEach(() => {
    sinon.restore();
  });
  it('calls the request with the correct data', async () => {
    const http = new HTTPTransport('/api');
    const requestStub = sinon.stub(http, 'request').resolves();
    const data = { userId: 1, limit: 25 };

    await http.get('/messages', { data });

    const expectedUrl = '/messages';

    expect(
      requestStub.calledWithMatch(expectedUrl, { method: METHODS.GET, data }),
    ).to.be.true;
  });
  it('handles a successful GET request', async () => {
    const http = new HTTPTransport('/api');
    const responseData: XMLHttpRequest = {
      response: 'response',
    } as XMLHttpRequest;
    sinon.stub(http, 'request').resolves(responseData);

    const result = await http.get('/data');

    expect(result).to.deep.equal(responseData);
  });
  it('sends correct headers for JSON data in a POST request', async () => {
    const http = new HTTPTransport('/api');
    const requestStub = sinon.stub(http, 'request').resolves();

    await http.post('/submit', {
      data: { value: 'some data' },
      headers: { 'Content-Type': 'application/json' },
    });

    expect(
      requestStub.calledWithMatch('/submit', {
        method: METHODS.POST,
        headers: { 'Content-Type': 'application/json' },
      }),
    ).to.be.true;
  });
});
