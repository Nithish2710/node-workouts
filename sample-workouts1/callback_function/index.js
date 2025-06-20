// Callback function example
function person(name, age, call) {
    console.log(`Name: ${name}, Age: ${age}`);
    call(); // Calling the callback function
}
function greet(){
    console.log("Hello, welcome to the callback function example!");
}
// Calling the person function with a callback
person("Nithish", 22, greet);
