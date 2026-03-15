let greeter = (firstName: string, lastName: string): string => {
    return `Hello, ${firstName} ${lastName}`;
};

let firstName: string = "Khalid";
let lastName: string = "Wasim";

console.log(greeter(firstName, lastName));