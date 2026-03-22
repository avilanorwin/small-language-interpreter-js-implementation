//-----------------------------------------------
//
// Simple Languaguage Interpreter
// Author: Norwin Avila
// Date  : 10/4/2016
//
//-----------------------------------------------
var VARIABLE = 1;
var DELIMETER = 2;
var STRING = 3;
var NUMBER = 4;
var PRINT = 5;
var IF = 6;
var FOR = 7;
var END_BLOCK = 8;
var END_PROGRAM = 9;

var STR_DELIMETER = "(){}=+-/*<>;,";

function getToken(program) {
    var nextToken = null;
    var tmpTok = "";
    

    if (program.index < program.src.length) {
    
        while (program.src.charAt(program.index) == ' ' ||
               program.src.charAt(program.index) == '\n' ) 
            program.index++;

        if (STR_DELIMETER.indexOf(program.src.charAt(program.index)) >= 0) {
            nextToken = program.src.charAt(program.index++);
        } else if (program.src.charAt(program.index) == '"') {
            var tmpTok = "";
            program.index++;
            while (program.src.charAt(program.index) != '"') {
                tmpTok += program.src.charAt(program.index);   
                program.index++;
            }
            program.index++;
            nextToken = tmpTok;
        } else {
            while (program.src.charAt(program.index) != ' ' &&
                   STR_DELIMETER.indexOf(program.src.charAt(program.index)) < 0) {
                tmpTok += program.src.charAt(program.index);
                program.index++;
            }
            nextToken = tmpTok;
        }
    }
    
    return nextToken;
}

function putbackToken(program, token) {
    for (var i=0; i<token.length; i++)
        program.index--;
}

function getTokenType(token) {
    var token_type;

    switch (token) {
        case "print":
            token_type = PRINT;
            break;
        case "for":
            token_type = FOR;
            break;
        case "if":
            token_type = IF;
            break;
        case "}":
            token_type = END_BLOCK;
            break;
        case null:
            token_type = END_PROGRAM;
            break;
        default:
            if (token.toString().match("^[A-Za-z]{1,1}$")) {
                token_type = VARIABLE;   
            } else if (token.toString().match("^[0-9]+$")) {
                token_type = NUMBER;
            } else if (STR_DELIMETER.indexOf(token) >= 0) {
                token_type = DELIMETER;   
            } else {
                token_type = STRING;   
            }
            break;
    }
    return token_type;
}