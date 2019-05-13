let snappedArray = $('.snapped');
const glove = document.querySelector('.infinity') 
const snapBanner = document.querySelector('.snap')
glove.addEventListener('click', snapDat)

function snapDat() {
  glove.className = 'hide'
  snapBanner.className ="snap"
  setTimeout(()=> {
    glove.className = 'infinity'
    snapBanner.className = 'hide'
  }, 1500)
}

//Snap animation
//var imageDataArray = [];
var canvasCount = 7;
$(".glow-div").click(function(){
$('.sign-wrap').css('opacity', '1');
(async function loop() {
  for (var snapIndex = snappedArray.length-2;snapIndex>=0;snapIndex-=2) {
      await new Promise(resolve => setTimeout(resolve, Math.random() * 3000));
      thanos(snappedArray[snapIndex], snapIndex);
  }
  for (var snapIndex = snappedArray.length-1;snapIndex>=0;snapIndex-=2) {
      await new Promise(resolve => setTimeout(resolve, Math.random() * 3000));
      thanos(snappedArray[snapIndex], snapIndex);
  }
})();
});
function thanos(snapElement, snapIndex) {
  html2canvas(snapElement, {backgroundColor: null}).then(canvas => {
    //capture all div data as image
    let ctx = null;
    ctx = canvas.getContext("2d");
    ctx.crossOrigin = "Anonymous";
    let imageData = null;
    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var pixelArr = imageData.data;
    createBlankImageData(imageData);
    //put pixel info to imageDataArray (Weighted Distributed)
    for (let i = 0; i < pixelArr.length; i+=4) {
      //find the highest probability canvas the pixel should be in
      let p = Math.floor((i/pixelArr.length) *canvasCount);
      let a = imageDataArray[weightedRandomDistrib(p)];
      a[i] = pixelArr[i];
      a[i+1] = pixelArr[i+1];
      a[i+2] = pixelArr[i+2];
      a[i+3] = pixelArr[i+3]; 
    }
    //create canvas for each imageData and append to target element
    for (let i = 0; i < canvasCount; i++) {
      let c = null
      c = newCanvasFromImageData(imageDataArray[i], canvas.width, canvas.height);
      c.classList.add("dust");
      $('.content')[snapIndex].append(c);

    }
    //clear all children except the canvas
    $(snapElement).parent().children().not(".dust").fadeOut(700);
    //apply animation
    $(".dust").each(function(index){
      animateBlur($(this),0.8,800);
      setTimeout(() => {
        animateTransform($(this),100,-100,chance.integer({ min: -15, max: 15 }),800+(110*index));
      }, 70*index); 
      //remove the canvas from DOM tree when faded
      $(this).delay(70*index).fadeOut((110*index)+800,"easeInQuint",()=> {$( this ).remove();});
    });
  });
  imageDataArray = [];
}
function weightedRandomDistrib(peak) {
  var prob = [], seq = [];
  for(let i=0;i<canvasCount;i++) {
    prob.push(Math.pow(canvasCount-Math.abs(peak-i),3));
    seq.push(i);
  }
  return chance.weighted(seq, prob);
}
function animateBlur(elem,radius,duration) {
  var r =0;
  $({rad:0}).animate({rad:radius}, {
      duration: duration,
      easing: "easeOutQuad",
      step: function(now) {
        elem.css({
              filter: 'blur(' + now + 'px)'
          });
      }
  });
}
function animateTransform(elem,sx,sy,angle,duration) {
  var td = tx = ty =0;
  $({x: 0, y:0, deg:0}).animate({x: sx, y:sy, deg:angle}, {
      duration: duration,
      easing: "easeInQuad",
      step: function(now, fx) {
        if (fx.prop == "x") 
          tx = now;
        else if (fx.prop == "y") 
          ty = now;
        else if (fx.prop == "deg") 
          td = now;
        elem.css({
              transform: 'rotate(' + td + 'deg)' + 'translate(' + tx + 'px,'+ ty +'px)'
          });
      }
  });
}
function createBlankImageData(imageData) {
  for(let i=0;i<canvasCount;i++)
  {
    let arr = new Uint8ClampedArray(imageData.data);
    for (let j = 0; j < arr.length; j++) {
        arr[j] = 0;
    }
    imageDataArray.push(arr);
  }
}
function newCanvasFromImageData(imageDataArray ,w , h) {
  var canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      tempCtx = canvas.getContext("2d");
      try{
      tempCtx.putImageData(new ImageData(imageDataArray, w , h), 0, 0);
      } catch {
        console.log('Index less than 0');
      }
      
  return canvas;
}
