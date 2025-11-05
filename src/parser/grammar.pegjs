{{

const plugins = {
    watts: {
        help: "Help string",
        function: (params) => {
            if (params.volts === undefined || params.amps === undefined) {
                throw new Error("Function: watts: volts and amps parameters must be defined");
            }
            
            return params.volts * params.amps;
        }
    }
}

}}

start = addsub


addsub = left:multdiv right:(("-" / "+") multdiv)* {
    const result = right.reduce((acc, value) => {
        return acc + (value[0] === "+" ? value[1]: (-1 * value[1]));
    },
    left);
    
    return result;
}

multdiv = left:exponent right:(("/" / "*") exponent)* {
    const result = right.reduce((acc, value) => {
        return (value[0] === "*" ? acc * value[1]: acc / value[1]);
    }   
    , left);

    return result;
}

exponent = left:negation right:("^" negation)* {
    const result = right.reduce((acc, value) => {
        return acc ** value[1];
    }
    , left); 

    return result;
}

negation = "-" right:function {
    return -1.0 * right;
}
/ function;

function = fname:[a-zA-Z]+ "(" paramName:[a-zA-Z]+ "=" paramValue:addsub restParams:("," [a-zA-Z]+ "=" addsub)*  ")" {
    let params = {};
    params[paramName.join("")] = paramValue;
    
    if (restParams !== null) {
    
        for (const restParam of restParams) {
            params[restParam[1].join("")] = restParam[3];
        }
    
    }
    
    return plugins[fname.join("")].function(params);
}
/ primary

primary = "(" value:addsub ")" { return value; }
/ number 

number = integer:digits decimal:("." digits)? {
    if (decimal) {
        return parseFloat(integer.join("") + decimal[0] + decimal[1].join(""));
    } else {
        return parseFloat(integer.join(""));
    }
} 
/ decimal:("." digits) {
    return parseFloat("0" + decimal[0] + decimal[1].join(""));
}

digits = [0-9]+
