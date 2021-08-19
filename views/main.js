let img;
let fr;

const results = ['Cat', 'Dog'];

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

    $.post('/predict', 
    {
        'pic': canvas.toDataURL("image/png").split(';base64,')[1]
    }, function(res) {
        console.log('predict', res);
        console.log('prediction', res['prediction']);
        if (res['prediction'] == -1) {
            $('#res').text("Error");
        }
        else {
            $('#res').text(results[res['prediction']]);
        }
    });
}