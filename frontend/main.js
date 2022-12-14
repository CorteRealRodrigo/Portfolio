import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './assets/css/style.css';
// Estou utilizando o JavaScript o mais puro possível, para poder estar pegando bem a base da linguagem.
// navbar inicio 
const navbar = document.querySelector('.navbar');
const menu = document.querySelector('.menu');
const menuBtnClose = document.querySelector('.menu-btn-close');
const menuBtn = document.querySelector('.menu-btn');
const scrollUpBtn = document.querySelector('.scroll-up-btn');
// Máquina de escrever mais info
const maisInfo = document.querySelector('.info');
// Sessão Projetos
const item = document.querySelector('.height');
// animações scroll
const target = document.querySelectorAll('[data-anime]');
// Div projetos
const container = document.querySelector('.container');

// Para que uma função espere um tempo para ser ativada novamente
const debounce = function(func, wait, immediate) {
    let timeout;
    return function(...args) {
        const context = this;
        const later = function () {
            timeout = null;
            if(!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if(callNow) func.apply(context, args);
    };
};

// navbar inicio / btn subir ao topo / menu mobile / animatção
window.addEventListener('scroll', debounce( () => {
    animeScroll()
    if(scrollY > 20) {
        navbar.classList.add('sticky');
    }else{
        navbar.classList.remove('sticky'); 
    }
    if(scrollY) {
        menu.classList.remove('active');
        menuBtn.classList.remove('close');
        menuBtnClose.classList.add('close');
        menuBtnClose.style.display = "none";
    }
    if(scrollY > 500) {
        scrollUpBtn.classList.add('show');
    }else{
        scrollUpBtn.classList.remove('show');
    }
}, 0.8)); // 0.8 é o tempo que o debounce vai ser ativado

// animações scroll
function animeScroll() {                 
    const windowTop = window.pageYOffset + ((window.innerHeight/*Tamanho da tela*/ * 3) / 4); // Para pegar o numero do scroll da página
    target.forEach(function(element) {
        if((windowTop) > element.offsetTop) {
            element.classList.add('animate');
        } else{
            element.classList.remove('animate');
        }
    })
}

// Máquina de escrever - cdnj.com
var typed = new Typed(".typing", {
    strings:["Desenvolvedor","Full Stack"],
    typeSpeed:100,
    backSpeed:60,
    loop:true
});
var typed = new Typed(".typing-2", {
    strings:["Desenvolvedor","Full Stack"],
    typeSpeed:100,
    backSpeed:60,
    loop:true
});

// menu mobile / máquina de escrever / Sessão Projetos
window.addEventListener('click', (e) => {
    const el = e.target;
    if(el.classList.contains('out')) {
        menuBtnClose.style.display = "block";
        menu.classList.add('active');
        menuBtn.classList.add('close');
        menuBtnClose.classList.remove('close');
    }
    if(el.classList.contains('exit')) {
        menuBtnClose.style.display = "none";
        menu.classList.remove('active');
        menuBtn.classList.remove('close');
        menuBtnClose.classList.add('close');
    }
// máquina de escrever mais info
    if(el.classList.contains('mais-info')) {
        typewriter();
    }

// Sessão Projetos
    const heightDiv = item.clientHeight;
    if(el.classList.contains('see')) {
        container.style.height = "1000px";
        el.innerHTML = 'Ver menos';
        el.classList.remove('see');
        el.classList.add('smaller');

    } else if(el.classList.contains('smaller')){     
        if (heightDiv === 446) {
            container.style.height = "450px";
            btnSee(el);
        }
        if (heightDiv === 346) {
            container.style.height = "350px";
            btnSee(el);
        }
        if (heightDiv === 246) {
            container.style.height = "250px";
            btnSee(el);
        }
        function btnSee(el) {
            el.innerHTML = 'Ver mais';
            el.classList.remove('smaller');
            el.classList.add('see');
        }
    } 
    // Só usei esse método, pois não consegui pegar a div filho, pretendo estar resolvendo isso, pois sei que dessa forma não é uma boa prática.
    if(el.classList.contains('p1')) {
        blockInfo('.d1');
    }else{
        noneInfo('.d1');
    }
    if(el.classList.contains('p2')) {
        blockInfo('.d2');
    }else{
        noneInfo('.d2');
    }
    if(el.classList.contains('p3')) {
        blockInfo('.d3');
    }else{
        noneInfo('.d3');
    }
    if(el.classList.contains('p4')) {
        blockInfo('.d4');
    }else{
        noneInfo('.d4');
    }
    if(el.classList.contains('p5')) {
        blockInfo('.d5');
    }else{
        noneInfo('.d5');
    }
    if(el.classList.contains('p6')) {
        blockInfo('.d6');
    }else{
        noneInfo('.d6');
    }
    function blockInfo(e) {
        document.querySelector(e).style.display = 'flex';
    }
    function noneInfo(e) {
        document.querySelector(e).style.display = 'none';
    }
});

// Função máquina de escrever
const typewriter = ((e) => {
    const testArray = ('No curso que estou fazendo atualmente, estudo Javascript e TypeScript - front-end e back-end | Node | Express | noSQL | React | hooks | Redux | Design Patterns.').split('');
    testArray.forEach((letra, i) => {
        maisInfo.innerHTML = '';
        setTimeout (function() {
            maisInfo.innerHTML += letra;
        }, 10 * i)
    })
})

animeScroll()
