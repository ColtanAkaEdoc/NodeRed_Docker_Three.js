<script>
var server = window.location.href.split("http://")[1].split("/")[0]
console.log("Page location is " + server)

var socket1 = new  WebSocket("ws://" + server + "/ws/receive");
var socket2 = new  WebSocket("ws://" + server + "/ws/publish");

var script1 = "#0000FF";
var script2 = "#FF0000";

var socket1Opened = false

socket1.onopen = function() {
    socket1Opened = true;
    var message = {
        'payload': 'Client connected'
    };
    socket1.send(JSON.stringify(message));
};

socket2.onopen = function() {
  var message = {
    'payload': 'Client connected'
  };
  socket1.send(JSON.stringify(message));
};

socket2.onclose = function(){
  console.log('Connection closed');
};

socket2.onerror = function(error) {
  console.log('Error detected: ' + JSON.stringify(error));
};

socket2.onmessage = function(e) {
  var server_message = e.data;
  responseObject = JSON.parse(server_message);

  //alert(JSON.stringify(responseObject));
  //Do the required stuff
  console.log(responseObject.payload)
  if(responseObject.payload.script1){
      script1 = responseObject.payload.script1;
      drawHeatMap();
  }
}

drawHeatMap();

function drawHeatMap(){
var canvas = document.getElementById("HeatMapCanvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = script2;

ctx.fillRect(0,0,100,100);
ctx.fillRect(101,0,100,100);
ctx.fillRect(202,0,100,100);
ctx.fillRect(303,0,100,100);
ctx.fillRect(404,0,100,100);
ctx.fillRect(505,0,100,100);
ctx.fillRect(606,0,100,100);
ctx.fillRect(707,0,100,100);

ctx.fillStyle = script1;
ctx.fillRect(0,101,100,100);

console.log(script2);
console.log(script1);
}

</script>
