const _svgNS = 'http://www.w3.org/2000/svg'

export class CreateFigure {
      static _m = {top: 30, left: 20, right: 130, barGap: 10, axisLineGap: 6}
      static _maxWidth = window.innerWidth >= 1410 ? 1410 - this._m.right : window.innerWidth - this._m.right;
      static _maxHeight = window.innerHeight * 0.26
      static _c = {aXisLine: '#444444', aXisTxt: '#707070', literBG: '#606060', covid: '#f6753e', weather: '#d0d3d6', forecast: '#81b2c3'}
      
      static svg(classes, width, height) {
        const svg = document.createElementNS(_svgNS, 'svg');
              svg.setAttribute('class', classes);
              svg.setAttribute('width', width);
              svg.setAttribute('height', height);
        return svg
      }
      static group(classes, transformX, transformY) {
        const g = document.createElementNS(_svgNS, 'g')
              g.setAttribute('class', classes)
              g.setAttribute('transform', `translate(${transformX}, ${transformY})`);
        return g
      }
      static image(x, y, classes, href, width, height) {
        const image = document.createElementNS(_svgNS, 'image');
              image.setAttribute('x', x);
              image.setAttribute('y',y);
              image.setAttribute('class', classes);
              image.setAttribute('href', href);
              image.setAttribute('width', width);
              image.setAttribute('height', height);
        return image;
      }
      static circle(cx, cy, classes, r, color, fillOpacity) {
        const circle = document.createElementNS(_svgNS, 'circle');
              circle.setAttribute('cx', cx)
              circle.setAttribute('cy', cy);
              circle.setAttribute('class', classes);
              circle.setAttribute('r', r);
              circle.setAttribute('fill', color);
              circle.setAttribute('fill-opacity', fillOpacity);
        return circle;
      }
      static line(x1, x2, y1, y2, classes, color, strokeWidth, strokeOpacity) {
        const line = document.createElementNS(_svgNS, 'line');
              line.setAttribute('x1', x1);
              line.setAttribute('x2', x2);
              line.setAttribute('y1', y1);
              line.setAttribute('y2', y2);
              line.setAttribute('class', classes);
              line.setAttribute("stroke", color);
              line.setAttribute("stroke-linecap", "round");
              line.setAttribute('stroke-width', strokeWidth);
              line.setAttribute('stroke-opacity', strokeOpacity);
        return line
      }
      static rect(x, y, classes, width, height, color) {
        const rect = document.createElementNS(_svgNS, 'rect');
              rect.setAttribute('x', x);
              rect.setAttribute('y', y);
              rect.setAttribute('class', classes);
              rect.setAttribute('width', width);
              rect.setAttribute('height', height);
              rect.setAttribute('fill', color);
        return rect;
      }
      static text(x, y, classes, textAnchor, dominantBaseline, color, textContent) {
        const text = document.createElementNS(_svgNS, 'text');
              text.setAttribute('x', x);
              text.setAttribute('y', y);
              text.setAttribute('class', classes);
              text.setAttribute('text-anchor', textAnchor);
              text.setAttribute('dominant-baseline', dominantBaseline)
              text.setAttribute('fill', color);
              text.textContent = textContent;
        return text
      }
      static tspan(x, dy, classes, textAnchor, color, textContent) {
        const tspan = document.createElementNS(_svgNS, 'tspan');
              tspan.setAttribute('x', x);
              tspan.setAttribute('dy', dy);
              tspan.setAttribute('class', classes);
              tspan.setAttribute('text-anchor', textAnchor);
              tspan.setAttribute('fill', color);
              tspan.textContent = textContent;
        return tspan;
      }
}