let list = document.querySelectorAll('ul li');
let btn = document.querySelector('button');

list[1].style.color = 'blue';

function listToUpperCase() {
    list.forEach(item => item.textContent = item.textContent.toUpperCase());

    setTimeout(() => {
        // dispatchEvent - вызывает событие
        btn.dispatchEvent(new MouseEvent('click'))
    }, 2000)
};

// переопределение event.target на t
btn.addEventListener('click', ({ target: t }) => t.textContent = 'Новый текст 🙂👍');

window.addEventListener('load', listToUpperCase);