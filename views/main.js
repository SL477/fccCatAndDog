'use strict';

const resultText = document.getElementById('res');
const uploader = document.getElementById('imgUpload');
const canvas = document.getElementById('myCanvas');
const context = canvas?.getContext('2d');

/**
 * This is to load the image, convert it to the right dimensions and then get the predictions
 */
uploader?.addEventListener('change', async () => {
  try {
    const file = uploader.files[0];
    if (!file) throw new Error('No file selected');

    const img = await loadImage(file);
    const dataUrl = canvasToPngDataUrl(img);

    const { classification } = await predict(dataUrl);
    resultText.textContent = classification;
  } catch (err) {
    console.error(err);
    resultText.textContent = 'Error';
  }
});

async function loadImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function canvasToPngDataUrl(img) {
  canvas.width = canvas.height = 160;
  context?.drawImage(img, 0, 0, 160, 160);
  return canvas.toDataURL('image/png').split(';base64,')[1];
}

async function predict(base64) {
  const response = await fetch('/predict', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 'pic': base64 }),
  });
  return response.json();
}
