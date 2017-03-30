var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

window.onload = (function () {
    ctx.beginPath();
    ctx.rect(0,0, 600, 500);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.fillStyle = '#2233333';
    ctx.font = 70 + 'px impact';
    ctx.textAlign = "center";
    ctx.lineWidth = 2;
    wrapTopText(ctx, "Upload image or choose from given below", canvas.width / 2, canvas.height / 3, canvas.width - 60, 70);
})
// Draw in canvas tag
lines = 0;
function draw(text1, text2, size1, size2, img) {
    /* draw something */
    if (img != undefined) {
        $('#aside').removeAttr('hidden');
        ctx.shadowBlur = 10;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#fff';
        ctx.font = size1 + 'px impact';
        wrapTopText(ctx, text1, canvas.width / 2, size1 - 5, canvas.width - 60, size1 - 10);
        ctx.font = size2 + 'px impact';
        ctx.font = 'impact';
        wrapBottomText(ctx, text2, canvas.width / 2, canvas.height - lines * (size2 - 10) - 10, canvas.width - 60, size2 - 10);
    }
}

// Handle changes in text
$('.tb').each(function () {
    var elem = $(this);
    elem.data('oldVal', elem.val());
    elem.bind("propertychange change click keyup input paste", function (event) {
        if (elem.data('oldVal') != elem.val()) {
            elem.data('oldVal', elem.val());

            // Do action
            draw($('#text-box1').val(), $('#text-box2').val(), $('#size-font1').val(), $('#size-font2').val(), image);
        }
    });
});

// Handle change in template
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            image = new Image();
            image.src = e.target.result;
            draw($('#text-box1').val(), $('#text-box2').val(), $('#size-font1').val(), $('#size-font2').val(), image);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
$("#file").change(function () {
    readURL(this);
    $('#text-box1').val('');
    $('#text-box2').val('');
});
function reply_click(clicked_id) {
    $('#text-box1').val('');
    $('#text-box2').val('');
    name = clicked_id;
    image = new Image();
    srcimg = '../Images/' + name + '.jpg';
    image.src = srcimg;
    draw($('#text-box1').val(), $('#text-box2').val(), $('#size-font1').val(), $('#size-font2').val(), image);
    $('#img').val(undefined);
}
// Positioning of top text 
function wrapTopText(context, text, x, y, maxWidth, lineHeight) {
    var words = text.split(' '),
        line = ' ',
        lineCount = 0,
        i,
        test,
        metrics;
    for (i = 0; i < words.length; i++) {
        test = words[i];
        metrics = context.measureText(test);
        while (metrics.width > maxWidth) {
            // Determine how much of the word will fit
            test = test.substring(0, test.length - 1);
            metrics = context.measureText(test);
        }
        if (words[i] != test) {
            words.splice(i + 1, 0, words[i].substr(test.length))
            words[i] = test;
        }
        test = line + words[i] + ' ';
        metrics = context.measureText(test);
        if (metrics.width > maxWidth && i > 0) {
            context.textAlign = "center";
            context.fillText(line, x, y);
            context.strokeText(line, x, y);
            line = words[i] + ' ';
            y += lineHeight;
            lineCount++;
        }
        else {
            line = test;
        }
    }
    context.textAlign = "center";
    context.fillText(line, x, y);
    context.strokeText(line, x, y);
}
function wrapBottomText(context, text, x, y, maxWidth, lineHeight) {

    var words = text.split(' '),
        line = ' ',
        lineCount = 0,
        i,
        test,
        metrics;

    for (i = 0; i < words.length ; i++) {
        test = words[i];
        metrics = context.measureText(test);
        while (metrics.width > maxWidth) {
            // Determine how much of the word will fit
            test = test.substring(0, test.length - 1);
            metrics = context.measureText(test);
        }
        if (words[i] != test) {
            words.splice(i + 1, 0, words[i].substr(test.length))
            words[i] = test;
        }
        test = line + words[i] + ' ';
        metrics = context.measureText(test);
        if (metrics.width > maxWidth && i > 0) {
            context.textAlign = "center";
            context.fillText(line, x, y);
            context.strokeText(line, x, y);
            line = words[i] + ' ';
            y += lineHeight;
            lineCount++;
        }
        else {
            line = test;
        }
    }
    lines = lineCount;
    context.textAlign = "center";
    context.fillText(line, x, y);
    context.strokeText(line, x, y);
}
// Download link
function downloadCanvas(link, canvasId, filename) {
    link.href = document.getElementById(canvasId).toDataURL();
    link.download = filename;
}
document.getElementById('download').addEventListener('click', function () {
    downloadCanvas(this, 'canvas', 'meme.png');
}, false);
