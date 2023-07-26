const btn = document.querySelector('button');
const popup = document.querySelector('.popup');
const ul = document.querySelector('ul');
const input = document.querySelector('input');

btn.addEventListener('click', () => {
    popup.classList.toggle('show');
    ul.style.opacity = '0.3';

    if (!popup.classList.contains('show')) {
        ul.style.opacity = '';
    }
});

