
document.addEventListener('DOMContentLoaded', function(){
    
    
    var hamburgerMenu = document.getElementById('hamburger');
    var navbarNav = document.getElementById('navbarNav');
    var exitMenu = document.getElementById('exit');
    
    // navbarNav Open
    hamburgerMenu.addEventListener('click', function(){
        navbarNav.classList.toggle('active');
        hamburgerMenu.classList.add('active');
        // setting tombol exit keluar 600ms setelah hamburgermenu keluar
        setTimeout(() => {
            exitMenu.classList.add('active');},600);
            // saat navbarNav active, tidak bisa di scroll
            if(navbarNav.classList.contains('active')){
                document.body.classList.add('no-scroll')
            };
        
        })
        // navbarNav exit
        exitMenu.addEventListener('click', function(){
        navbarNav.classList.remove('active');
        // setting tombol hamburgermenu keluar 600ms setelah tombol exit
        setTimeout(() => {
            hamburgerMenu.classList.remove('active');},600);
            // saat navbarNav tidak aktif active, kembali bisa di scroll
            exitMenu.classList.remove('active');
            document.body.classList.remove('no-scroll')
        })
        
        // navbarNav menu dropdown
        var dropdownToggle = document.querySelectorAll('.btn-dropdown');
        var dropdownSubMenu = document.getElementById('submenu');
        var targetSubMenu = document.getElementById('dropdown-2');
        var triangles = document.querySelectorAll('.triangle');
        
         // halaman dekstop
         dropdownToggle.forEach((toggle, index) => {
            // ambil data-target btn-dropdown
            let target = toggle.getAttribute('data-target');
            let containerTarget = document.querySelector(target);
            let triangle = triangles[index];

            if(window.innerWidth <= 991){
            toggle.addEventListener('click', function(){
                if(containerTarget.classList.contains('active')||containerTarget.classList.contains('')){
                    closeMenuDropdown();
                }else{
                    openMenuDropdown();
                }
            })
        }
            function openMenuDropdown (){
                containerTarget.classList.add('active');
                if(triangle){
                    triangle.classList.add('active');
                };
            }
            function closeMenuDropdown (){
                containerTarget.classList.remove('active');
                if(triangle){
                    triangle.classList.remove('active');
                }
            }
            // saat tombol dihover dan containermenu maka container active
            toggle.addEventListener('mouseenter',openMenuDropdown);
            containerTarget.addEventListener('mouseenter',openMenuDropdown);
            
            

            // saat tombol dilepas dengan ketentuan tidak didalam toggle dan containermenu maka remove active
            toggle.addEventListener('mouseleave',function(){
                if(!toggle.matches(':hover') && !containerTarget.matches(':hover')){
                    closeMenuDropdown();
                }
            })
            // saat containermenu dilepas dengan ketentuan tidak didalam toggle dan containermenu maka remove active
            containerTarget.addEventListener('mouseleave',function(){
            if(!toggle.matches(':hover') && !containerTarget.matches(':hover')){
                closeMenuDropdown();
            }
            })
            // jika submenu di hover, dropdown-2 tetap
            if(dropdownSubMenu){
                dropdownSubMenu.addEventListener('mouseenter',function(){
                    targetSubMenu.classList.add('active');
                })
                dropdownSubMenu.addEventListener('mouseleave',function(){
                    targetSubMenu.classList.remove('active');

                })
            }
        })
       
        
            
    
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
        
    });

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
    )
    const dekstop = document.querySelector('.hero-title');
    const mobile1 = document.querySelector('.mobile1');
    const mobile2 = document.querySelector('.mobile2');
    observer.observe(dekstop);
    observer.observe(mobile1);
    observer.observe(mobile2)  
});



