// async composition of functions with Promises
const checkAge = age => new Promise((res, rej) => age < 18 ? rej('You are too young') : res('Welcome'));
checkAge(17).then(result => console.log(result)).catch(error => console.log(error));