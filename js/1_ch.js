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

const years = [
  [0, "2006"],
  [1, "2007"],
  [2, "2008"],
  [3, "2009"],
  [4, "2010"],
  [5, "2011"],
  [6, "2012"],
];

window.onload = () => {
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
};
