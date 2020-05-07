
const checkResponse = (response) => {
    if (response.status >= 200 && response.status < 305) {
        return response;
    } else if (response.status === 410 || response.status === 401) {
        console.log('session expired')
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
};

export default checkResponse;