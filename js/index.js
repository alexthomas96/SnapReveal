function $i(t) {
    return document.getElementById(t)
}
function $r(t, r) {
    document.getElementById(t).removeChild(document.getElementById(r))
}
function $t(t) {
    return document.getElementsByTagName(t)
}
function $c(t) {
    return String.fromCharCode(t)
}
function $h(t) {
    return ("0" + Math.max(0, Math.min(255, Math.round(t))).toString(16)).slice(-2)
}
function _i(t, r) {
    $t("div")[t].innerHTML += r
}
function _h(t) {
    return hires ? Math.round(t / 2) : t
}
function get_screen_size() {
    var t = document.documentElement.clientWidth,
        r = document.documentElement.clientHeight;
    return Array(t, r)
}
function init() {
    for (var t = 0; n > t; t++) star[t] = new Array(5), star[t][0] = Math.random() * w * 2 - 2 * x, star[t][1] = Math.random() * h * 2 - 2 * y, star[t][2] = Math.round(Math.random() * z), star[t][3] = 0, star[t][4] = 0;
    var r = $i("starfield");
    r.style.position = "absolute", r.width = w, r.height = h, context = r.getContext("2d"), context.fillStyle = "rgb(0,0,0)", context.strokeStyle = "rgb(255,255,255)"
}
function anim() {
    mouse_x = cursor_x - x, mouse_y = cursor_y - y, context.fillRect(0, 0, w, h);
    for (var t = 0; n > t; t++) test = !0, star_x_save = star[t][3], star_y_save = star[t][4], star[t][0] += mouse_x >> 4, star[t][0] > x << 1 && (star[t][0] -= w << 1, test = !1), star[t][0] < -x << 1 && (star[t][0] += w << 1, test = !1), star[t][1] += mouse_y >> 4, star[t][1] > y << 1 && (star[t][1] -= h << 1, test = !1), star[t][1] < -y << 1 && (star[t][1] += h << 1, test = !1), star[t][2] -= star_speed, star[t][2] > z && (star[t][2] -= z, test = !1), star[t][2] < 0 && (star[t][2] += z, test = !1), star[t][3] = x + star[t][0] / star[t][2] * star_ratio, star[t][4] = y + star[t][1] / star[t][2] * star_ratio, star_x_save > 0 && w > star_x_save && star_y_save > 0 && h > star_y_save && test && (context.lineWidth = 2 * (1 - star_color_ratio * star[t][2]), context.beginPath(), context.moveTo(star_x_save, star_y_save), context.lineTo(star[t][3], star[t][4]), context.stroke(), context.closePath());
    timeout = setTimeout("anim()", fps)
}
function start() {
    resize(), anim()
}
function resize() {
    w = parseInt(-1 != url.indexOf("w=") ? url.substring(url.indexOf("w=") + 2, -1 != url.substring(url.indexOf("w=") + 2, url.length).indexOf("&") ? url.indexOf("w=") + 2 + url.substring(url.indexOf("w=") + 2, url.length).indexOf("&") : url.length) : get_screen_size()[0]), h = parseInt(-1 != url.indexOf("h=") ? url.substring(url.indexOf("h=") + 2, -1 != url.substring(url.indexOf("h=") + 2, url.length).indexOf("&") ? url.indexOf("h=") + 2 + url.substring(url.indexOf("h=") + 2, url.length).indexOf("&") : url.length) : get_screen_size()[1]), x = Math.round(w / 2), y = Math.round(h / 2), z = (w + h) / 2, star_color_ratio = 1 / z, cursor_x = x, cursor_y = y, init()
}
var url = document.location.href,
    flag = !0,
    test = !0,
    n = parseInt(-1 != url.indexOf("n=") ? url.substring(url.indexOf("n=") + 2, -1 != url.substring(url.indexOf("n=") + 2, url.length).indexOf("&") ? url.indexOf("n=") + 2 + url.substring(url.indexOf("n=") + 2, url.length).indexOf("&") : url.length) : 812),
    w = 0,
    h = 0,
    x = 0,
    y = 0,
    z = 0,
    star_color_ratio = 0,
    star_x_save, star_y_save, star_ratio = 50,
    star_speed = 1,
    star_speed_save = 0,
    star = new Array(n),
    color, opacity = .1,
    cursor_x = 0,
    cursor_y = 0,
    mouse_x = 0,
    mouse_y = 0,
    canvas_x = 0,
    canvas_y = 0,
    canvas_w = 0,
    canvas_h = 0,
    context, key, ctrl, timeout, fps = 0;
start();
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
