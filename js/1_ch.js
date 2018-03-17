/******************************************************************************
 * 2012 Heat starting 5, radar chart
 */
function drawHeatStartingFive() {
  const players = [
    {
      player: "Chris Bosh",
      points: 17.2,
      rebounds: 7.9,
      assists: 1.6,
      steals: 0.8,
      blocks: 0.8,
    },
    {
      player: "Shane Battier",
      points: 5.4,
      rebounds: 2.6,
      assists: 1.2,
      steals: 1.0,
      blocks: 0.5,
    },
    {
      player: "LeBron James",
      points: 28.0,
      rebounds: 8.4,
      assists: 6.1,
      steals: 1.9,
      blocks: 0.8,
    },
    {
      player: "Dwyane Wade",
      points: 22.3,
      rebounds: 5.0,
      assists: 4.5,
      steals: 1.7,
      blocks: 1.3,
    },
    {
      player: "Mario Chalmers",
      points: 10.2,
      rebounds: 2.9,
      assists: 3.6,
      steals: 1.4,
      blocks: 0.2,
    },
  ];
  const team = {
    points: 98.2,
    rebounds: 41.3,
    assists: 19.3,
    steals: 8.5,
    blocks: 5.3,
  };
  var get_player = function(name) {
    for (var i = 0; i < players.length; i++) {
      if (players[i].player === name) return players[i];
    }
  };
  var player_data = function(name) {
    var obj = {},
      i = 0;
    obj.label = name;
    obj.data = [];
    for (var key in team) {
      obj.data.push([i, 100 * get_player(name)[key] / team[key]]);
      i++;
    }
    return obj;
  };
  var labels = [
    [0, "Points"],
    [1, "Rebounds"],
    [2, "Assists"],
    [3, "Steals"],
    [4, "Blocks"],
  ];

  const series = [
    player_data("Chris Bosh"),
    player_data("Shane Battier"),
    player_data("LeBron James"),
    player_data("Dwyane Wade"),
    player_data("Mario Chalmers"),
  ];
  const config = {
    title: "2011/2012 Miami Heat Starting Lineup  - Contribution to Team Total",
    radar: { show: true },
    grid: { circular: true },
    xaxis: { ticks: labels },
    yaxis: { showLabels: false, min: 0, max: 33 },
  };
  Flotr.draw(document.getElementById("chart"), series, config);
}
window.onload = drawHeatStartingFive;

/******************************************************************************
 * Path of Hurricane Katrina
 */
function drawKatrinaPath() {
  const katrina = [
    { north: 23.2, west: 75.5, wind: 35 },
    { north: 24.0, west: 76.4, wind: 35 },
    { north: 25.2, west: 77.0, wind: 45 },
    { north: 26.0, west: 77.6, wind: 45 },
    { north: 26.2, west: 78.7, wind: 50 },
    { north: 26.1, west: 79.9, wind: 75 },
    { north: 25.5, west: 80.7, wind: 75 },
    { north: 25.1, west: 82.2, wind: 100 },
    { north: 24.8, west: 82.9, wind: 100 },
    { north: 24.4, west: 84.0, wind: 110 },
    { north: 24.4, west: 84.6, wind: 115 },
    { north: 25.1, west: 86.8, wind: 145 },
    { north: 25.7, west: 87.7, wind: 160 },
    { north: 26.5, west: 88.6, wind: 175 },
    { north: 27.9, west: 89.5, wind: 160 },
    { north: 29.7, west: 89.6, wind: 135 },
    { north: 30.8, west: 89.6, wind: 105 },
    { north: 31.9, west: 89.6, wind: 75 },
    { north: 32.9, west: 88.9, wind: 65 },
    { north: 34.7, west: 88.4, wind: 50 },
  ];
  const categories = [
    {
      label: "",
      min: 0,
      max: 39,
      color: "#74add1",
    },
    {
      label: "",
      min: 40,
      max: 74,
      color: "#abd9e9",
    },
    {
      label: "Category 1",
      min: 74,
      max: 95,
      color: "#ffffbf",
    },
    {
      label: "Category 2",
      min: 95,
      max: 110,
      color: "#fee090",
    },
    {
      label: "Category 3",
      min: 110,
      max: 130,
      color: "#fdae61",
    },
    {
      label: "Category 4",
      min: 130,
      max: 157,
      color: "#f46d43",
    },
    {
      label: "Category 5",
      min: 157,
      max: Infinity,
      color: "#d73027",
    },
  ];
  const series = categories.map(category => {
    return {
      label: category.label,
      color: category.color,
      data: katrina
        .filter(row => row.wind >= category.min && row.wind < category.max)
        .map(row => [-1 * row.west, row.north, row.wind]),
      bubbles: { show: true, baseRadius: 0.3, lineWidth: 1 },
    };
  });
  const config = {
    grid: {
      horizontalLines: false,
      verticalLines: false,
      backgroundImage: "img/gulf.png",
    },
    yaxis: { showLabels: false, min: 23.607, max: 33.657 },
    xaxis: { showLabels: false, min: -94.298, max: -77.586 },
    legend: { position: "sw", backgroundOpacity: 0 },
  };

  Flotr.draw(document.getElementById("chart"), series, config);
}
// window.onload = drawKatrinaPath;

