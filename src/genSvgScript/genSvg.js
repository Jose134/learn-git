import { JSDOM } from 'jsdom';
import * as d3 from 'd3';
import * as fs from 'fs';
import * as path from 'path';

const ARTICLES_PATH = './src/assets/articles/tutorials';

fs.readdir(ARTICLES_PATH, { withFileTypes: '.md', recursive: true }, (err, data) => {
    if (err) throw err;

    const files = data.filter(entry => entry.isFile()).map(entry => path.join(entry.path, entry.name));
    files.forEach(file => {
        fs.readFile(file, (err, data) => {
            if (err) throw err;

            const graphs = data.toString().split('\n\n').filter(str => str.startsWith('GIT-SVG'));
            graphs.forEach(graph => {
                graph = graph.replace('GIT-SVG\n', '');
                let graphFile = graph.split('\n')[0];
                let graphJSON = JSON.parse(graph.replace(`${graphFile}\n`, ''));
                
                // TODO generate svg file
            });
        });
    })
});

/* REFERENCE TO GENERATE SVG FILE https://medium.com/@92sharmasaurabh/generate-svg-files-using-nodejs-d3-647d5b4f56eb
const dom = new JSDOM(`<!DOCTYPE html><body></body>`);

let body = d3.select(dom.window.document.querySelector("body"))
let svg = body.append('svg').attr('width', 100).attr('height', 100).attr('xmlns', 'http://www.w3.org/2000/svg');
svg.append("rect")
    .attr("x", 10)
    .attr("y", 10)
    .attr("width", 80)
    .attr("height", 80)
    .style("fill", "orange");

fs.writeFileSync('out.svg', body.html());
*/