img = "";
status ="";
objects =[];
function setup(){
    canvas = createCanvas(1000, 800);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(1000,800);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', loaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function preload(){
    img = loadImage('dog_cat.jpg');

}


function loaded(){
console.log("Model Loaded");
status = true;

}

function gotResult(error,results){
    if(error){
        console.log(error);
    
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(video, 0, 0, 1000, 800);
    
    if(status != " "){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for(i= 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "status: object detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are:"+ objects.length;

            fill(r,g,b);
            percent = floor(objects[i].confidence *100);
            text(objects[i].label + " "+percent + "%", objects[i].x+50, objects[i].y+50);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x+100, objects[i].y+50, objects[i].width, objects[i].height+200);
        }
    }
}