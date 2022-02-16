our = "";
cat = "";

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

leftWristScore = 0;
rightWristScore = 0;

song1Status = "";
song2Status = "";

function preload(){
our = loadSound("our anthem.mp3");
cat = loadSound("cat vibing.mp3");
}
function setup(){
    canvas = createCanvas(800,500);
    canvas.position(900,300);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose', gotPoses);

    our.setVolume(1);
}
function draw(){
image(video,0,0,1000,500);

stroke(0);
noFill();
strokeWeight(3);



if(leftWristScore > 0.01 && our.isPlaying() == false){
    square(leftWristX,leftWristY,80);
    our.play();
    cat.stop();
}
if(leftWristScore < 0.01 && our.isPlaying() == true){
    square(leftWristX,leftWristY,80);
    our.stop();
    cat.stop();
}
if(rightWristScore > 0.01 && cat.isPlaying() == false){
    square(leftWristX,leftWristY,80);
    our.play();
    cat.stop();
}
if(rightWristScore < 0.01 && cat.isPlaying() == true){
    square(leftWristX,leftWristY,80);
    our.stop();
    cat.stop();
}

}

function modelLoaded(){
console.log("model Loaded");
}
function gotPoses(results){
    if(results.length > 0){
        // console.log(results);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        leftWristScore = results[0].pose.keypoints[9].score;
        rightWristScore = results[0].pose.keypoints[10].score;
        console.log(rightWristScore,leftWristScore);
    }
}