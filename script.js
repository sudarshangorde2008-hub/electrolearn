// 1. SEARCH TOPICS
function searchTopics() {
  const input = document.getElementById("searchInput");
  const query = input.value.trim().toLowerCase();
  const cards = document.querySelectorAll("#topicGrid .learn-card");
  let found = 0;

  cards.forEach(card => {
    const match = card.innerText.toLowerCase().includes(query);
    card.style.display = match ? "" : "none";
    if (match) found++;
  });

  document.getElementById("noResults").hidden = found > 0;
}

document.getElementById("searchInput")
  .addEventListener("input", searchTopics);


// 2. OHM'S LAW CALCULATOR
function calculateOhm() {
  const voltage = Number(document.getElementById("voltage").value);
  const resistance = Number(document.getElementById("resistance").value);
  const result = document.getElementById("ohmResult");

  if (document.getElementById("voltage").value === "" ||
      document.getElementById("resistance").value === "" ||
      voltage < 0 || resistance <= 0) {
    result.textContent = "Please enter valid voltage and resistance.";
    return;
  }

  const current = voltage / resistance;
  result.textContent =
    `Current = V / R = ${current.toFixed(3)} A`;
}


// 3. RESISTOR COLOUR CALCULATOR
const colors = [
  {name:"Black", value:0, multiplier:1},
  {name:"Brown", value:1, multiplier:10},
  {name:"Red", value:2, multiplier:100},
  {name:"Orange", value:3, multiplier:1000},
  {name:"Yellow", value:4, multiplier:10000},
  {name:"Green", value:5, multiplier:100000},
  {name:"Blue", value:6, multiplier:1000000},
  {name:"Violet", value:7, multiplier:10000000},
  {name:"Grey", value:8, multiplier:100000000},
  {name:"White", value:9, multiplier:1000000000}
];

function fillOptions(id, useMultiplier = false) {
  const select = document.getElementById(id);

  colors.forEach(color => {
    const option = document.createElement("option");
    option.value = useMultiplier ? color.multiplier : color.value;
    option.textContent = color.name;
    select.appendChild(option);
  });
}

fillOptions("band1");
fillOptions("band2");
fillOptions("multiplier", true);

function calculateResistor() {
  const first = Number(document.getElementById("band1").value);
  const second = Number(document.getElementById("band2").value);
  const multiplier = Number(document.getElementById("multiplier").value);

  const resistance = (first * 10 + second) * multiplier;

  let display = resistance + " Ω";

  if (resistance >= 1000000) {
    display = (resistance / 1000000) + " MΩ";
  } else if (resistance >= 1000) {
    display = (resistance / 1000) + " kΩ";
  }

  document.getElementById("resistorResult").textContent =
    "Resistance = " + display;
}


// 4. DOWNLOAD SAMPLE NOTES
function downloadNotes() {
  const notes = `
ELECTROLEARN - BASIC ELECTRONICS NOTES

1. Voltage:
Voltage is the electrical potential difference.
Unit: Volt (V)

2. Current:
Rate of flow of electric charge.
Unit: Ampere (A)

3. Resistance:
Opposition to the flow of electric current.
Unit: Ohm (Ω)

4. Ohm's Law:
V = I × R

5. Electrical Power:
P = V × I
Unit: Watt (W)

6. Series Circuit:
Same current flows through all components.

7. Parallel Circuit:
Same voltage appears across each branch.

Keep Learning!
ElectroLearn
`;

  const blob = new Blob([notes], {
    type: "text/plain"
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "ElectroLearn-Basic-Notes.txt";
  link.click();

  URL.revokeObjectURL(url);
}
function uploadPDF() {
  const subject = document.getElementById("subject").value;
  const files = document.getElementById("pdfFile").files;
  const list = document.getElementById("pdfList");

  if (files.length === 0) {
    alert("Please select PDF files!");
    return;
  }

  for (const file of files) {
    if (file.type !== "application/pdf") {
      alert("Only PDF files allowed!");
      return;
    }
  }

  Array.from(files).forEach(file => {
    const url = URL.createObjectURL(file);

    const item = document.createElement("div");
    item.className = "notes-card";

    const info = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = subject;

    const name = document.createElement("p");
    name.textContent = file.name;

    const open = document.createElement("a");
    open.href = url;
    open.target = "_blank";
    open.textContent = "View PDF";

    const download = document.createElement("a");
    download.href = url;
    download.download = file.name;
    download.textContent = " | Download";

    info.append(title, name, open, download);
    item.append(info);
    list.appendChild(item);
  });

  alert(files.length + " PDFs uploaded successfully!");
  document.getElementById("pdfFile").value = "";
}