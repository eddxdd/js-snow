window.onload = function() {

  var canvas = document.getElementById("sky");
  var context = canvas.getContext("2d");

  // Canvas dimensions
  var W = window.innerWidth;
  var H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;

  // Create snow
  var maxFlakes = 100;
  var flakes = [];

  // Loop through the 100 snowflakes and apply attributes
  for(var i = 0; i < maxFlakes; i++) {
    flakes.push({
      x: Math.random()*W,
      y: Math.random()*H,
      r: Math.random()*5+2, // Radius
      d: Math.random() + 1  // Density
    })
  }

  // Drawing flakes onto canvas
  function drawFlakes() {

    context.clearRect(0, 0, W, H);
    context.fillStyle = "#222";
    context.beginPath();

    for(var i = 0; i < maxFlakes; i++) {
      var f = flakes[i];
      context.moveTo(f.x, f.y);
      context.arc(f.x, f.y, f.r, 0, Math.PI*2, true);
    }
    context.fill();
    moveFlakes();
  }

  // Animate the flakes
  var angle = 0;

  function moveFlakes() {

    angle += 0.01;

    for(var i = 0; i < maxFlakes; i++) {
      var f = flakes[i];  // Stores current flake

      // Here update the X and Y coordinates of the snowflakes
      f.y += Math.pow(f.d, 2) + 1;  // How fast it falls
      f.x += Math.sin(angle) * 2; // Angle which it falls

      // If the snowflake reaches the bottom, send a new one to the top
      if(f.y > H) {
        flakes[i] = {x: Math.random()*W, y: 0, r: f.r, d: f.d};
      }
    }
  }
  setInterval(drawFlakes, 25);
}
