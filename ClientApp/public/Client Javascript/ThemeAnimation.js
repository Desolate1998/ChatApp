
var setCookie = function(name,value,days) {
  if (days) {
      var date = new Date()
      date.setTime(date.getTime()+(days*24*60*60*1000))
      var expires = "; expires="+date.toGMTString()
  }
  else var expires = ""
  document.cookie = name+"="+value+expires+"; path=/"
}

// gets a cookie
var getCookie = function(name) {
  var nameEQ = name + "="
  var ca = document.cookie.split(';')
  for(var i=0;i < ca.length;i++) {
      var c = ca[i]
      while (c.charAt(0)==' ') c = c.substring(1,c.length)
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length)
  }
  return null
}

/*
* getAllCookies
* get all cookies from the document and
* returns an array of objects in ther form:
* {
*	name: cookieName,
*	value: cookieValue
*  }
*/
var getAllCookies = function(){
var r = new Array()
var u = document.cookie.split(";")
for(var i=0;i<u.length;i++)
  r.push({
    name: u[i].split("=")[0],
    value: u[i].split("=")[1]
  })
return r;
}

// deletes a cookie
var deleteCookie =  function(name) {
   setCookie(name,"",-1)
}

// deletes al cookies from the document
var deleteAllCookies = function(){
var u = document.cookie.split(";")
for(var i=0;i<u.length;i++)
  deleteCookie(u[i].split("=")[0])
}

$(document).ready(function () {
  if(getCookie('Theme') != null){
    document.documentElement.setAttribute('data-theme', getCookie('Theme'));
    if(getCookie('Theme') === 'light')
    {
      document.documentElement.setAttribute('data-theme','dark');
    }else{
      document.documentElement.setAttribute('data-theme','light');
    }
   
  }else{
    document.documentElement.setAttribute('data-theme', 'light');
  }

  var DEBUG = true;
  if (!DEBUG) {
    if (!window.console) window.console = {};
    var methods = ["log", "debug", "warn", "info"];
    for (var i = 0; i < methods.length; i++) {
      console[methods[i]] = function () {};

    }
  }

  var s = Snap.select('#sun');
  var ss = Snap.select('#starGroup');
  var star1 = Snap.select('#star1');
  var star2 = Snap.select('#star2');
  var star3 = Snap.select('#star3');
  var sunRay1 = Snap.select('#sunRay2');
  var sunRay2 = Snap.select('#sunRay4');
  var sunRay3 = Snap.select('#sunRay8');
  var sunRay4 = Snap.select('#sunRay6');
  var sunRay5 = Snap.select('#sunRay1');
  var sunRay6 = Snap.select('#sunRay3');
  var sunRay7 = Snap.select('#sunRay7');
  var sunRay8 = Snap.select('#sunRay5');
  var duration = [];
  var pathIn =
    "M33.5,48.8c-1.3,0.4-4.9,1.3-9.6,0.8c-1-0.1-2.9-0.2-5.1-1c-2.9-1.1-5.2-1.9-7.8-3.8c-5.5-3.9-7.9-9.3-8.8-11.3c-0.8-1.9-3.2-8.4-1-16.1c1.4-4.8,3.9-7.8,5.8-10C9.5,4.7,17.4-2.1,17,0.2c-0.8,4.3-2.3,6.8-1.2,14.6c1.1,8,7.3,16.7,15.3,18.8c9.6,2.5,11.2,1.5,18.7,0.3c1.9-0.3-4,7.6-6.8,9.9C41.5,45,38.3,47.4,33.5,48.8z"

  var pathEnd =
    "M24.7,38.9c-0.6,0-2.9-0.1-5.5-1.4C18.4,37.1,16,36,14,33.4c-0.9-1.1-3.2-4.1-3.3-8.6c0-0.5,0-2.9,1.2-5.7c0.5-1.2,1.8-3.6,4.4-5.6c1.2-0.9,4.3-3,8.7-2.9c3.6,0,6.2,1.5,7.1,2.1c2.5,1.5,4,3.4,4.5,4.1c0.6,0.9,2.6,3.8,2.6,8c0,5-2.7,8.4-3.5,9.2C35.3,34.5,31.1,39.2,24.7,38.9z";

  function morph(path, scale) {
    s.animate({
      d: path,
      transform: scale
    }, 500, mina.backin);

  }

  function stars(t, o, d) {

    var anim = ss.animate({
      transform: t
    }, 500, mina.easeinout);
    star1.animate({
      opacity: o
    }, Number(d[0]), mina.backin);
    star3.animate({
      opacity: o
    }, Number(d[1]), mina.backin);
    star2.animate({
      opacity: o
    }, Number(d[2]), mina.backin);

  }

  /******* Initial animation (Moon) ********/
  function animationIn() {

    // SVG path animation
    $('#sun').css({
      "fill": "#2B77A0"
    });
    $('#star1').css({
      "fill": "#FFC928"
    });
    $('#star2').css({
      "fill": "#FFCF42"
    });
    $('#star3').css({
      "fill": "#FFCC35"
    });

    morph(pathIn, "t0, 0, 1");

    // Stars animation
    duration = ['150', '300', '450'];
    setTimeout(function () {
      stars("t5, -10, s2.5", 1, duration);
    }, 300);

    // Sunrays animation
    sunRay1.animate({
      opacity: 0
    }, 55, mina.easing);
    sunRay2.animate({
      opacity: 0
    }, 110, mina.easing);
    sunRay3.animate({
      opacity: 0
    }, 220, mina.easing);
    sunRay4.animate({
      opacity: 0
    }, 275, mina.easing);
    sunRay5.animate({
      opacity: 0
    }, 330, mina.easing);
    sunRay6.animate({
      opacity: 0
    }, 385, mina.easing);
    sunRay7.animate({
      opacity: 0
    }, 440, mina.easing);
    sunRay8.animate({
      opacity: 0
    }, 495, mina.easing);
  }
  /*****************************************/

  /********* Back animation (Sun) *********/
  function animationBack() {

    // SVG path animation
    $('#sun').css({
      "fill": "#FFEC50"
    });
    morph(pathEnd, "t0, 0, s1");

    // Stars animation
    duration = ['300', '150', '450'];
    stars("t5, 0, s1", 0, duration);

    // Sunrays animation
    setTimeout(function () {
      sunRay1.animate({
        opacity: 1
      }, 55, mina.easing);
      sunRay2.animate({
        opacity: 1
      }, 110, mina.easing);
      sunRay3.animate({
        opacity: 1
      }, 220, mina.easing);
      sunRay4.animate({
        opacity: 1
      }, 275, mina.easing);
      sunRay5.animate({
        opacity: 1
      }, 330, mina.easing);
      sunRay6.animate({
        opacity: 1
      }, 385, mina.easing);
      sunRay7.animate({
        opacity: 1
      }, 440, mina.easing);
      sunRay8.animate({
        opacity: 1
      }, 495, mina.easing)
    }, 300);
  }
  var Dark = true;

  function animController() {
    if (document.documentElement.getAttribute('data-theme') === 'light') {
      animationIn();

    } else {
      animationBack();
    }
  };




  document.getElementById('svgTheme').addEventListener('click', () => {
   
    animController()
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
      setCookie('Theme','light',1000)
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      setCookie('Theme','dark',1000)
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  });
  
  animController()
  if (document.documentElement.getAttribute('data-theme') === 'dark') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  
 


})