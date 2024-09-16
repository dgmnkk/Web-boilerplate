const testModules = require('./test-module');
require('../css/app.css');

/** ******** Your code here! *********** */
const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('add-teacher');
const closeModalBtn = document.querySelector('.close-btn');

// Відкриття модального вікна при натисканні на кнопку
openModalBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
});

// Закриття модального вікна при натисканні на кнопку закриття
closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

const teacherCard = document.getElementById('teacherCard1');
const teacherModal = document.getElementById('teacherModal');
const closeTeacherModalBtn = document.querySelector('.close-btn-teacherModal');

// Відкриття модального вікна при натисканні на картку
teacherCard.addEventListener('click', () => {
    teacherModal.style.display = 'flex';
});

// Закриття модального вікна при натисканні на кнопку закриття
closeTeacherModalBtn.addEventListener('click', () => {
    teacherModal.style.display = 'none';
});
console.log(testModules.hello);

