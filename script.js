const container = document.querySelector('.container');
const showModal = document.querySelectorAll('.show-modal');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const modalBox = document.querySelector('.modal-box');
const modalCross = document.querySelector('.modal-cross');

for (let i = 0; i < showModal.length; i++)
  showModal[i].addEventListener('click', function () {
    modal.classList.remove('hidden');
  });
modalCross.addEventListener('click', function () {
  modal.classList.add('hidden');
});
overlay.addEventListener('click', function () {
  modal.classList.add('hidden');
});
document.addEventListener('keydown', function (e) {
  if (
    e.key === 'Escape' &&
    !modal.classList.contains('hidden')
  ) {
    modal.classList.add('hidden');
  }
});
