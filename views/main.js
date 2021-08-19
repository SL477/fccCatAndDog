/*import * as tf from '@tensorflow/tfjs-node';

//const model = await tf.loadLayersModel('jsmodel\model.json');
const model = await tf.loadLayersModel('http://localhost:3000/jsmodel/model');

console.log("model", model.summary());*/

let img;
let fr;

function loadImage() {


    let uploader = document.getElementById("imgupload");
    if (!uploader.files[0]) {
        alert("No file selected");
        return;
    }
    let file = uploader.files[0];
    fr = new FileReader();
    fr.onload = createImage;
    fr.readAsDataURL(file);
}

function createImage() {
    img = new Image();
    img.onload = imageLoaded;
    img.src = fr.result;
}

function imageLoaded() {
    // update the canvas and predict if cat or dog
    let canvas = document.getElementById("mycanvas");
    let context = canvas.getContext("2d");
    canvas.width = 150;
    canvas.height = 150;
    context.drawImage(img, 0,0, 150, 150);

    //console.log(canvas.toDataURL("image/png"));
    let tensor = tf.browser.fromPixels(canvas);
    console.log("tensor", tensor);
}