import { JSDOM } from 'jsdom';
import * as d3 from 'd3';
import * as fs from 'fs';
import * as path from 'path';

const ARTICLES_PATH = './src/assets/articles/tutorials';

const COLOR_COMMIT_FILL = '#000000';
const COLOR_COMMIT_STROKE = '#ffffff';
const COLOR_BRANCH_STROKE = '#ff0000';

const COMMIT_RADIUS = 30;
const COMMIT_STROKE = 5;
const BRANCH_HEIGHT = 70;
const BRANCH_LINE_PERCENT_X1 = 20;
const BRANCH_LINE_PERCENT_X2 = 90;
const BRANCH_TEXT_MARGIN = 20;

fs.readdir(ARTICLES_PATH, { withFileTypes: '.md', recursive: true }, (err, data) => {
    if (err) throw err;

    const files = data.filter(entry => entry.isFile()).map(entry => path.join(entry.path, entry.name));
    files.forEach(file => {
        fs.readFile(file, (err, data) => {
            if (err) throw err;

            const graphs = data.toString().split('\n\n').filter(str => str.startsWith('GIT-SVG'));
            graphs.forEach((graph, idx) => {
                graph = graph.replace('GIT-SVG\n', '');
                let graphFile = graph.split('\n')[0];
                let graphJSON = JSON.parse(graph.replace(`${graphFile}\n`, ''));

                const dom = new JSDOM(`<!DOCTYPE html><body></body>`);
                let body = d3.select(dom.window.document.querySelector("body"));
                let svg = body.append('svg')
                    .attr('viewBox', `0 0 1000 ${graphJSON.repositories[0].branches.length * BRANCH_HEIGHT + 40}`)
                    .attr('width', '100%')
                    .attr('height', '100%')
                    .attr('xmlns', 'http://www.w3.org/2000/svg');

                svg.append('style')
                    .html("@import url('https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,200..800;1,200..800&display=swap');");
                buildSvg(svg, graphJSON);

                fs.writeFile(`src/assets/svg/${graphFile}`, body.html(), (err) => {
                    if (err) console.error(err);
                });
            });
        });
    })
});

function buildSvg(svg, graph) {
    
    graph.repositories.forEach(repo => {
        const commitsCoordMap = buildCommitsCoordinatesMap(repo);

        const biggestX = Object.values(commitsCoordMap).map(item => item.x).sort().splice(-1);
        const commitBoxWidth =
            ((BRANCH_LINE_PERCENT_X2 - BRANCH_LINE_PERCENT_X1) * 10 - COMMIT_RADIUS * 2) / biggestX;

        let repoBg = svg.append('rect')
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('rx', 12)
            .attr('fill', '#151515');

        // Branch lines
        repo.branches.forEach((branch, branchIdx) => {
            const CURRENT_BRANCH_Y = (branchIdx+1) * BRANCH_HEIGHT;

            let branchGroup = svg.append('g');
            
            // Branch name
            if (branch.name) {
                let branchText = branchGroup.append('text')
                    .attr('x', BRANCH_LINE_PERCENT_X1 * 10 - BRANCH_TEXT_MARGIN)
                    .attr('y', CURRENT_BRANCH_Y)
                    .attr('font-size', 20)
                    .attr('font-family', 'Karla') // TODO: font doesnt work
                    .attr('text-anchor', 'end')
                    .attr('dominant-baseline', 'middle')
                    .attr('fill', 'white')
                    .html(branch.name);
            }

            // Branch line
            let branchLine = branchGroup.append('line')
                .attr('x1', `${BRANCH_LINE_PERCENT_X1}%`)
                .attr('y1', CURRENT_BRANCH_Y)
                .attr('x2', `${BRANCH_LINE_PERCENT_X2}%`)
                .attr('y2', CURRENT_BRANCH_Y)
                .attr('stroke', COLOR_BRANCH_STROKE)
                .attr('stroke-dasharray', 10);
            let commitGroup = branchGroup.append('g');

            // Commit circles
            branch.commits.forEach((commit, commitIdx) => {
                const coords = commitsCoordMap[commit.hash];
                let commitSvg = commitGroup.append('g');
                let commitCircle = commitSvg.append('circle')
                    .attr('cx', COMMIT_RADIUS + BRANCH_LINE_PERCENT_X1 * 10 + coords.x * commitBoxWidth)
                    .attr('cy', coords.y * BRANCH_HEIGHT)
                    .attr('r', COMMIT_RADIUS)
                    .attr('fill', COLOR_COMMIT_FILL)
                    .attr('stroke', COLOR_COMMIT_STROKE)
                    .attr('stroke-width', COMMIT_STROKE);

                // TODO: commit name, optional hash
            });
        });

        // Commit lines
        const allCommits = repo.branches.flatMap(branch => branch.commits);
        let commitLinesSvg = svg.append('g'); 
        allCommits.forEach(c => {
            if (c.parents) {
                c.parents.forEach(pHash => {
                    commitLinesSvg.append('line')
                        .attr('x1', COMMIT_RADIUS + BRANCH_LINE_PERCENT_X1 * 10 + commitsCoordMap[pHash].x * commitBoxWidth)
                        .attr('y1', commitsCoordMap[pHash].y * BRANCH_HEIGHT)
                        .attr('x2', COMMIT_RADIUS + BRANCH_LINE_PERCENT_X1 * 10 + commitsCoordMap[c.hash].x * commitBoxWidth)
                        .attr('y2', commitsCoordMap[c.hash].y * BRANCH_HEIGHT)
                        .attr('stroke', 'black')
                        .attr('stroke-width', 2);
                });
            }
        });
    });

}

function buildCommitsCoordinatesMap(repo) {
    const commitsTree = buildCommitsTree(repo.branches);
    
    let result = {};
    const dfsStack = [ commitsTree ];
    while (dfsStack.length !== 0) {
        let node = dfsStack.pop();

        if (!result.hasOwnProperty(node.commit.hash)) {
            let branchIdx = repo.branches.findIndex(b => b.commits.filter(c => c.hash === node.commit.hash).length != 0);
            result[node.commit.hash] = {
                x: node.level,
                y: branchIdx + 1
            };
        }
        else {
            result[node.commit.hash].x = Math.max(node.level, result[node.commit.hash].x);
        }

        node.children.forEach(c => {
            dfsStack.push(c);
        });
    }

    return result;
}

function buildCommitsTree(branches) {
    let allCommits = branches.flatMap(branch => branch.commits);
    const firstCommit = allCommits.find(c => c.parents == undefined);
    allCommits = allCommits.filter(c => c.hash != firstCommit.hash);
    
    return buildSubTree(allCommits, firstCommit, 0);
}

function buildSubTree(allCommits, commit, level) {
    let node = {
        "commit": commit,
        "level": level,
        "children": []
    };

    let childrenCommits = allCommits.filter(c => c.parents && c.parents.includes(commit.hash));
    // Use normal loop instead of childrenCommits.forEach to reduce the amount of methods called in the stack
    for (let i = 0; i < childrenCommits.length; i++) {
        node.children.push(buildSubTree(allCommits, childrenCommits[i], level+1));
    }

    return node;
}