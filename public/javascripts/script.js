import { CreateFigure } from './CreateFigure.js';
import { ButtonEvent } from './ButtonEvent.js';
import { GetData } from './GetData.js';
import { Chart } from './Chart.js';

// Base URL logic: If hosted on Heroku, format differently
const host = window.location.hostname;
const base_url = host.includes("heroku") ? "https://" + host : "http://localhost:5000";
let initData;

function onDataLoded(e) {
    new Chart(initData);
    document.body.removeEventListener("DATA_LOADED", onDataLoded)
}

(function fetchData() {
    // init getData
    initData = new GetData(["https://covid.ourworldindata.org/data/owid-covid-data.json", base_url + "/weather"]);
    document.body.addEventListener("DATA_LOADED", onDataLoded)
    // load loading image
    
    // init interface
    initInterface()
    return 
})();

function initInterface() {
    const mainSVG = document.getElementById('container')
          mainSVG.setAttribute("width", CreateFigure._maxWidth)
          mainSVG.setAttribute("height", window.innerHeight * 0.34)
    const svgGroup = CreateFigure.group('svg-main-group', 0, CreateFigure._m.top)
    const roundedBg = CreateFigure.rect(0, 0, 'svg-bg', CreateFigure._maxWidth, CreateFigure._maxHeight, '#333333')
          roundedBg.setAttribute("rx", 24)
          svgGroup.appendChild(roundedBg)
          mainSVG.appendChild(svgGroup)
    // init button
    new ButtonEvent([['sorting-covid19', 'New Cases', 'Test Positive'], ['sorting-weather', '°F', '°C']])
    return;
}



   