const getPostHeaders = (headers) => {

    if (!headers) {
        headers = {};
    }
    headers['Content-Type'] = 'application/json';

    return { headers: Object.assign(headers) };
};

const checkRequest = (url, options) => {

    const modifiedUrl = url;

    let params = JSON.parse(JSON.stringify(options));
    params.body = JSON.stringify(params.body);
    const headers = getPostHeaders(params && params.headers);
    params = { ...headers, ...params };

    return {
        url: modifiedUrl,
        params: params
    }
};

export default checkRequest;
