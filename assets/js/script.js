const searchBar = document.getElementById('search-bar');
const submitBtn = document.getElementById('submit-btn');
const resultsDisplayValue = document.querySelector('.search-bar-value');
const modal = document.querySelector("#modal-register");
const closeModal = document.querySelector(".close-button");
const registerBtn = document.querySelector(".open-button-register");


submitBtn.addEventListener ('click', (e) => {
    e.preventDefault;
    resultsDisplayValue.innerText = searchBar.value;
});

registerBtn.addEventListener("click", (e) => {
    modal.showModal();
    console.log('works register');
  });

closeModal.addEventListener("click", () => {
    modal.close();
  });