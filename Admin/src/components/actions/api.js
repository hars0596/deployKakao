require('dotenv').config({ path: 'Admin/.env' });

const apiPath = process.env.REACT_APP_APIPATH || 'http://localhost:8088';
// || 'http://localhost:8088'  // "proxy": "http://localhost:8088",
const prepareUrl = (url) => {
    return apiPath.trim().substr(-1) === '/' ? apiPath + url : apiPath + '/' + url;
}

module.exports = {
    apiPath,
    prepareUrl,
};
