"use strict";
const result_text = document.getElementById('res');
function loadImage() {
    const uploader = document.getElementById('imgupload');
    if (uploader) {
        if (uploader.files) {
            if (uploader.files[0]) {
                const file = uploader.files[0];
                const fr = new FileReader();
                if (fr) {
                    fr.onload = () => {
                        const img = new Image();
                        img.src = fr.result;
                        img.onload = () => {
                            const canvas = document.getElementById('mycanvas');
                            if (canvas) {
                                const context = canvas.getContext('2d');
                                canvas.width = 160;
                                canvas.height = 160;
                                if (context) {
                                    context.drawImage(img, 0, 0, 160, 160);
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
//# sourceMappingURL=main.js.map