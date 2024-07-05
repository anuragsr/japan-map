var imgCon = document.getElementById('map-contain');
var image = document.getElementById('myImage');
var mc = new Hammer.Manager(image);

var pinch = new Hammer.Pinch();
var pan = new Hammer.Pan();

pinch.recognizeWith(pan);

mc.add([pinch, pan]);

var adjustScale = 1;
var adjustDeltaX;
if(window.innerWidth <= 700)
    adjustDeltaX = -1024;
else
    adjustDeltaX = -768;
var adjustDeltaY = -1024;

var currentScale = null;
var currentDeltaX = null;
var currentDeltaY = null;

imgCon.addEventListener('touchstart', function (e) {
    e.preventDefault()
});

mc.on("pinch pan", function (ev) {

    var transforms = [];

    currentScale = adjustScale * ev.scale;
    currentDeltaX = adjustDeltaX + (ev.deltaX / currentScale);
    currentDeltaY = adjustDeltaY + (ev.deltaY / currentScale);

    transforms.push('scale(' + currentScale + ')');
    transforms.push('translate(' + currentDeltaX + 'px,' + currentDeltaY + 'px)');
    TweenMax.to("#myImage", 0.2, {transform:transforms.join(' '), ease:Back.easeOut});
});


mc.on("panend pinchend", function (ev) {
    adjustScale = currentScale;
    adjustDeltaX = currentDeltaX;
    adjustDeltaY = currentDeltaY;
});

function zoomIn(){
    TweenMax.to("#myImage", 0.5, {zoom:"+=0.1", ease:Back.easeOut});
}

function zoomOut(){
    TweenMax.to("#myImage", 0.5, {zoom:"-=0.1", ease:Back.easeOut});
}