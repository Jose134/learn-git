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
            graphs.forEach((graph, idx) => {
                graph = graph.replace('GIT-SVG\n', '');
                let graphFile = graph.split('\n')[0];
                let graphJSON = JSON.parse(graph.replace(`${graphFile}\n`, ''));
                
                const dom = new JSDOM(`<!DOCTYPE html><body></body>`);
                let body = d3.select(dom.window.document.querySelector("body"));
                let svg = body.append('svg').attr('xmlns', 'http://www.w3.org/2000/svg');
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
        console.log(commitsCoordMap);

        const biggestX = Object.values(commitsCoordMap).map(item => item.x).sort().splice(-1);
        let repoBg = svg.append('rect')
        .attr('width', biggestX*22+50)
        .attr('height', 100)
        .attr('rx', 12)
        .attr('fill', '#ffffff');

        // Branch lines
        repo.branches.forEach((branch, branchIdx) => {
            let branchGroup = svg.append('g');
            // TODO: branch name text
            let branchLine = branchGroup.append('line')
                .attr('x1', 10)
                .attr('y1', (branchIdx+1)*20)
                .attr('x2', biggestX*22+40)
                .attr('y2', (branchIdx+1)*20)
                .attr('stroke', 'red')
                .attr('stroke-dasharray', 4);
            let commitGroup = branchGroup.append('g');

            // Commit circles
            branch.commits.forEach((commit, commitIdx) => {
                const coords = commitsCoordMap[commit.hash];
                let commitSvg = commitGroup.append('g');
                let commitCircle = commitSvg.append('circle')
                    .attr('cx', 20 + coords.x*22)
                    .attr('cy', coords.y*20)
                    .attr('r', 8)
                    .attr('fill', '#000000');
            });
        });

        // Commit lines
        const allCommits = repo.branches.flatMap(branch => branch.commits);
        let commitLinesSvg = svg.append('g'); 
        allCommits.forEach(c => {
            if (c.parents) {
                c.parents.forEach(pHash => {
                    commitLinesSvg.append('line')
                        .attr('x1', 20 + commitsCoordMap[pHash].x * 22)
                        .attr('y1', commitsCoordMap[pHash].y*20)
                        .attr('x2', 20 + commitsCoordMap[c.hash].x * 22)
                        .attr('y2', commitsCoordMap[c.hash].y*20)
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