const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const app = express();

const fetch = require("node-fetch");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

app.use(express.static(path.join(__dirname, 'public')))
   .set('views', path.join(__dirname, 'views'))
   .set('view engine', 'ejs')
   .get('/', (req, res) => res.render('index'))
   .listen(PORT, () => console.log(`Listening on ${ PORT }`))

app.get('/weather', function(request, response) {
  function getData() {
    try {
      let urls = {}
      urls['forcast'] = 'https://www.timeanddate.com/weather/usa/new-york/ext'
      for (let month = new Date().getMonth() + 2; month < new Date().getMonth() + 1 + 13; month++ ) {
        const monthCheck = month > 12 ? month - 12 : month
        const yearCheck = monthCheck <= new Date().getMonth() + 1 ? new Date().getFullYear() : new Date().getFullYear() - 1
        const key = `${yearCheck}-${monthCheck}`
        urls[key] = `https://www.timeanddate.com/weather/usa/new-york/historic?month=${monthCheck}&year=${yearCheck}`
      }
      getFetchURL(response, urls)
    } catch (error) {
      console.log(error);
    }
  };
  getData()
});

function getFetchURL(response, urls) {
  let obj = {}, keys = Object.keys(urls);
  Promise.all(keys.map(key => 
          fetch(urls[key],{mode: 'no-cors'}).then(response => response.text())
  )).then(body => {
          keys.map((key, i) => {
            const result = key == 'forcast' ? trackForecastData(new JSDOM(body[i])) : trackHistoryData(new JSDOM(body[i]), key.split('-')[1], key.split('-')[0]).map(obj => {return {temp: Number((obj.temp/4).toFixed(2)), templow: Number((obj.templow/4).toFixed(2)), wind: Number((obj.wind/4).toFixed(2)), hum: Number((obj.hum/4).toFixed(2)), date:obj.date}});
            obj[key] = result
            if (key == new Date().toISOString().slice(0, 7).replace('-0', '-')) {
              obj[key].push(...obj['forcast'])
            }
          })
          const {forcast, ...newobj} = obj
          return response.json(newobj);
  })
}

function trackHistoryData(dom, month, year) {
  const content = dom.window.document.querySelector('.headline-banner__wrap').childNodes[2].innerHTML
  const replace_once = content.replace('var data=','')
  // console.log(year, '-', month, dom.window.document.querySelector('.mgt0').textContent.split(' Weather')[0])
  const jsonParse = JSON.parse(replace_once.replace(`;window.month=${month};window.year=${year};`,''))
  //[ 'copyright', 'units', 'temp', 'detail', 'grid', 'conv' ] jsonParse['detail']['desc']
  let helper = {};
  const oneYrAgo = new Date(new Date().getFullYear() - 1, new Date().getMonth() + 1, new Date().getDate()).toDateString().slice(4, 10).replace(' 0', ' ');
  const oneYrAgodIdx = jsonParse['detail'].map(obj => { if (obj['hlsh'] && obj['hlsh'] == oneYrAgo) return obj['hlsh'].indexOf(oneYrAgo);}).indexOf(0)
        jsonParse['detail'].splice(0, oneYrAgodIdx)
  const result = jsonParse['detail'].reduce(function(r, o) {
    const key = o.ds.split(', ', 2).toString();
    if(!helper[key] ) {
      const {hl, hlsh, hls, date, ts, icon, desc, baro, wd, ...values} = Object.assign({}, o) // create a copy of o
      helper[key] = values; 
      r.push(helper[key]);
    } else {
      helper[key].date = new Date(o.ds.split(', ', 3).slice(1, 3)).toISOString().slice(0, 10);
      helper[key].wind += o.wind;
      helper[key].hum += o.hum;
      helper[key].temp += o.temp;
      helper[key].templow += o.templow;
      delete helper[key].ds
    }
    return r;
  }, []);
  return result
}

function trackForecastData(dom) {
  const result = []
  const table = dom.window.document.querySelector('#wt-ext').firstElementChild.nextElementSibling.childNodes
  table.forEach(node => {
    const eachObj = {}
    const tempRange = node.firstElementChild.nextElementSibling.nextElementSibling.textContent
    const windEl = node.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.textContent
    const humEl = node.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.textContent
    
    eachObj.temp  = parseInt(tempRange.split(' / ')[0])
    eachObj.templow = parseInt(tempRange.split(' / ')[1].split(' ')[0])
    eachObj.wind = parseInt(windEl)
    eachObj.hum = parseInt(humEl)
    eachObj.date = new Date(node.firstElementChild.textContent.slice(3) + " 2021").toISOString().slice(0, 10)
    result.push(eachObj)
  })
  return result
}