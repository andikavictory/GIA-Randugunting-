
document.addEventListener('DOMContentLoaded', function(){

    // efek navbar
    let navbar = document.getElementById('navbar');
    let heroSection = document.getElementById('hero');
    let heroHeight = heroSection.offsetHeight;

    window.addEventListener('scroll', function(){
        let scrollPosition = window.scrollY;

        if(scrollPosition === 0){
            navbar.classList.remove('hidden');
            navbar.classList.remove('scrolled');
        }else if(scrollPosition > (heroHeight-80)){
            navbar.classList.remove('hidden');
            navbar.classList.add('scrolled');
        }else{
            navbar.classList.add('hidden');
            navbar.classList.remove('scrolled');
        }
    })


    // efek hero title
    const observer = new IntersectionObserver(
       (entries) => {
        entries.forEach((entry) => {
            if(entry.isIntersecting){
                entry.target.classList.add("in-view");
            }else{
                entry.target.classList.remove("in-view");
            }
        })
       },{
        threshold:0.1,
       } 
    );

    const h1 = document.querySelector('.hero-title');
    observer.observe(h1);
})


