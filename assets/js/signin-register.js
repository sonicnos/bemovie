
// let formSignup = document.querySelector('#modal-signup form.signup')
// let signup_btn = document.querySelector('.signup_btn')

// let eml_verif= /^\S+@\S+\.\S+$/;

// signup_btn.addEventListener('click', ()=>{
//     console.log('|||||||||||| submit signup |||||||||||||');

//     if (formRegister.password.value.match(eml_verif) != null) {
//         console.log(`Username: ${formRegister.username.value}`);
//         console.log(`Password: ${formRegister.password.value}`);
//     } else {
//         console.log("");
//     }
// })



let formRegister = document.querySelector('#modal-register form.register');
let register_btn = document.querySelector('.register_btn');

register_btn.addEventListener('click', ()=>{
    console.log('|||||||||||| submit register |||||||||||||');
    
    console.log(`Username: ${formRegister.username.value}`);
    console.log(`Password: ${formRegister.password.value}`);
    console.log(`Remember: ${formRegister.remember.value}`);
    alert(`Welcome ${formRegister.username.value}`)
})