import { CreateFigure } from './CreateFigure.js';
let maxNewCase = 0, maxHighTemp = 0, lowHighTemp = 0, countDays = 0, rangeDays = [], rangeHiTemps = [], rangeNewCases = [], rangePositiveRate = [];

export class Chart {
    constructor(_data) {
        this.data = _data
        Object.values(this.data['data']['weather']).forEach(item => {
            countDays += item.length
            item.forEach(obj => { 
                rangeDays.push(obj.date); rangeHiTemps.push(obj.temp);
                maxHighTemp = obj.temp > maxHighTemp ? obj.temp : maxHighTemp
                lowHighTemp = obj.temp < maxHighTemp ? obj.temp : maxHighTemp
            })
        })
        this.data['data']['covid19'].forEach(obj => {
            rangeNewCases.push(obj.new_cases)
            rangePositiveRate.push(obj.positive_rate)
            maxNewCase = obj.new_cases > maxNewCase ? obj.new_cases : maxNewCase
        })
        console.log('start Chart', new Date().toISOString().slice(11, 19))
        this._initChart(document.querySelector('.svg-main-group'))
    }
    _initChart(parent) {
        const interval = 6        
        const xAxisG = this._xAxis(CreateFigure.group('xAxis-group', 0, CreateFigure._maxHeight), interval + 8)
              parent.appendChild(xAxisG)
        const barG = this._barchart(CreateFigure.group('bar-group', 0, CreateFigure._maxHeight), interval)
              parent.appendChild(barG)
        const lineG = this._linechart(CreateFigure.group('line-group', 0, CreateFigure._maxHeight), interval)
              parent.appendChild(lineG)
        // const scaleLinearY_weather = CreateFigure._maxHeight * obj.new_cases / maxHighTemp
        // const yAxisG_covid = this._yAxis_covid(CreateFigure.group('yAxis-covid-group', 0, CreateFigure._maxHeight))
        // const yAxisG_weather = this._yAxis_weather(CreateFigure.group('yAxis-weather-group', CreateFigure._maxWidth, CreateFigure._maxHeight))
        //       parent.appendChild(yAxisG_covid)
        //       parent.appendChild(yAxisG_weather)
              
    }
    _xAxis(svgG, interval) {
      for (var i = countDays - 1; i >= 0; i -= interval) {
        const xPosition = (CreateFigure._maxWidth * i / countDays) - CreateFigure._m.left
        const yPosition = i != countDays - 1 && rangeDays[i] != new Date().toISOString().slice(0, 10) && i != 11 ? [CreateFigure._m.axisLineGap * 3.4, CreateFigure._m.axisLineGap * 5.6] : [CreateFigure._m.axisLineGap * 5.6, CreateFigure._m.axisLineGap * 7.8] 
        const axisDayMthTxt = [new Date(rangeDays[i]).toDateString().slice(4, 7).toUpperCase(), new Date(rangeDays[i]).toDateString().slice(8, 10).toUpperCase()]
        if (i == countDays - 1) {
            svgG.appendChild(CreateFigure.circle(xPosition + 120, CreateFigure._maxHeight * -0.3, 'forcast-circle', CreateFigure._m.barGap * 22, CreateFigure._c.literBG, 1))
            svgG.appendChild(CreateFigure.rect(0, 0, 'forcast-circle-bottom', CreateFigure._maxWidth, CreateFigure._m.right, "#222222"))
        }
        for (let i = 0; i < 2; i++) {
            const xAxistxt = CreateFigure.text(xPosition, yPosition[i],'small-body', 'start', 'auto', CreateFigure._c.aXisTxt, axisDayMthTxt[i])
                  svgG.appendChild(xAxistxt)
        }
        const circlePosition = [CreateFigure._m.axisLineGap * 10.5, CreateFigure._m.axisLineGap * 12.3]
        let textContent;
        if (rangeDays[i] == new Date().toISOString().slice(0, 10)) textContent = ['Now', '']
        else if (i == countDays - 1) textContent = ['2 Wks', 'After']
        else if (i == 11) textContent = ['1 Year', 'Ago']
        if (i == countDays - 1 || rangeDays[i] == new Date().toISOString().slice(0, 10) || i == 11) {
            svgG.appendChild(CreateFigure.circle(xPosition * 1.004, CreateFigure._m.axisLineGap * 2.6, 'xAxis-circle', CreateFigure._m.axisLineGap * 0.46, CreateFigure._c.aXisTxt, 1))
            for (let j = 0; j < 2; j++) {
                svgG.appendChild(CreateFigure.text(xPosition, circlePosition[j], 'small-body', 'start', 'auto', CreateFigure._c.aXisLine, textContent[j]))
            }
        }
      }
      console.log('xAxis created', new Date().toISOString().slice(11, 19))
      return svgG
    }
    _yAxis_covid(svgG) { 
        
        return svgG
    }
    _yAxis_weather(svgG) {
        return svgG
    }
    _barchart(svgG, interval) { 
        for (var i = countDays - 1; i >= 0; i -= interval) {
            const xPosition = (CreateFigure._maxWidth * i / countDays) - CreateFigure._m.left
            const barheight = rangeNewCases[i] != undefined ? CreateFigure._maxHeight * rangeNewCases[i] / maxNewCase : CreateFigure._maxHeight * 0.3
            const barColor = i == countDays - 1 ? CreateFigure._c.forecast : CreateFigure._c.covid
            svgG.appendChild(CreateFigure.circle(xPosition + 5, -barheight, 'bar-circle', CreateFigure._m.barGap * 0.5, barColor, 1))
            svgG.appendChild(CreateFigure.rect(xPosition, -barheight, 'bar-chart covid19', CreateFigure._m.barGap, barheight, barColor))
            if (i == countDays - 1 || rangeDays[i] == new Date().toISOString().slice(0, 10) || i == 11) svgG.appendChild(CreateFigure.circle(xPosition + 5, -barheight * 0.98, 'bar-circle', CreateFigure._m.barGap * 0.3, CreateFigure._c.aXisLine, 1))
        }
        console.log('bar chart created', new Date().toISOString().slice(11, 19))
        return svgG
    }
    _linechart(svgG, interval) {
        for (var i = countDays - 1; i >= 0; i -= interval) {
            const x1 = (CreateFigure._maxWidth * [i - interval] / countDays)
            const x2 = (CreateFigure._maxWidth * i / countDays)
            const y1 = (CreateFigure._maxHeight * rangeHiTemps[i - interval] / maxHighTemp) ? (CreateFigure._maxHeight * rangeHiTemps[i - interval] / maxHighTemp) : (CreateFigure._maxHeight * rangeHiTemps[i] / maxHighTemp)
            const y2 = (CreateFigure._maxHeight * rangeHiTemps[i] / maxHighTemp)
            svgG.appendChild(CreateFigure.line(x1, x2, -y1, -y2, 'line-chart hi-temp', CreateFigure._c.weather, CreateFigure._m.axisLineGap * 0.4, 1))
            // const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            //       pathEl.setAttribute('id', 'navigation');
            //       pathEl.setAttribute('d', `M${_margin.left} ${_canvasHeight * 0.14} L${_margin.left + _canvasWidth * _onGetRatio(120, _canvasWidth, null)} ${_canvasHeight * 0.14} L${_canvasWidth - _margin.left} ${_canvasHeight * 0.14} L${_margin.left} ${_canvasHeight * 0.14} Z`);
            //       pathEl.setAttribute('fill', _color.mapBG);
            //       pathEl.setAttribute('fill-opacity', 1);
            // svgG.appendChild(pathEl)
          }
        console.log('line chart created', new Date().toISOString().slice(11, 19))
        return svgG
    }
}
//https://en.wikipedia.org/wiki/COVID-19_pandemic_in_New_York_(state)#Four-phase_reopening_plan
//['New York lockdown March 22, 2020', 'New York start vaccination February 22, 2021']