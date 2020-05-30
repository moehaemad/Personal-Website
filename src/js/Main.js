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

// menuItem.addEventListener('click', toggleMenu);