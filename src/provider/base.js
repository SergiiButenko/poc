class _ProviderBase {

    config = {};

    constructor(config = {}) {
        this.config = config;
    }

    async doRequest(url, options) {
        url = this.prepareURL(url, options);

        const fetchRequest = async (url, options) => {
            return new Promise((resolve, reject) => {
                fetch(url.href, options)
                    .then(async (response) => {
                        try {
                            let resp = await response.json();

                            if (response.status >= 200 && response.status < 300) {
                                resolve(resp);
                            } else {
                                reject(resp);
                            }
                        } catch (error) {
                            console.log("Error");
                            console.log(error);
                            reject(error);
                        }
                    })
                    .catch(reject);
            });
        };

        return fetchRequest(url, options);
    }

    prepareURL(url, { query = {}}) {
        const { base_url } = this.config;

        url = new URL(url, base_url);

        Object.keys(query).forEach(key => url.searchParams.append(key, query[key]));
        return url;
    }

    async get(url, options = {}) {
        options.method = 'GET';
        options.cache = 'no-cache';
        return this.doRequest(url, options);
    }

    async post(url, body = {}, options = {}) {
        options = {
            ...options,
            body,
            //mode: 'no-cors',
            method: 'POST',
            headers: {
                ...options.headers,
            }
        };
        return this.doRequest(url, options);
    }

    async put(url, body = {}, options = {}) {
        options = {
            ...options,
            body,
            method: 'PUT',
            headers: {
                ...options.headers,
            }
        };

        return this.doRequest(url, options);
    }
}
export default new _ProviderBase();