//-----------------------------------------------
//
// Simple Languaguage Interpreter
// Author: Norwin Avila
// Date  : 10/4/2016
//
//-----------------------------------------------

function processPrint(program, console) {
    var token = getToken(program);
    var tokenType = getTokenType(token);
    var returnValue = 0;

    while (token != ";") {
        switch (tokenType) {
            case STRING:
                console.output += token;
                break;
            case NUMBER:
            case VARIABLE:
                putbackToken(program, token);
                var result = evaluateExpression(program);
                console.output += result;
                break;
            case DELIMETER:
                if (token == ",") {
                    console.output += "&nbsp;";   
                }
                break;
            default: //syntax error
                returnValue = -1;
                break;
        }
        
        token = getToken(program);
        tokenType = getTokenType(token);
    }
    console.output += "<br/>";
    document.getElementById("console").innerHTML = console.output;
    return returnValue;
}

function processIf(program) {
    var leftValue = 0;
    var rightValue = 0;
    var condition = "";
    var conditionResult = false;

    var token = getToken(program);
    
    if (token != "(") {
        return  -1; //syntax error
    } 
    
    leftValue = evaluateExpression(program);
    
    condition = getToken(program);
    if ("^[<>=]{1,1}$".match(condition) == false) {
        return -1 // syntax error
    }
    
    rightValue = evaluateExpression(program);
    
    switch(condition) {
        case "=":
            if (leftValue == rightValue) 
                conditionResult = true;
            break;
        case "<":
            if (leftValue < rightValue) 
                conditionResult = true;
            break;
        case ">":
            if (leftValue > rightValue) 
                conditionResult = true;
            break;
    }

    if (conditionResult == true) {
        token = getToken(program);
        if (token != ")") {
            return -1; //syntax error
        }

        token = getToken(program);
        if (token != "{") {
            return -1; //syntax error
        }
    } else {
        while (token != "}") {
            token = getToken(program);
        }
    }
    return 0;
}

function processFor(program) {
    var loopAddress = new Object
    loopAddress.loopVariable = "";
    loopAddress.limitValue = 0;

    var token = getToken(program);
    if (token != "(") {
        return -1; //syntax error   
    }
    
    var varName = getToken(program);
    if (getTokenType(varName) != VARIABLE) {
        return -1; //syntax error   
    }
    
    token = getToken(program);
    if (token != "=") {
        return -1; //syntax error   
    }
    
    var varValue = evaluateExpression(program);
    putVariableValue(varName, varValue);
    loopAddress.loopVariable = varName;
    
    token = getToken(program);
    if (token != "to") {
        return -1;
    }
    
    loopAddress.limitValue = evaluateExpression(program);
    token = getToken(program);
    if (token != ")") {
        return -1;   
    }
    token = getToken(program);
    if (token != "{") {
        return -1;
    }
    if (varValue < loopAddress.limitValue) {
        loopAddress.programIndex = program.index;
        pushStack(forStack, loopAddress);
    } else {
        token = getToken(program);
        while (token != "}") {
            token = getToken(program);   
        }
    }
}

function processForNext(program) {
    var loopAddress = popStack(forStack);
    var iterationValue = getVariableValue(loopAddress.loopVariable);
    if ( iterationValue < loopAddress.limitValue) {
        iterationValue++;
        putVariableValue(loopAddress.loopVariable, iterationValue);
        program.index = loopAddress.programIndex;
        pushStack(forStack, loopAddress);
    }
}