/*Déclaration de nos variables :*/
const container = document.getElementById('container');
const loginButton = document.getElementById('login');
const signUpButton = document.getElementById('signUp');

/*Changement du cache vers la gauche :*/
signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
})

/*Changement du cache vers la droite :*/
loginButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
})
