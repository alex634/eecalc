# eecalc
An expression calculator programmed in ReactJS with the capability of being extended using custom user functions. 

## Preface

I made this calculator to practice React and Javascript before an interview I had. This project isn't supposed to be production ready both from a UI standpoint and a functionality standpoint. That being said, it seems to function very well. It doesn't seem to give bad values with the exception that "Infinity" is returned instead of "Undefined" when dividing by zero.

## How to Use

### Launching the Calculator

Launching the calculator is pretty simple. Enter the `eecalc` directory inside of a terminal. Then execute `npm install`. Finally, execute `npm run dev` and it should launch the calculator. Numerical expressions with **-**, **+**, **\***, and **/** operators are supported. Functions in the form **fname(param1=234.324,param2=(234*923.23^8))** are also supported. Functions can take the result of functions as parameters as well. 

### Adding Functionality

Functions can be added to this calculator through the grammar definition file (`eecalc/src/parser/grammar.pegjs`). You do not need to know how to write a grammar to add new functions.

At the top of the file, you will see this:

```javascript
const plugins = { 
    watts: {
        help: "Help string",
        function: (params) => {
            if (params.volts === undefined || params.amps === undefined) {
                throw new Error("Function: watts: volts and amps parameters must be defined");            }
    
            return params.volts * params.amps;
        }
    }
}
```

To add a new function, you must add it to the `plugins` object. First make a dictionary key with the name of your function. This can only have upper and lowercase letters in it. No spaces, underscores, or special symbols of any kind are allowed.

Within the new object you just created make a key titled: **"function"**. Your function must be defined under this key. This function must only take one parameter: `params`. This is an object with keys representing the names of the parameters passed. These are whatever have been passed by the user. You are not required to always take in the same amount of parameters. For example, you could have someone pass in **x** and **y** and then the function would solve for **z** in an equation. There are a lot of ways variable parameter counts could be made use of. Just tinker around and see what you can do.
