// Scroll to Top Button
const scrollToTopBtn = document.getElementById("scrollToTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
});

scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});



// hamburger event =================

let hb = document.querySelector(".hb")
let nav = document.querySelector("nav")
let flag = true
hb.addEventListener('click', () => {
    if (flag) {
        nav.style.left = "0"
        document.body.style.overflow = "hidden"; 
        flag = false
    } else {
        nav.style.left = "-935px"
        document.body.style.overflow = "auto";
        flag = true
    }
})