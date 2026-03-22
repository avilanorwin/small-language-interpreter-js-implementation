# Small Language Interpreter (JavaScript Implementation)

An experimental project that demonstrates how a simple programming language interpreter can be implemented in JavaScript. The codebase is intentionally kept concise, with minimal error handling, to highlight the core interpreter concepts—tokenization, parsing, and execution—without unnecessary complexity.

This project was developed around **2016–2017** as part of early exploration into **compiler and interpreter design**.

---

## Live Demo

👉 https://avilanorwin.github.io/small-language-interpreter-js-implementation/

> Open the link and try the sample script below.

---

## Overview

This interpreter processes a custom scripting language using a **top-down design approach**:

1. Tokenization  
2. Parsing (BNF-based)  
3. Execution  

Supported features:
- Variables (A–Z, case insensitive)
- Arithmetic expressions
- `print`
- `if`
- `for`

---

## Interpreter Design Diagrams

### 🔹 Overall Top-down Design

```mermaid
flowchart TD
    I[Interpreter]
    I --> T[Tokenizer]
    I --> EP[ExpressionParser]
    I --> F[Functions]
    I --> S[Stack]
    I --> V[Variables]
```

---

### Tokenizer Module

```mermaid
flowchart TD
    T[Tokenizer]
    T --> GT[getToken]
    T --> PT[putbackToken]
    T --> GTT[getTokenType]
```

---

### Expression Parser Module

```mermaid
flowchart TD
    EP[ExpressionParser]
    EP --> EE[evaluateExpression]
    EP --> PT[processTerm]
    EP --> PF[processFactor]
    EP --> PP[processPrimitive]
    EP --> T[Tokenizer]
```

---

### Expression Evaluation Flow

```mermaid
flowchart TD
    A[processAssignment] --> B[evaluateExpression]
    B --> C[processTerm]
    C --> D[processFactor]
    D --> E[processPrimitive]
```

---

### Functions Module

```mermaid
flowchart TD
    F[Functions]
    F --> PR[processPrint]
    F --> PI[processIf]
    F --> PFOR[processFor]
    F --> PFN[processForNext]
    F --> T[Tokenizer]
```

---

### Script Processing Flow

```mermaid
flowchart TD
    A[Source Script] --> B[Tokenizer]
    B --> C{Token Type}
    C -->|Function| D[Execute Function]
    C -->|Expression| E[Evaluate Expression]
    D --> P[print]
    D --> IF[if]
    D --> FOR[for]
    E --> V[Variables Table]
    E --> S[Stack]
```

---

## Language Specification

### Variables
Use single-letter variables, case insensitive. The interpreter supports up to 26 variables (A–Z).

Example:
```
A = 100;
```

---

### Functions

Supports only 3 functions:

#### print
```
print "Hello, world";
print <variable>;
print <variable>, <string>, ...
```

---

#### for
```
for (i = <initial value> to <limit>) {
    <expression>;
    <statement>;
}
```

Example:
```
for (i = 0 to 5) {
    print "value of i: ", i;
}
```

---

#### if
```
if (<expression>) {
    <expression>;
    <statement>;
}
```

Supported operators:
```
=, <, >
```

---

### Error Handling

The interpreter does not implement robust error checking in order to keep the code small and focused. If a syntax error is encountered, behavior is undefined and may cause unresponsiveness.

---

## Execution Flow

1. Tokenize the script:
   - Function
   - Quoted string
   - Variable
   - Expression  

2. Execute function if encountered (`print`, `if`, `for`)

3. Evaluate expressions:
   - Variable assignment  
   - Conditional logic  
   - Mathematical expressions  

4. Uses:
   - Stack  
   - Variable table  

---

## Try Sample Script

Paste this into the live demo:

```
print "This script prints hello world 10 times";

for (i = 1 to 10) {
    print i, "Hello world!";
}

A = 5;
B = 10;

if (A < B) {
    print "A is less than B";
}
```

---

## Run Locally

```
git clone https://github.com/avilanorwin/small-language-interpreter-js-implementation.git
cd small-language-interpreter-js-implementation
open index.html
```

---

## Key Concepts Demonstrated

- Tokenization  
- Recursive descent parsing  
- Expression evaluation  
- Control flow implementation  
- Stack-based execution  

---

## Historical Context

This project represents an early-stage exploration into interpreter design and language processing.

