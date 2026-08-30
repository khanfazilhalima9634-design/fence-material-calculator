// Input IDs
const ids = ["length", "height", "spacing", "rails", "picket", "gap", "waste", "cost"];

// Add live update
ids.forEach(id => {
  document.getElementById(id).addEventListener("input", calculate);
});

// Copy results
document.getElementById("copyBtn").addEventListener("click", () => {
  const text = `Fence Material Estimate

Posts: ${document.getElementById("posts").textContent}
Rails: ${document.getElementById("railsOut").textContent}
Pickets: ${document.getElementById("pickets").textContent}
Concrete Bags: ${document.getElementById("bags").textContent}
Cost: ${document.getElementById("price").textContent}`;

  navigator.clipboard.writeText(text);
  alert("Results copied!");
});

// Main calculator
function calculate() {
  const fenceLength = Number(document.getElementById("length").value) || 0;
  const fenceHeight = Number(document.getElementById("height").value) || 6;
  const postSpacing = Number(document.getElementById("spacing").value) || 8;
  const railCount = Number(document.getElementById("rails").value) || 3;
  const picketWidth = Number(document.getElementById("picket").value) || 5.5;
  const picketGap = Number(document.getElementById("gap").value) || 0.5;
  const waste = Number(document.getElementById("waste").value) || 10;
  const costPerFoot = Number(document.getElementById("cost").value) || 35;

  // Posts
  const posts = Math.ceil(fenceLength / postSpacing) + 1;

  // Rails
  const rails = (posts - 1) * railCount;

  // Pickets
  const picketSpacingFeet = (picketWidth + picketGap) / 12;
  const pickets = Math.ceil((fenceLength / picketSpacingFeet) * (1 + waste / 100));

  // Concrete Bags (2 bags per post)
  const bags = posts * 2;

  // Cost
  const totalCost = Math.round(fenceLength * costPerFoot);

  // Update UI
  document.getElementById("posts").textContent = posts;
  document.getElementById("railsOut").textContent = rails;
  document.getElementById("pickets").textContent = pickets;
  document.getElementById("bags").textContent = bags;
  document.getElementById("price").textContent = "$" + totalCost.toLocaleString();

  // Update fence drawing
  drawFence(posts, railCount);
}

// Draw fence SVG
function drawFence(posts, railCount) {
  const svg = document.getElementById("diagram");
  svg.innerHTML = "";

  if (posts < 2) return;

  const start = 40;
  const end = 760;
  const step = (end - start) / (posts - 1);

  for (let i = 0; i < posts; i++) {
    const x = start + i * step;

    // Fence post
    svg.innerHTML += `
      <rect x="${x - 4}" y="20" width="8" height="120" fill="#5b3a29"/>
    `;

    // Rails
    if (i < posts - 1) {
      const railHeights =
        railCount === 2 ? [55, 105] :
        railCount === 3 ? [45, 80, 115] :
        [35, 65, 95, 125];

      railHeights.forEach(y => {
        svg.innerHTML += `
          <line x1="${x}" y1="${y}"
                x2="${x + step}" y2="${y}"
                stroke="#8d6e63"
                stroke-width="6"/>
        `;
      });
    }
  }
}

// Run on page load
calculate();
