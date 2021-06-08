const httpRequest = new XMLHttpRequest();
const RANDOM_USER_API = 'https://randomuser.me/api/';

const retrieveData = () => {
    if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200) {
            console.log(JSON.parse(httpRequest.response));
        }
    }
}

httpRequest.onreadystatechange = retrieveData;

const getRandomUser = () => {
    httpRequest.open('GET', RANDOM_USER_API, true);
    httpRequest.send();
};
