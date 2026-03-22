//-----------------------------------------------
//
// Simple Languaguage Interpreter
// Author: Norwin Avila
// Date  : 10/4/2016
//
//-----------------------------------------------

function processAssignment(program) {
    var result = 0;
    var token = getToken(program);
    
    if (token != "=") {
        result = null;
    } else {
        result = evaluateExpression(program);
    }
    return result;
}

function evaluateExpression(program) {
    var token = getToken(program);
    var result = new Object();
    
    result.value = token;
    
    token = processTerm(program, result);
    
    putbackToken(program, token);

    return result.value;
}

function processTerm(program, result) {

    var nextToken = processFactor(program, result);
    
    while (nextToken == "+" || nextToken == "-") {
        
        var firstOperand = result.value;
        var operator = nextToken;
        var token = getToken(program);
        var secondOperand = new Object();
        
        secondOperand.value = token;
        
        nextToken = processFactor(program, secondOperand);
        
        result.value = compute(firstOperand, secondOperand.value, operator);
    }
    return nextToken;
}

function processFactor(program, result) {
    
    var nextToken = processPrimitive(program, result);
    
    while (nextToken == "*" || nextToken == "/") {
        
        var firstOperand = result.value;
        var operator = nextToken;
        var token = getToken(program);
        var secondOperand = new Object();
        
        secondOperand.value = token;
        
        nextToken = processPrimitive(program, secondOperand);

        result.value = compute(firstOperand, secondOperand.value, operator);
    }
    return nextToken;
}

function processPrimitive(program, result) {
    var nextToken = getToken(program);
    if (getTokenType(result.value) == VARIABLE) {
        result.value = getVariableValue(result.value);
    }
    
    return nextToken;
}

function compute(firstOperand, secondOperand, operator) {
    var result = 0;
    
    switch (operator) {
        case '+':
            result = parseInt(firstOperand) + parseInt(secondOperand);
            break;
        case '-':
            result = parseInt(firstOperand) - parseInt(secondOperand);
            break;
        case '*':
            result = parseInt(firstOperand) * parseInt(secondOperand);
            break;
        case '/':
            result = parseInt(firstOperand) / parseInt(secondOperand);
            break;
    }
    return result;
}
