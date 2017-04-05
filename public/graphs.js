google.charts.load('current', {'packages':['line']});

document.getElementById('render_chart').addEventListener("click",buttonClickDraw);
google.charts.setOnLoadCallback(buttonClickDraw);

function buttonClickDraw(strX,strY,formTime) {
   drawChart(strX, strY, formTime);
}

function drawChart(x, y, formTime) {
 var data = new google.visualization.DataTable();
 switch (x) {
  case "Time":
  data.addColumn('number', 'Day');
  break;
  case "Temperature":
  data.addColumn('number', 'Temperature');
  break;
  case "Light":
  data.addColumn('number', 'Light');
  break;
  case "pH":
  data.addColumn('number', 'pH');
  break;
}
switch (y) {
  case "Time":
  data.addColumn('number', 'Day');
  break;
  case "Temperature":
  data.addColumn('number', 'Temperature');
  break;
  case "Light":
  data.addColumn('number', 'Light');
  break;
  case "pH":
  data.addColumn('number', 'pH');
  break;
}

data.addRows(dataTest(x, y, formTime));

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

function filterData(dataArr, endTime, startTime, xCol, yCol) {
  var count = 0;
  for(i = 0; i < dataArr.length; i++){
    if(dataArr[i].date >= startTime && dataArr[i].date <= endTime) {
      count++;
    }
  }
  var dataArray = createArray(count, 2);
  var index = 0;
  for (i = 0; i < dataArr.length; i++) {
    if(dataArr[i].date >= startTime && dataArr[i].date <= endTime) {
      switch(xCol) {
        case "Time":
        dataArray[index][0] = dataArr[i].date;
        break;
        case "Temperature":
        dataArray[index][0] = dataArr[i].temp;
        break;
        case "Light":
        dataArray[index][0] = dataArr[i].light;
        break;
        case "pH":
        dataArray[index][0] = dataArr[i].ph;
        break;
      }
      switch(yCol) {
        case "Time":
        dataArray[index][1] = dataArr[i].date;
        break;
        case "Temperature":
        dataArray[index][1] = dataArr[i].temp;
        break;
        case "Light":
        dataArray[index][1] = dataArr[i].light;
        break;
        case "pH":
        dataArray[index][1] = dataArr[i].ph;
        break;
      }
      index++;
    }
  }
  return dataArray;
}

  function drawData() {
    console.log("test");
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:8080/data", false);
    xhttp.send();
    var response = JSON.parse(xhttp.responseText);
  }

  function dataTest(xCol, yCol, formTime){

    var durationInMinutes = 0;
    switch(formTime) {
      case "1":
      durationInMinutes = 6*60;
      break;
      case "2":
      durationInMinutes = 24*60;
      break;
      case "3":
      durationInMinutes = 24*3*60;
      break;
      case "4":
      durationInMinutes = 24*7*60;
      break;
      case "5":
      durationInMinutes = 24*7*2*60;
      break;
      case "6":
      durationInMinutes = 24*30*60;
      break;
      case "7":
      durationInMinutes = 24*30*2*60;
      break;
    }
    var MS_PER_MINUTE = 60000;
    var date = new Date();
    var myStartDate = (date - durationInMinutes * MS_PER_MINUTE);
    var url = "http://localhost:8080/data";
    var dataTry = httpGet(url);
    console.log(JSON.parse(dataTry));
    var dataArr = filterData(dataTry, date, myStartDate, xCol, yCol);
    return dataArr;
  };


  function httpGet(theUrl)
  {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
  }

