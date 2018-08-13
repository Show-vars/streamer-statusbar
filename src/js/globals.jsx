import $ from 'jquery';

window.$ = $;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomIntExclusive(min, max, exclude) {
    var r;
    while(exclude.indexOf(r = getRandomInt(min, max)) > -1) {
    }
    return r;
}

function invertColor(hex, bw) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    var r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
            ? '#000000'
            : '#FFFFFF';
    }
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);

    return "#" + padZero(r) + padZero(g) + padZero(b);
}

function padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}

window.getRandomInt = getRandomInt;
window.getRandomIntExclusive = getRandomIntExclusive;
window.invertColor = invertColor;

Number.prototype.formatAsPlayerTime = function(whours = false) {
  var secs = this;
  var hr  = Math.floor(secs / 3600);
  var min = Math.floor((secs - (hr * 3600))/60);
  var sec = Math.floor(secs - (hr * 3600) -  (min * 60));

  if (hr < 10 ) hr  = "0" + hr;
  if (min < 10) min = "0" + min;
  if (sec < 10) sec = "0" + sec;

  return whours ? (hr + ':' + min + ':' + sec) : (min + ':' + sec);
}

Number.prototype.mod = function(n) {
    return ((this % n) + n) % n;
};

Number.prototype.rublePrice = function(fraction) {
    var price = Number.prototype.toFixed.call(parseInt(this) || 0, fraction ? 2 : 0);
    price = price.replace(/(\D)/g, ",");
    price = price.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");

    return price;
};

String.prototype.phoneFormat = function() {
    return this.replace(/(\d)(\d\d\d)(\d\d\d)(\d\d)(\d\d)/, '$1 ($2) $3-$4-$5');
};

Array.prototype.shuffle = function () {
    for (let i = this.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [this[i - 1], this[j]] = [this[j], this[i - 1]];
    }
};

Array.prototype.last = function() {
  return this[this.length - 1];
};

if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined' ? args[number] : match;
    });
  };
}

(function(){
  var parse = JSON.parse;
  JSON = {
    stringify: JSON.stringify,
    validate: function(str){
      try{
        parse(str);
        return true;
      }catch(err){
        return err;
      }
    },
    parse: function(str){
      try{
        return parse(str);
      }catch(err){
        return undefined;
      }
    }
  }
})();
