class RandomUserComponent extends Vue {
    constructor(httpClient) {
        super({
            el: '#randomUserComponent',
            data: {
                url: 'https://randomuser.me/api/',
                httpClient,
                userList: []
            },
            methods: {
                getRandomUsers: () => {
                    this.httpClient
                        .get(this.url + '?results=5')
                        .subscribe(res => {
                            if (res && res.results) {
                                this.userList = [...res.results];
                            }
                        })
                }
            },
            filters: {
                date: value => {
                    if (value) {
                        return moment(value).format('DD/MM/YYYY');
                    }
                }
            }
        });
    }
}

const httpClient = new HttpClient();
const randomUserComponent = new RandomUserComponent(httpClient);