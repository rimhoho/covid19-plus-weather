const _svgNS = 'http://www.w3.org/2000/svg'

export class CreateFigure {
    static image(x, y, id, classes, href, width, height) {
        const image = document.createElementNS(_svgNS, 'image');
              image.setAttribute('x', x);
              image.setAttribute('y',y);
              if (id != null) image.setAttribute('id', id);
              if (classes != null) image.setAttribute('class', classes);
              image.setAttribute('href', href);
              if (width != null) image.setAttribute('width', width);
              if (height != null) image.setAttribute('height', height);
        return image;
      }
      static circle(cx, cy, id, classes, r, color, fillOpacity, stroke, strokeWidth, strokeOpacity) {
        const circle = document.createElementNS(_svgNS, 'circle');
              circle.setAttribute('cx', cx)
              circle.setAttribute('cy', cy);
              if (id != null) circle.setAttribute('id', id);
              if (classes != null) circle.setAttribute('class', classes);
              circle.setAttribute('r', r);
              circle.setAttribute('fill', color);
              circle.setAttribute('fill-opacity', fillOpacity);
              if (stroke != null) circle.setAttribute('stroke', stroke);
              if (strokeWidth != null) circle.setAttribute('stroke-width', strokeWidth);
              if (strokeOpacity != null) circle.setAttribute('stroke-opacity', strokeOpacity);
        return circle;
      }
      static line(x1, x2, y1, y2, id, classes, stroke, strokeWidth, strokeOpacity) {
        const line = document.createElementNS(_svgNS, 'line');
              line.setAttribute('x1', x1);
              line.setAttribute('x2', x2);
              line.setAttribute('y1', y1);
              line.setAttribute('y2', y2);
              if (id != null) line.setAttribute('id', id);
              if (classes != null) line.setAttribute('class', classes);
              line.setAttribute("stroke",stroke);
              line.setAttribute('stroke-width', strokeWidth);
              line.setAttribute('stroke-opacity', strokeOpacity);
        return line
      }
      static rect(x, y, id, classes, width, height, color) {
        const rect = document.createElementNS(_svgNS, 'rect');
              rect.setAttribute('x', x);
              rect.setAttribute('y', y);
              if (id != null) rect.setAttribute('id', id);
              if (classes != null) rect.setAttribute('class', classes);
              rect.setAttribute('width', width);
              rect.setAttribute('height', height);
              rect.setAttribute('fill', color);
        return rect;
      }
      static text(x, y, id, classes, textAnchor, dominantBaseline, color, textContent) {
        const text = document.createElementNS(_svgNS, 'text');
              text.setAttribute('x', x);
              text.setAttribute('y', y);
              if (id != null) text.setAttribute('id', id);
              if (classes != null) text.setAttribute('class', classes);
              if (textAnchor != null) text.setAttribute('text-anchor', textAnchor);
              if (dominantBaseline != null) text.setAttribute('dominant-baseline', dominantBaseline)
              if (color != null) text.setAttribute('fill', color);
              if (textContent != null) text.textContent = textContent;
        return text
      }
      static tspan(x, dy, id, classes, textAnchor, color, textContent) {
        const tspan = document.createElementNS(_svgNS, 'tspan');
              tspan.setAttribute('x', x);
              tspan.setAttribute('dy', dy);
              if (id != null) tspan.setAttribute('id', id);
              if (classes != null) tspan.setAttribute('class', classes);
              if (textAnchor != null) tspan.setAttribute('text-anchor', textAnchor);
              tspan.setAttribute('fill', color);
              tspan.textContent = textContent;
        return tspan;
      }
}