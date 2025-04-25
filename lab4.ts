// 2.Создать промис myPromise, который через 3 секунды генерирует случайное число.
let myPromise = new Promise((resolve) => {
    setTimeout(() => {
        resolve(Math.floor(Math.random() * 100));
    }, 3000);
});

myPromise.then((number) => console.log('Сгенерировано число:', number));


// 3.Создать функцию, которая принимает параметр delay и возвращает промис 
function createPromiseWithDelay(delay = 5000) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(Math.floor(Math.random() * 5));
        }, delay);
    });
}

// 4.Что будет выведено в консоль и почему? Что возвращают методы then и catch?
let pr = new Promise((res, rej) => {
    rej('ku');
});

pr
    .then(() => console.log(1))
    .catch(() => console.log(2)) 
    .catch(() => console.log(3)) 
    .then(() => console.log(4))
    .then(() => console.log(5));

// 5.Создайте промис, который выполнился усfпешно, результат выполнения промиса число 21
let numberPromise = Promise.resolve(21);

numberPromise
    .then((result) => {
        console.log(result);
        return result * 2;
    })
    .then((result) => console.log(result));


// 6.Предыдущую задачу реализуйте при помои синтаксиса async/await
async function processNumber() {
    const result = await Promise.resolve(21);
    console.log(result);
    console.log(result * 2);
}

processNumber();

/*//7
let promise = new Promise((res, rej) => {
    res('Resolved promise -1')
})

promise
    .then((res) => {
        console.log("Resolved promise -2 ")
        return "OK"
    })
    .then((res) => {
        console.log(res)
    })


Resolved promise - 1
OK


//8
let promise = new Promise((res, rej) => {
    res('Resolved promise - 1')
})

promise
    .then((res) => {
        console.log(res)
        return "OK"
    })
    .then((res1) => {
        console.log(res1)
    })



Resolved promise - 1
OK



//9
let promise = new Promise((res, rej) => {
    res('Resolved promise - 1')
})
promise
    .then((res) => {
        console.log(res)
        return res
    })
    .then((res1) => {
        console.log('Resolved promise - 2')
    })



Resolved promise - 1
Resolved promise - 2




//10
let promise = new Promise((res, rej) => {
    res('Resolved promise - 1')
})
promise
    .then((res) => {
        console.log(res)
        return res
    })
    .then((res1) => {
        console.log(res1)


Resolved promise - 1
Resolved promise - 1







//11
        let promise = new Promise((res, rej) => {
            res('Resolved promise - 1')
        })
        promise
            .then((res) => {
                console.log(res)
            })
            .then((res1) => {
                console.log(res1)
            })



Resolved promise - 1
undefined





//12
        let pr = new Promise((res, rej) => {
            rej('ku')
        })
        pr
            .then(() => console.log(1))
            .catch(() => console.log(2))
            .catch(() => console.log(3))
            .then(() => console.log(4))
            .then(() => console.log(5))
            
2
4
5            
            
            
            
            
            
            
            
            
            
            
            
            */