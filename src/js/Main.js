import axios from 'axios';
import ReactDom from 'react-dom';
import React from 'react';
import App from '../SimpleGenerator/Containers/App';

try {
    ReactDom.render(
        <App/>,
        document.getElementById('root')
    );
}catch(e){
    console.log(`everything's fine, no react module available error is`);
    console.log(e);
}

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


/* const menuBtn = document.querySelector('.menu-btn');
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
document.getElementById('front-page').addEventListener('click', toggleMenu); */
// document.querySelector('.menu-nav__link').addEventListener('click', toggleMenu);

document.getElementById('contact-send').addEventListener('click', async e => {
    e.preventDefault();
    let email = document.getElementById('contact-email').value;
    let name = document.getElementById('contact-name').value;
    let subject = document.getElementById('contact-message').value;

    if (email === "" || name === "" || subject === ""){
        return null;
    };

    let mailResponse = await axios.post('/sendMail', {email, name, subject});
    console.log(mailResponse);
});