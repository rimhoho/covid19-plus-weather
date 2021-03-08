export class GetData {
    constructor(urls) {
        this.data = {}
        this._fetch(urls)
        console.log('start GetData', new Date().toISOString().slice(11, 19))
    }
    _fetch(urls) {
        Promise.all(urls.map(url => 
            fetch(url).then(response => response.json())
        )).then(([covid19, weather]) => {
            const oneYrAgo = new Date(new Date().getFullYear() - 1, new Date().getMonth() + 1, new Date().getDate()).toISOString().slice(0, 10);
            let oneYrCovid = []
            const {data, ...descriptionObj} = covid19['USA']
            this.data['description'] = descriptionObj
            const oneYrAgodIdx = covid19['USA']['data'].map(item => item['date'].indexOf(oneYrAgo)).indexOf(0)
            for (let i = oneYrAgodIdx; i < covid19['USA']['data'].length; i++) {
                oneYrCovid.push(covid19['USA']['data'][i])
            }
            this.data['covid19'] = oneYrCovid
            this.data['weather'] = weather
            document.body.dispatchEvent(new CustomEvent("DATA_LOADED"));
        }).catch((error) => console.log(error));  
    }
}
