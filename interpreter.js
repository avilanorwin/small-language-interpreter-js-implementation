//-----------------------------------------------
//
// Simple Languaguage Interpreter
// Author: Norwin Avila
// Date  : 10/4/2016
//
//-----------------------------------------------
var program = new Object();
var console = new Object();
var STACK_LIMIT = 25;
var forStack = new Array(STACK_LIMIT);
var stackTop = 0;
var variables = [
    0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0
];

function interpreter() {
    var token = "";
    program.index = 0;
    program.src = document.getElementById("editor").value;
    console.output = "";
    token = getToken(program);
    
    while (token != null) {
        
        switch(getTokenType(token)) {
            case PRINT:
                processPrint(program, console);
                break;
            case IF:
                processIf(program);
                break;
            case FOR:
                processFor(program);
                break;
            case VARIABLE:
                var varName = token;
                var varValue = processAssignment(program);
                putVariableValue(varName, varValue);
                break;
            case END_BLOCK:
                if (!isStackEmpty(forStack)) {
                    processForNext(program);   
                }
                break;
        }
        
        token = getToken(program);
    }
}

function getVariableValue(varName) {
    var varIndex = varName.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0);
    var varValue = variables[varIndex];

    if (!isNaN(varValue)) {
        return parseInt(varValue, 10);
    }

    return varValue;
}

function putVariableValue(varName, varValue) {
    var varIndex = varName.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0);
    variables[varIndex] = varValue;
}

function pushStack(stack, value) {
    if (stackTop < STACK_LIMIT) {
        forStack[stackTop] = value;
        stackTop++;
    }
}

function popStack(stack) {
    var returnValue = null;
    if (stackTop > 0) {
        stackTop--;
        returnValue = forStack[stackTop];
    }
    return returnValue;
}

function isStackEmpty(stack) {
    return stackTop == 0;
}