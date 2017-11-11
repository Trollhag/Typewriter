function Typewriter(arg) {
    this.options = Object.assign({
      target: 'Typewriter',
      loop: true,
      typespeed: 300,
      autostart: true,
      marker: true
    }, arg);
    this.target = document.getElementById(this.options.target);
    var textContainer = document.createElement('SPAN');
    this.target.appendChild(textContainer);
    if (this.options.marker) {
        var marker = document.createElement('SPAN');
        marker.textContent = '|';
        marker.className = 'typewriter-marker';
        this.target.appendChild(marker);
    }
    this.target = textContainer;
    this._queue = [];
    this._pointer = 0;
  }
  Typewriter.prototype = {
    type: function() {
      var arg = Array.prototype.slice.call(arguments);
      arg.unshift('Type');
      this._queue.push(arg);
      if (this.options.autostart && !this.parsing) this._parse();
      return this;
    },
    wait: function() {
      var arg = Array.prototype.slice.call(arguments);
      arg.unshift('Wait');
      this._queue.push(arg);
      if (this.options.autostart && !this.parsing) this._parse();
      return this;
    },
    backspace: function() {
      var arg = Array.prototype.slice.call(arguments);
      arg.unshift('Backspace');
      this._queue.push(arg);
      if (this.options.autostart && !this.parsing) this._parse();
      return this;
    },
    start: function() {
      if (!this.parsing) {
        this.stopped = false;
        this._parse();
      }
    },
    stop: function(force) {
      this.parsing = false;
      this.stopped = true;
      if (force) clearTimeout(this._timeout);
    },
    _parse: function() {
      if (!this.options.loop && this._pointer === this._queue.length) {
        this.parsing = false;
      }
      else {
        if (this.parsing && this._pointer === this._queue.length && this.options.loop) this._pointer = 0; 
        this.parsing = true;
        var next = this._queue[this._pointer++].slice();
        this['_do' + next.shift()].apply(this, next);
      }
    },
    _applyTempOptions: function(arg) {
      return Object.assign(this.options, arg);
    },
    _doWait: function(time, options) {
      options = this._applyTempOptions(options);
      this._timeout = setTimeout(function() {
        this._parse();
      }.bind(this), time);
    },
    _doBackspace: function(times, options) {
      options = this._applyTempOptions(options);
      var index = 0;
      function iterate() {
        var str = this.target.textContent;
        if (typeof times === "string" && times.toLowerCase() === "all") times = str.length;
        if (str.length >= times - index) {
          this.target.textContent = str.slice(0, -1);
        }
        index++;
        if (index < times) {
          if (!this.stopped) this._timeout = setTimeout(function() {
            iterate.call(this);
          }.bind(this), options.typespeed);
        }
        else {
          this._parse();
        }
      }
      iterate.call(this);
    },
    _doType: function(str, options) {
      options = this._applyTempOptions(options);
      var index = 0;
      str = str.split('');
      this.parsing = true;
      function iterate() {
        if (str.length > index) {
          this.typing = true;
          this.target.textContent += str[index];
          index++;
          if (index < str.length) {
            this._timeout = setTimeout(function() {
              iterate.call(this);
            }.bind(this), options.typespeed);
          }
          else {
            this._parse();
          }
        }
      }
      iterate.call(this);
    }
  }