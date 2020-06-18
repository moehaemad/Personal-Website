import axios from 'axios';

var UImodule = (function(){
    return{
        DOMvalues:{
        btn: {select: '.cgr-button', url: 'https://github.com/moehaemad/CGR-Project'},
        res: {select: '#resume', url: 'resources/Muhammad Ali.pdf'},
        git: {select: '#github', url: 'https://github.com/moehaemad'}
        }
    }
})();

var controller = (function(ui){
    var redirect = function(url){
        window.open(url);
    };
    var setupListeners = function(){
        document.querySelector(ui.btn.select).addEventListener('click', 
        redirect(ui.btn.url));
    };

    return {
        init: function(){
        setupListeners();}
    }
})(UImodule);


const menuBtn = document.querySelector('.menu-btn');
const menuItem = document.querySelector('.menu-nav__link');
const hamburger = document.querySelector('.menu-btn__burger');
const nav = document.querySelector('.nav');
const menuNav = document.querySelector('.menu-nav');

function toggleMenu(){
    hamburger.classList.toggle('open');
    nav.classList.toggle('open');
    menuNav.classList.toggle('open');
}

menuBtn.addEventListener('click', toggleMenu);

// document.getElementById('contact-send').addEventListener('click', async e => {
//     let mailResponse = await axios.post('/sendMail');
//     console.log(mailResponse);
// });

document.getElementById('contact-send').addEventListener('click', e=>{
    const email = document.getElementById('contact-email').value;
    const name = document.getElementById('contact-name').value;
    const subject = document.getElementById('contact-message').value;
    // if (email === "" || name === "" || subject === "") window.alert('Please finish filling form')
    console.log(e.target.parentNode.childNodes);
    console.log(email);
    console.log(name);
    console.log(subject);
})