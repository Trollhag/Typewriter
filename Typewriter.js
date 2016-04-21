$(document).ready(function() {
    var TW = new Typewriter({ target: '#Typewriter', type: ["Test", "[wait:1500|backspace:4|wait:500]", "Its Good", "[wait:5000]"], delay: 200, removeDelay: 100 })
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
    ///[\[\]]|(?!\w*\:\d+)\|.*/g               Match all but first
    ///(?:\w*\:\d+)/                       Match only first
    this.Repeat();
    if (this.str[0].match(/[\[\]]|(?!\w*\:\d+)\|.*/g)) {
        var operators = this.str.shift().replace(/[\[\]]/g, '').split('|');
        operators.forEach(function(v) {
        });
        var c = 0;
        loop();
        function loop() {
            if (operators[c].indexOf("wait") > -1) {
                setTimeout(function(){
                    if (c == operators.length-1) {
                        that.Repeat();
                        that.Start();
                    }
                    else {
                        c++;
                        loop();
                    }
                }, parseInt(operators[c].replace(/[^\d]/g, '')));
            }
            else if (operators[c].indexOf('backspace') > -1) {
                that.Backspace(parseInt(operators[c].replace(/[^\d]/g, '')), function() {
                    if (c == operators.length-1) {
                        return true;
                    }
                    else {
                        c++;
                        loop();
                        return false;
                    }
                });
            }
        }
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
        }, that.delay || 800);
    }
}
Typewriter.prototype.Backspace = function(n, complete) {
    var that = this;
    if(!$.isFunction(complete)) complete = function() {};
    var c = 1;
    if (n === 0) return;
    Remove();
    function Remove() {
        setTimeout(function() {
            that.marker.prev().remove();
            if (c == n) {
                if (!complete()) return;
                that.Start();
            }
            else {
                c++;
                Remove();
            }
        }, that.removeDelay || 400);
    }
}
Typewriter.prototype.Repeat = function() {
    if (this.repeat != false && this.str.length == 0) {
        this.str = this.origin.slice();
        this.marker.siblings().remove();
    }
}