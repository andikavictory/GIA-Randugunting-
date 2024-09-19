
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

    const dekstop = document.querySelector('.hero-title');
    const mobile1 = document.querySelector('.mobile1');
    const mobile2 = document.querySelector('.mobile2');
    observer.observe(dekstop);
    observer.observe(mobile1);
    observer.observe(mobile2);
    
    
// modal Jadwal
var openModalBtns = document.querySelectorAll('.button');
var myModal = new bootstrap.Modal(document.getElementById('modal-jadwal'),{
    backdrop:true
});
openModalBtns.forEach(function(button){
    button.addEventListener('click',function(){

        var title = button.getAttribute('data-bs-title');

        var modalTitle = document.getElementById('modalTitle');
        modalTitle.textContent = title;

        myModal.show();
        
    })
})



})




