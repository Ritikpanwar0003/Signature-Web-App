document.addEventListener('DOMContentLoaded', function () {
    const canvas = new fabric.Canvas('signatureCanvas', {
        isDrawingMode: true
    });

    const bgColorInput = document.getElementById('bgColor');
    const fontSizeInput = document.getElementById('fontSize');
    const brushTypeSelect = document.getElementById('brushType');
    const brushColorInput = document.getElementById('brushColor');
    const downloadBtn = document.getElementById('downloadBtn');
    const clearBtn = document.getElementById('clearBtn');

    // Change background color
    bgColorInput.addEventListener('change', function () {
        canvas.backgroundColor = bgColorInput.value;
        canvas.renderAll();
    });

    // Change font size
    fontSizeInput.addEventListener('change', function () {
        canvas.freeDrawingBrush.width = parseInt(fontSizeInput.value, 10) || 1;
    });

    // Change brush type
    brushTypeSelect.addEventListener('change', function () {
        const brushType = brushTypeSelect.value;
        switch (brushType) {
            case 'CircleBrush':
                canvas.freeDrawingBrush = new fabric.CircleBrush(canvas);
                break;
            case 'SprayBrush':
                canvas.freeDrawingBrush = new fabric.SprayBrush(canvas);
                break;
            case 'PencilBrush':
            default:
                canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
                break;
        }
        canvas.freeDrawingBrush.width = parseInt(fontSizeInput.value, 10) || 1;
        canvas.freeDrawingBrush.color = brushColorInput.value;
    });

    // Change brush color
    brushColorInput.addEventListener('change', function () {
        canvas.freeDrawingBrush.color = brushColorInput.value;
    });

    // Download signature
    downloadBtn.addEventListener('click', function () {
        const dataURL = canvas.toDataURL({
            format: 'png',
            multiplier: 2
        });
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'signature.png';
        link.click();
    });

    // Clear canvas
    clearBtn.addEventListener('click', function () {
        canvas.clear();
        canvas.backgroundColor = bgColorInput.value;
        canvas.renderAll();
    });

    // Set initial brush properties
    canvas.freeDrawingBrush.width = parseInt(fontSizeInput.value, 10) || 1;
    canvas.freeDrawingBrush.color = brushColorInput.value;
});
