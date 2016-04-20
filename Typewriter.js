$(document).ready(function() {
    var TW = new Typewriter({ target: '#Typewriter', type: ["T", "[r:1]", "Test", "[w:5000]"] })
})


function Typewriter(args) {
    this.str = args.type.slice();
    this.origin = args.type.slice();
    this.marker = $('<span data-marker>|</span>').appendTo(args.target);
    this.delay = args.delay;
    this.removeDelay = args.removeDelay;
    this.Start();
}
Typewriter.prototype.Start = function() {
    var that = this;
    ///[\[\]]|(?:w\:\d*)/g
    this.Repeat();
    if (this.str[0].match(/(?=\[w\:\d+\])/g)) {
        var wait = parseInt(this.str.shift().replace(/[\[\]w\:]/g, ''));
        setTimeout(function(){
            that.Repeat();
            that.OutPut(that.str.shift());
        }, wait);
    }
    else if (this.str[0].match(/(?=\[r\:\d+\])/g)) {
        var s = this.str.shift();
        this.Backspace(parseInt(s.replace(/[\[\][\w\d+]*r\:]/g, '')));
    }
    else {
        this.OutPut(this.str.shift());
    }
}
Typewriter.prototype.OutPut = function(letters) {
    var that = this;
    var l = letters.split('');
    var c = 0;
    Type();
    function Type() {
        setTimeout(function() {
            $('<span>' + l[c] + '</span>').insertBefore(that.marker);
            if (c == l.length-1) that.Start();
            else {
                c++;
                Type();
            }
        }, this.delay || 800);
    }
}
Typewriter.prototype.Backspace = function(n) {
    var that = this;
    var c = 1;
    if (n === 0) return;
    Remove();
    function Remove() {
        setTimeout(function() {
            that.marker.prev().remove();
            if (c == n) that.Start();
            else {
                c++;
                Remove();
            }
        }, this.removeDelay || 400);
    }
}
Typewriter.prototype.Repeat = function() {
    if (this.repeat != false && this.str.length == 0) {
        this.str = this.origin.slice();
        this.marker.siblings().remove();
    }
}