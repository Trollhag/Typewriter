# Typewriter.js

A small library to output text in html. Without dependencies.

## Documentation

#### Usage

```javascript
var TW = new Typewriter({options}).type("Typewriter"[, {options}]);
```

#### Options - Name : Type - Default

  **target** : string - **Typewriter**<br/>
  Target element ID

  **loop** : bool - **true**<br/>
  Loop the instance or stop when done

  **typespeed** : int - **300**<br/>
  Delay (ms) between each "keystroke"

  **autostart** : string - **true**<br/>
  Start on init

  **marker** : bool - **true**<br/>
  Append a graphic blinking text marker after the text

#### Methods

.type(**String** : string [, {options}])<br/>
Output text

.wait(**Time** : int [, {options}])<br/>
Delay next item in queue

.backspace(**Strokes** : mixed [, {options}])<br/>
Remove from outputed text<br/>
*Strokes as int = Amount of characers to remove*<br/>
*Strokes as "All" : string = Removes all outputed characers*

.start()<br/>
Start typing

.stop([**Force** : bool])<br/>
Stop typing<br/>
*Will stop after next timeout is cleared*<br/>
*If force is true it will stop immediately, it is not recommended to start again after this*

## Contributing

You are welcome to contribute via pull requests; fork the repository, make your changes and submit a pull request.

## License

Copyright (c) 2017 Oscar Trollhag

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.