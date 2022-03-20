// promisified function with async/await sugar    
async function timer() {
    const promiseTimer = t => new Promise(res => setTimeout(res, t));
    console.time('t0');
    console.time('t1');
    await promiseTimer(3000)

    console.log('timer 1');
    console.timeEnd('t1');
    console.time('t2');
    await promiseTimer(4000);

    console.log('timer 2');
    console.timeEnd('t2');
    console.time('t3');
    await promiseTimer(5000);

    console.log('timer 3');
    console.timeEnd('t3');
    console.timeEnd('t0');
    console.log('Финиш');
};

timer();

// bonus
async function cons() {
    console.log(1);
    (async() => { 
        console.log(2); 
        console.log(3)})()
    .then(x => console.log(x));
    console.log(4)
};

cons();