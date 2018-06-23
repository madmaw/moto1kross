# Moto 1kross

Written before I found out that Motocross is motorcycles on a dirt track, not cars on a tarmac track. Unfortunately there's no oncoming motorcycle emoji, so here we are.

![Screenshot](motocross.png "Vrooom")

I made this for JS1K 2019 (although I made it in 2018, entries close in 2019 and I had some spare time) with the theme X - which works great with motoX. 

[Full playable build here](https://madmaw.github.io/moto1kross/) 

[1k version (kind of) here](https://madmaw.github.io/moto1kross/dist/)

## Build pipeline

I think most JS1K entries are crafted by hand, however I used a bunch of tools to help.

1. Typescript
2. Webpack (for testing and live reload)
3. Grunt (for most of the build)
4. Closure compiler (for minimisation)
5. [Reg Pack](https://siorki.github.io/regPack.html) (for more minification)

If you are doing a JS1K entry (particularly using TS) feel free to take a look at my Gruntfile and/or package.json, it might save you some time. 

To run type `npm run serve` and go to localhost:8080

## Minimisation tips

I'll try not to cover off things I've seen elsewhere...

### Use 9 instead of 10
When you are putting in constants, if you would have used 1000, put in 999 instead because it's shorter

### Work with Reg Pack as much as possible
Reg Pack works best when the same string appears multiple times. I noticed that one of my unicode characters ended with 97, so I use the numerical constant 97 in place of 100 (or 997 in place of 1000) a lot and it compresses down to 1 byte. 

Similarly I had to use .36 to make the hue roll around to its starting value so I used that instead of .5 for all my constants. 

### Closure Compiler as a preprocessor
Closure compiler will detect and remove dead code blocks, which means you can set flags in your code and have it remove them at compile time. This is invaluable as you approact 1024 kb as you can toggle features on/off to hit the limit. Unfortunately it doesn't have macros, so you can end up with lots of duplication in your code 


### Canvas setTransform and transform
I'd never used these methods before, but they're really powerful. If you find yourself using save(), restore(), rotate(), scale(), and translate() a lot, you might find that setTransform() and transform() can save you a lot of space. 

My original plan was to calculate the matrix multplications by hand and apply them all in one big call to setTransform() however this turned out to be more verbose than 3 individual calls to transform(). 

### Canvas globalCompositeOperation='destination-over' and clearRect
Because I wanted to apply each transformation from the viewer's centre point, I wanted to render my road from front to back, which is the exact opposite of the order the painters algorithm wants us to render our segments in. By changing the globalCompositeOperation to 'destination-over' and using clearRect I was able to draw only on the transparent parts of the screen. Obviously 'destination-over' is a fairly long string, but fortunately it contains 'ation' (as does requestAnimationFrame), so it's slightly less expensive than you'd think! 

### Canvas width/height
As much as I wanted to make a responsive web app, using constants (especially numbers you use elsewhere in your code) instead of canvas.width and canvas.height just saves too much space. Since a width and height of 97 would be too small, I went with 997 pixels for both. 

### Arrays are better than maps
Originally I started off using maps for vehicles and frames, however arrays, while less descriptive take up less space in the code. So

> rect = {
>    x: 0, 
>    y: 0, 
>    width: 1, 
>    height: 1
> }

vs

> rect = [0, 0, 1, 1];

Even with the closure compiler renaming the member variables (width/height) and using array accessors (rect[0]) the first one is still much more verbose. 

### Grunt to remove var declarations
The Closure Compiler works magic for compression, however it won't change local variables to global variables (as it shouldn't). Having done it by hand in my previous entry, and having turned my code into an unreadable mess, I decided to automate. I added a Grunt task to strip out any `var` declarations. 

### WTF is void 0?
Something (the Closure Compiler or TypeScript) sometimes puts in `void 0` when you have an undeclared variable. It's not consistent, but the way to get around it was to use a ternary for initialisation. 

> let b; /* = void 0*/
> if(x) {
>   b = 1;
> } else { 
>   b = 2
> }

works better with

> let b = x?1:2

### Limit calls to Math.random
You can get a lot of randomness out of one random number by multiplying it by different constants (and rounding it down or using bitwise operations, if you like). I managed to get away with calling Math.random() only one time

### Array initialization is much cheaper than calling push
Try to get as much stuff into your array initializers as possible, or call push/unshif/splice with as many varargs as you can 