// Man City wins per season
// [Year, Wins]
const wins = [
  [
    // 'Series'
    [0, 13],
    [1, 11],
    [2, 15],
    [3, 15],
    [4, 18],
    [5, 21],
    [6, 28],
  ],
];
const wins2 = [[[0, 28]], [[1, 28]], [[2, 21]], [[3, 20]], [[4, 19]]];
const teams = [[0, "MCI"], [1, "MUN"], [2, "ARS"], [3, "TOT"], [4, "NEW"]];
const years = [
  [0, "2006"],
  [1, "2007"],
  [2, "2008"],
  [3, "2009"],
  [4, "2010"],
  [5, "2011"],
  [6, "2012"],
];
const co2 = loadData("data/co2.csv")
  .then(convertToJson)
  .then(data => data.data)
  .then(drawCO2growth);

window.onload = co2;

function drawCO2growth(data) {
  const co2 = data.map(row => [row.year, row.co2]);
  const temp = data.map(row => [row.year, row.globaltemp]);
  const config = [
    {
      data: co2,
      lines: {
        show: true,
      },
    },
    {
      data: temp,
      lines: {
        show: true,
      },
      yaxis: 2,
    },
  ];
  Flotr.draw(document.getElementById("chart"), config);
}

function drawTeamComparison() {
  const config = {
    title: "EPL Wins (2011-2012)",
    colors: ["#89AFD2", "#1D1D1D", "#DF021D", "#0E204B", "#E67840"],
    bars: {
      show: true,
      barWidth: 0.2,
      shadowSize: 0,
      fillOpacity: 1,
      lineWidth: 0,
    },
    yaxis: {
      min: 0,
      tickDecimals: 0,
    },
    xaxis: {
      ticks: teams,
    },
    grid: {
      horizontalLines: false,
      verticalLines: false,
    },
  };
  Flotr.draw(document.getElementById("chart"), wins2, config);
}

function drawManCity() {
  const config = {
    title: "Manchester City Wins",
    color: ["#89AFD2"],
    bars: {
      show: true,
      barWidth: 0.5,
    },
    grid: {
      horizontalLines: false,
      verticalLines: false,
    },
    yaxis: {
      min: 0,
      tickDecimals: false,
    },
    xaxis: {
      ticks: years,
    },
  };
  Flotr.draw(document.getElementById("chart"), wins, config);
}

// Kinda ugly but it works
function convertToJson(csv) {
  const json = { data: [] };
  csv = csv.split("\n");
  const headers = csv
    .splice(0, 1)[0]
    .split(",")
    .map(key => key.trim());

  for (line of csv) {
    if (line.length < 1) {
      continue;
    }
    line = line.split(",");
    if (line.length != headers.length) {
      throw "Poorly formatted CSV: " + line;
    }

    json.data.push(
      headers.reduce((entry, key, i) => {
        entry[key] = line[i];
        return entry;
      }, {})
    );
  }
  return json;
}

function loadData(url) {
  return fetch(url).then(response => response.text());
}
