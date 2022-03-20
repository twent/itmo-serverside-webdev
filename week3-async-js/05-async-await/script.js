// promise vs callback hell
const promiseTimer = t => new Promise(res => setTimeout(res, t));
console.time('t0');
console.time('t1');
promiseTimer(3000)
    .then(() => {
        console.log('timer 1');
        console.timeEnd('t1');
        console.time('t2');
        return promiseTimer(4000); 
    })
    .then(() => {
        console.log('timer 2');
        console.timeEnd('t2');
        console.time('t3');
        return promiseTimer(5000);
    })
    .then(() => {
        console.log('timer 3');
        console.timeEnd('t3');
        console.timeEnd('t0');
        return 'Финиш';
    })
    .then((x) => {
        console.log(x); 
    });

