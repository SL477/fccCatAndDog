const result_text = document.getElementById('res');
const uploader: HTMLInputElement = document.getElementById('imgUpload') as HTMLInputElement;

uploader.onchange = () => loadImage();

/**
 * This is to load the image, convert it to the right dimensions and then get the predictions
 */
function loadImage() {
    if (uploader){
        if (uploader.files) {
            if (uploader.files[0]) {
                const file = uploader.files[0];
                const fr = new FileReader();
                if (fr) {
                    fr.onload = () => {
                        const img: HTMLImageElement = new Image();
                        img.src = fr.result as string;
                        img.onload = () => {
                            // update the canvas and predict if cat or dog
                            const canvas: HTMLCanvasElement = document.getElementById('myCanvas') as HTMLCanvasElement;
                            if (canvas) {
                                const context = canvas.getContext('2d');
                                canvas.width = 160;
                                canvas.height = 160;
                                if (context) {
                                    context.drawImage(img as HTMLImageElement, 0,0, 160, 160);

                                    fetch('/predict', {
                                        body: JSON.stringify({
                                            'pic': canvas.toDataURL('image/png').split(';base64,')[1]
                                        }),
                                        method: 'POST',
                                        headers: {
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json'
                                        },
                                    })
                                        .then(ret => {
                                            return ret.json();
                                        })
                                        .then(jsn => {
                                            console.log('prediction', jsn);
                                            
                                            if (result_text) {
                                                result_text.textContent = jsn.classification;
                                            }
                                            return;
                                        });
                                }
                            }
                        };
                    };
                }
                fr.readAsDataURL(file);
            }
        }
    }
}