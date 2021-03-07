import { CreateFigure } from './CreateFigure.js';
import { GetData } from './GetData.js';
import { ButtonEvent } from './ButtonEvent.js';
import { Chart } from './Chart.js';

const _svgNS = 'http://www.w3.org/2000/svg'
const _margin = {top: 30, right: 130}//, bottom: , left:}
const _maxWidth = window.innerWidth >= 1160 ? 1160 - _margin.right : window.innerWidth - _margin.right
// Base URL logic: If hosted on Heroku, format differently
const host = window.location.hostname;
const base_url = host.includes("heroku") ? "https://" + host : "http://localhost:5000";

function createInterface() {
    // button
    new ButtonEvent([['sorting-covid19', 'New Cases', 'Test Positive'], ['sorting-weather', '°F', '°C']])
    // init default sorting values
    const mainSVG = document.getElementById('container')
          mainSVG.setAttribute("width", _maxWidth)
          mainSVG.setAttribute("height", window.innerHeight * 0.3)
    const svgGroup = document.createElementNS(_svgNS, 'g')
    const roundedBg = CreateFigure.rect(0, 0, 'svg-bg', 'svg-bg', _maxWidth, window.innerHeight * 0.26, '#333333')
          roundedBg.setAttribute("rx", 24)
          svgGroup.appendChild(roundedBg)
          svgGroup.setAttribute('transform', `translate(${0}, ${_margin.top})`)
          mainSVG.appendChild(svgGroup)
    // getData
    const jsondata = new GetData(["https://covid.ourworldindata.org/data/owid-covid-data.json", base_url + "/weather"])
    // barchart
    new Chart(jsondata)
}

createInterface()


