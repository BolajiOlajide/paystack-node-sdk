// const fetch = require('node-fetch');

class HTTPClient {
  private baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    async get(endpoint, headers = {}) {
        return this._request('GET', endpoint, null, headers);
    }

    async post(endpoint, body, headers = {}) {
        return this._request('POST', endpoint, body, headers);
    }

    async patch(endpoint, body, headers = {}) {
        return this._request('PATCH', endpoint, body, headers);
    }

    async put(endpoint, body, headers = {}) {
        return this._request('PUT', endpoint, body, headers);
    }

    async delete(endpoint, headers = {}) {
        return this._request('DELETE', endpoint, null, headers);
    }

    async _request(method, endpoint, body, headers = {}) {
        const url = `${this.baseURL}${endpoint}`;

        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            }
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.statusText}`);
        }

        return response.json();
    }
}

// Usage example:
const client = new HTTPClient('https://api.example.com/');
client.get('/data').then(console.log).catch(console.error);
