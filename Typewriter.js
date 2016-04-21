function Typewriter(args) {
    // TODO: Change str/Type wait/backspace syntax to array rather than clumsy string styntax, easier to read, easier to parse.
    this.str = args.Type.slice();
    this.origin = args.Type.slice();
    this.marker = $('<span class="typewriter-marker">|</span>').appendTo(args.Target);
    this.delay = args.Delay;
    this.removeDelay = args.BackspaceDelay;
    this.Start();
}
Typewriter.prototype.Start = function() {
    var that = this;
    // Makes it possible to backtrack to previous instance, looks better than C/P code.
    if (Number.isInteger(this.str[0]) && !Number.isInteger(this.origin[this.str[0]]) && this.origin[this.str[0]] != undefined) {
        this.instance = this.origin[this.str.shift()];
    }
    else {
        this.Repeat();
        this.instance = this.str.shift();
    }
    if (this.instance.match(/[\[\]]|(?!\w*\:\d+)\|.*/g)) {
        var operators = this.instance.replace(/[\[\]]/g, '').split('|');
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
                // TODO: Move this junk to Backspace prototype function, it does not belong here.
                var n = 0;
                var d = null;
                var arr = operators[c].split(':');
                
                if (arr[1].toLowerCase() === "all" || parseInt(arr[1]) === 0) {
                    n = that.marker.siblings().length;
                }
                else {
                    n = parseInt(arr[1].replace(/[^\d]/g, ''));
                }
                
                if (operators[c].match(/backspace\:.*\:\d*/)) {
                    d = parseInt(arr[2]);
                }
                
                that.Backspace(n, d, function() {
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
        this.OutPut(this.instance);
    }
}
Typewriter.prototype.OutPut = function(letters) {
    /* TODO:
        - Add option to change delay/type-speed on instance-level
        - Add algorithm for delay/type-speed (eg. easeing, swing, ...)
    */
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
Typewriter.prototype.Backspace = function(n, d, complete) {
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
        }, d || that.removeDelay || that.delay || 400);
    }
}
Typewriter.prototype.Repeat = function() {
    if (this.str.length == 0) $(this).trigger('Typewriter.Done');
    if (this.repeat != false && this.str.length == 0) {
        this.str = this.origin.slice();
        this.marker.siblings().remove();
    }
}
Typewriter.prototype.loadCommands = function(arr, start) {
    if (!start) start = false;
    this.origin = arr.slice();
    if(start) this.Start();
}