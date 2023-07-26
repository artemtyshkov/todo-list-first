const btn = document.querySelector('button');
const popup = document.querySelector('.popup');

btn.addEventListener('click', () => {
    popup.classList.toggle('show');
});
