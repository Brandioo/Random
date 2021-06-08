const RANDOM_USER_API = 'https://randomuser.me/api/';

class CustomHttp extends XMLHttpRequest {
    constructor() {
        super();

        this.successFns = [];
        this.errorFns = [];

        this.onreadystatechange = () => {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    this.successFns.forEach(fn => fn(JSON.parse(this.response)));
                }

                if (this.status > 208) {
                    this.errorFns
                        .forEach(fn => fn({
                            status: this.status,
                            message: this.response.message
                        }));
                }
            }
        }
    }

    get(url) {
        this.open('GET', url, true);
        return this;
    }

    post(url) {
        this.open('POST', url, true);
        return this;
    }

    subscribe(successFn = null, errorFn = null) {
        if (
            successFn &&
            typeof successFn === 'function'
        ) {
            this.successFns.push(successFn);
        }

        if (
            errorFn &&
            typeof errorFn === 'function'
        ) {
            this.errorFns.push(errorFn);
        }

        this.send();
    }
}

const customHttp = new CustomHttp();

const getRandomUser = () => {
    customHttp
        .post(RANDOM_USER_API)
        .subscribe(console.log, () => alert('Error occurred'));
};