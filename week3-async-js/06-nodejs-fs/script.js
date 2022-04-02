// sync execute
fs.readFile('package.json');

// async with callback
fs.readFile('package.json', (error, value) => console.log(error || String(value)));

// async with promises
const prReadFile = util.promisify(fs.readFile);
prReadFile('package.json')
    .then(value => console.log(String(value)))
    .catch(error => console.log(error));

// async with promises 2
fs.promises.readFile('package.json')
    .then(value => console.log(String(value)))
    .catch(error => console.log(error));

// async/await
(async() => console.log(String(await fs.promises.readFile('package.json'))))();

// nodejs promisifation for functions with require('util').promisify
const prT1 = t => new Promise(res => setTimeout(res, t));
const prT2 = require('util').promisify(setTimeout);

(async() => {
    console.time('t0');

    console.time('t1');
    await prT1(3000);
    console.log('Завершен первый таймер');
    console.timeEnd('t1');

    console.time('t2');
    await prT1(2000);
    console.log('Завершен второй таймер');
    console.timeEnd('t2');

    console.time('t3');
    await prT2(5000);
    console.log('Завершен третий таймер');
    console.timeEnd('t3');

    console.timeEnd('t0');
})(); 