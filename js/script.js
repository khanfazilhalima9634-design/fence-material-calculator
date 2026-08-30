document.addEventListener("DOMContentLoaded", () => {

  const ids = ["length","height","spacing","rails","picket","gap","waste","cost"];

  ids.forEach(id => {
    document.getElementById(id).addEventListener("input", calculate);
    document.getElementById(id).addEventListener("change", calculate);
  });

  document.getElementById("copyBtn").addEventListener("click", copyResults);

  calculate();

});

function calculate() {

  const fenceLength = parseFloat(document.getElementById("length").value) || 0;
  const postSpacing = parseFloat(document.getElementById("spacing").value) || 8;
  const railCount = parseInt(document.getElementById("rails").value) || 3;
  const picketWidth = parseFloat(document.getElementById("picket").value) || 5.5;
  const picketGap = parseFloat(document.getElementById("gap").value) || 0.5;
  const waste = parseFloat(document.getElementById("waste").value) || 10;
  const costPerFoot = parseFloat(document.getElementById("cost").value) || 35;

  const posts = Math.ceil(fenceLength / postSpacing) + 1;
  const rails = (posts - 1) * railCount;
  const picketSpacing = (picketWidth + picketGap) / 12;
  const pickets = Math.ceil((fenceLength / picketSpacing) * (1 + waste / 100));
  const bags = posts * 2;
  const totalCost = Math.round(fenceLength * costPerFoot);

  document.getElementById("posts").textContent = posts;
  document.getElementById("railsOut").textContent = rails;
  document.getElementById("pickets").textContent = pickets;
  document.getElementById("bags").textContent = bags;
  document.getElementById("price").textContent = "$" + totalCost.toLocaleString();

  drawFence(posts, railCount);
}

function drawFence(posts, railCount) {

  const svg = document.getElementById("diagram");
  svg.innerHTML = "";

  if (posts < 2) return;

  const start = 40;
  const end = 760;
  const step = (end - start) / (posts - 1);

  for (let i = 0; i < posts; i++) {

    const x = start + i * step;

    svg.innerHTML += `
      <rect x="${x-4}" y="20" width="8" height="120" fill="#5b3a29"/>
    `;

    if (i < posts - 1) {

      let heights = [];

      if (railCount === 2) heights = [55,105];
      else if (railCount === 3) heights = [45,80,115];
      else heights = [35,65,95,125];

      heights.forEach(y => {
        svg.innerHTML += `
          <line x1="${x}" y1="${y}" x2="${x+step}" y2="${y}"
          stroke="#8d6e63" stroke-width="6"/>
        `;
      });

    }
  }
}

function copyResults(){

  const text = `
Fence Material Estimate

Posts: ${document.getElementById("posts").textContent}
Rails: ${document.getElementById("railsOut").textContent}
Pickets: ${document.getElementById("pickets").textContent}
Concrete Bags: ${document.getElementById("bags").textContent}
Cost: ${document.getElementById("price").textContent}
`;

  navigator.clipboard.writeText(text);
  alert("Results copied!");
}
