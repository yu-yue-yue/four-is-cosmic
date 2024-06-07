const width = 960;
const height = 600;

// Create the SVG container
const svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height);

// Define arrow markers for graph links
svg.append("defs").append("marker")
    .attr("id", "end-arrow")
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 15)
    .attr("refY", 0)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M0,-5L10,0L0,5")
    .attr("fill", "#555");

// Example adjacency list
adjacencyList = {
    
};


function generateTree(num) {
    for (let i = 0; i <= num; i++) {
        adjacencyList[i + ""] = [convertToEnglishWords(i).length + ""];
    }
}

generateTree(30);

// Convert adjacency list to edge list
const nodes = Object.keys(adjacencyList);
const links = [];

nodes.forEach(source => {
    adjacencyList[source].forEach(target => {
        links.push({source, target});
    });
});

// Set up the simulation
const simulation = d3.forceSimulation(nodes.map(id => ({id})))
    .force("link", d3.forceLink(links).id(d => d.id).distance(100))
    .force("charge", d3.forceManyBody().strength(-40))
    .force("center", d3.forceCenter(width / 2, height / 2));

// Draw links (edges)
const link = svg.selectAll(".link")
    .data(links)
    .enter().append("line")
    .attr("class", "link")
    .attr("marker-end", "url(#end-arrow)");

// Draw nodes
const node = svg.selectAll(".node")
    .data(simulation.nodes())
    .enter().append("g")
    .attr("class", "node")
    .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

// Append circles to the nodes

if (node.id == "4") {
    node.append("four-circle")
        .attr("r", 10);
} else {
    node.append("circle")
        .attr("r", 10);
}


// Append text labels to the nodes
node.append("text")
    .attr("x", 12)
    .attr("dy", ".35em")
    .text(d => d.id);

// Update the simulation
simulation.on("tick", () => {
    link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    node
        .attr("transform", d => `translate(${d.x},${d.y})`);
});

// Drag functions
function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
}

function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}