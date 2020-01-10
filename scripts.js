let toggler = document.querySelector('.toggle-button');
let close = document.querySelector('.close-button')
let backdrop = document.querySelector('.backdrop');
let mobileMenu =document.querySelector('.mobile-nav');

toggler.addEventListener('click', function(e) {
    backdrop.style.display = "block";
    this.style.display = "none";
    mobileMenu.classList.add('mobile-nav-show');
});

close.addEventListener('click', function(e) {
    backdrop.style.display = "none";
    toggler.style.display = "block";
    mobileMenu.classList.remove('mobile-nav-show');
})