/******************************************************************************
 * OECD
 */
function drawHealthCareScatter() {
  loadData("data/healthdata.csv")
    .then(convertToJson)
    .then(data => data.data)
    .then(plotHealthCareScatter);
}

// window.onload = drawHealthCareScatter;

function plotHealthCareScatter(data) {
  const healthData = data.map(row => [row.healthspending, row.lifeexpectancy]);
  console.log(healthData);
  const series = [
    {
      data: healthData,
      points: { show: true },
    },
  ];
  const config = {
    title: "Life Expectancy vs Health-Care Spending",
    subtitle: "(by country, OECD data)",
    xaxis: {
      min: 5,
      max: 20,
      tickDecimals: 0,
      title: "Spending as Percentage of GDP",
      tickFormatter: tick => `${tick}%`,
    },
    yaxis: { min: 70, max: 90, tickDecimals: 0, title: "Avg. Life Expectancy" },
  };
  Flotr.draw(document.getElementById("chart"), series, config);
}

/******************************************************************************
 * Global Poverty pie chart
 */
function drawPovertyPie() {
  const series = [
    { data: [[0, 22.4]], label: "Extreme Poverty" },
    { data: [[1, 77.6]] },
  ];
  const config = {
    title: "How Much of the World Lives on $1.25 a day? (2008)",
    pie: { show: true },
    yaxis: { showLabels: false },
    xaxis: { showLabels: false },
    grid: { horizontalLines: false, verticalLines: false },
  };
  Flotr.draw(document.getElementById("chart"), series, config);
}
// window.onload = drawPovertyPie;

/******************************************************************************
 * NOAA temperature line chart
 */
function drawCO2growth() {
  loadData("data/co2.csv")
    .then(convertToJson)
    .then(data => data.data)
    .then(plotCO2Growth);
}
// window.onload = drawCO2growth;

function plotCO2Growth(data) {
  console.log("Plotting co2");
  const co2 = data.map(row => [row.year, row.co2]);
  const temp = data.map(row => [row.year, row.globaltemp]);
  const historicalAverage = data.map(row => [row.year, 0]);
  const config = {
    title:
      "Global Temperature Deviation and CO<sub>2</sub> Concentration (NOAA Data)",
    grid: { horizontalLines: false, verticalLines: false },
    yaxis: {
      min: -0.5,
      max: 2,
      tickFormatter: tick => `${tick} °C`,
    },
    y2axis: { min: 300, max: 400 },
  };
  const series = [
    {
      label: "20<sup>th</sup> Century Baseline Temperature",
      data: historicalAverage,
      lines: { show: true, lineWidth: 1 },
      shadowSize: 0,
      color: "#545454",
    },
    {
      label: "Yearly Temperature Difference (°C)",
      data: temp,
      lines: { show: true },
    },
    {
      label: "CO<sub>2</sub> Concentration (ppm)",
      data: co2,
      yaxis: 2,
      lines: { show: true },
    },
  ];
  Flotr.draw(document.getElementById("chart"), series, config);
}

/******************************************************************************
 * EPL Bar Charts
 */
function drawTeamComparison() {
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
    xaxis: { ticks: teams },
    grid: { horizontalLines: false, verticalLines: false },
  };
  Flotr.draw(document.getElementById("chart"), wins2, config);
}
// window.onload = drawTeamComparison;

function drawManCity() {
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
  const config = {
    title: "Manchester City Wins",
    color: ["#89AFD2"],
    bars: {
      show: true,
      barWidth: 0.5,
    },
    grid: { horizontalLines: false, verticalLines: false },
    yaxis: { min: 0, tickDecimals: false },
    xaxis: { ticks: years },
  };
  Flotr.draw(document.getElementById("chart"), wins, config);
}
// window.onload = drawManCity;

/******************************************************************************
 * Utilities
 */

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
