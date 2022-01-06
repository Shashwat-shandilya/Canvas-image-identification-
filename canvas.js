canvas = new fabric.Canvas('myCanvas');
block_imgWidth = 70;
block_imgHeight = 70;
Playerx = 500;
Playery = 200;
player_object = "";
block_imageObject = "";

function player_update(){
    fabric.Image.fromURL("player.png", function(Img){
        player_object = Img;
        player_object.scaleToWidth(150);
        player_object.scaleToHeight(150);
        player_object.set({
          top:Playery,
          left:Playerx
        });
        canvas.add(player_object);
    })
}


function new_image(get_image){
  fabric.Image.fromURL(get_image, function(Img){
    block_imageObject = Img;
    block_imageObject.scaleToWidth(block_imgWidth);
    block_imageObject.scaleToHeight(block_imgHeight);
    block_imageObject.set({
      top:Playery,
      left:Playerx
    });
    canvas.add(block_imageObject);
})
}

window.addEventListener('keydown', myKeydown)

function myKeydown(e){
  keyPressed = e.keyCode;
  console.log(keyPressed);

  if(e.shiftKey == true && keyPressed == '73'){
    block_imgWidth = block_imgWidth + 10;
    block_imgHeight = block_imgHeight + 10;
    document.getElementById('current_width').innerHTML = block_imgWidth;
    document.getElementById('current_height').innerHTML = block_imgHeight;
    console.log("shift key and I pressed together")
  }

  if(e.shiftKey == true && keyPressed == '68'){
    block_imgWidth = block_imgWidth - 10;
    block_imgHeight = block_imgHeight - 10;
    document.getElementById('current_width').innerHTML = block_imgWidth;
    document.getElementById('current_height').innerHTML = block_imgHeight;
    console.log("shift key and D pressed together")
  }

  if(keyPressed == 38){
    up();
    console.log("up arrow key");
  }
  if(keyPressed == 40){
    down();
    console.log("down arrow key");
  }
  if(keyPressed == 37){
    left();
    console.log("left arrow key");
  }
  if(keyPressed == 39){
    right();
    console.log("right arrow key");
  }

  if(keyPressed == 67){
    new_image('cloud.png');
    console.log("c")
  }
  if(keyPressed == 68){
    new_image('water.png');
    console.log("d")
  }
  if(keyPressed == 71){
    new_image('ground.png');
    console.log("g")
  }
  if(keyPressed == 76){
    new_image('light_green.png');
    console.log("l")
  }
  if(keyPressed == 82){
    new_image('stairs.png');
    console.log("r")
  }
  if(e.shiftKey == true && keyPressed == 82){
    new_image('stairs2.png');
    console.log("r2")
  }
  if(keyPressed == 84){
    new_image('trunk.jpg');
    console.log("t")
  }
  if(keyPressed == 70){
    new_image('unique.png');
    console.log("f")
  }
  if(e.shiftKey == true && keyPressed == 70){
    new_image('fireball2.png');
    console.log("f")
  }
  if(keyPressed == 87){
    new_image('wall.jpg');
    console.log("w")
  }
  if(keyPressed == 89){
    new_image('yellow_wall.png');
    console.log("y")
  } 
  if(keyPressed == 80){
    new_image('player.png');
    console.log("p")
  } 
  if(keyPressed == 65){
    new_image('player2.png');
    console.log("a")
  }
}

function up(){
  if(Playery > 0){
    Playery =  Playery - 10;
    console.log(Playery);
    canvas.remove(player_object);
    player_update();
  }
}
function down(){
  if(Playery < 450){
    Playery =  Playery + 10;
    console.log(Playery);
    canvas.remove(player_object);
    player_update();
  }
}
function left(){
  if(Playerx > 0){
    Playerx =  Playerx - 10;
    console.log(Playerx);
    canvas.remove(player_object);
    player_update();
  }
}
function right(){
  if(Playerx < 680){
    Playerx =  Playerx + 10;
    console.log(Playerx);
    canvas.remove(player_object);
    player_update();
  }
}
function takeSnapshot(){
    plsimg = canvas.toDataURL('image.jpeg')
    html2canvas(document.getElementById('myCanvas')).then(function(canvas){
    document.getElementById('capturedImg').appendChild(canvas)
    document.getElementById('capturedImg').innerHTML = '<img id="image" src="'+plsimg+'">'
    });
    identify;
}
console.log("ml5version: ", ml5.version)

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/nctzlMklW/model.json', modelLoaded);

function modelLoaded(){
    console.log("modelLoaded")
}

function identify(){
    img = document.getElementById('image')
    classifier.classify(img, gotResult)
}

function gotResult(error, result){
    if(error){
        console.error(error)
    }else{
        console.log(result)
        document.getElementById('result_drawing').innerHTML = result[0].label
        document.getElementById('result_accuracy').innerHTML = result[0].confidence.toFixed(3)
    }
}