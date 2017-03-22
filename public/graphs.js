google.charts.load('current', {'packages':['line']});
var xChoice = document.getElementById("stringX");
var yChoice = document.getElementById("stringY");
var timeLength = document.getElementById("timeSpan")
document.getElementById('render_chart').addEventListener("click", function(){
  var strX = xChoice.options[xChoice.selectedIndex].text;
  var strY = yChoice.options[yChoice.selectedIndex].text;
  var endTime = (new Date()).getTime();
  var timeOffSet = findTimeOffset(timeLength);
  var beginTime = endTime- timeOffset;
  drawChart(strX, strY, beginTime, endTime);
});
google.charts.setOnLoadCallback(drawChart);

function drawChart(x, y, beginTime, endTime) {
 var xCol = 0;
 var yCol = 0;
 var data = new google.visualization.DataTable();
 switch (x) {
  case "Time":
  data.addColumn('number', 'Day');
  break;
  case "Temperature":
  data.addColumn('number', 'Temperature');
  xCol = 1;
  break;
  case "Light":
  data.addColumn('number', 'Light');
  xCol = 2;
  break;
  case "pH":
  data.addColumn('number', 'pH');
  xCol = 3;
  break;
}
switch (y) {
  case "Time":
  data.addColumn('number', 'Day');
  break;
  case "Temperature":
  data.addColumn('number', 'Temperature');
  yCol = 1;
  break;
  case "Light":
  data.addColumn('number', 'Light');
  yCol = 2;
  break;
  case "pH":
  data.addColumn('number', 'pH');
  yCol = 3;
  break;
}

data.addRows(isolateCols(xCol, yCol, data(beginTime, endTime)));

var options = {
 chart: {
   title: x + ' plotted against ' + y
 },
 width: 900,
 height: 500
};

var chart = new google.charts.Line(document.getElementById('chart_div'));

chart.draw(data, options);
}

function createArray(length) {
  var arr = new Array(length || 0),
  i = length;

  if (arguments.length > 1) {
    var args = Array.prototype.slice.call(arguments, 1);
    while(i--) arr[length-1 - i] = createArray.apply(this, args);
  }

  return arr;
}

function isolateCols(xCol, yCol, dataArr) {
  var dataArray = createArray(dataArr.length, 2)
  for (i = 0; i < dataArr.length; i++) {
    dataArray[i][0] = dataArr[i][xCol];
    dataArray[i][1] = dataArr[i][yCol];
  }
  return dataArray;
}

function findTimeOffset(timeLengthValue) {
  var offset = 0;
  var hourOffset = 3600000;
  switch(timeLengthValue) {
    case 1:
    offset = hourOffset * 6;
    break;
    case 2:
    offset = hourOffset * 24;
    break;
    case 3:
    offset = hourOffset * 24*3;
    break;
    case 4:
    offset = hourOffset * 24*7;
    break;
    case 5:
    offset = hourOffset * 24*14;
    break;
    case 6:
    offset = hourOffset * 24*30;
    break;
    case 7:
    offset = hourOffset * 24*60;
    break;
  }

  function drawData() {
    console.log("test");
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:8080/data", false);
    xhttp.send();
    var response = JSON.parse(xhttp.responseText);
  }

 
}
