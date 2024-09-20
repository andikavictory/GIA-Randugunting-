
document.addEventListener('DOMContentLoaded', function(){
    

    var hamburgerMenu = document.getElementById('hamburger');
    var navbarNav = document.getElementById('navbarNav');
    var exitMenu = document.getElementById('exit');

    // navbarNav Open
    hamburgerMenu.addEventListener('click', function(){
        navbarNav.classList.toggle('active');
        hamburgerMenu.classList.add('active');
        
        setTimeout(() => {
            exitMenu.classList.add('active');},600);
        
            if(navbarNav.classList.contains('active')){
                document.body.classList.add('no-scroll')
            };
        
        })
    // navbarNav exit
    exitMenu.addEventListener('click', function(){
        navbarNav.classList.remove('active');

        setTimeout(() => {
            hamburgerMenu.classList.remove('active');},600);
        
            exitMenu.classList.remove('active');
            document.body.classList.remove('no-scroll')
        })

    // navbarNav menu dropdown
    var dropdownToggle = document.querySelectorAll('.btn-dropdown');
    var dropdownMenu = document.querySelectorAll('.dropdown-menu');

    dropdownToggle.forEach(toggle => {
        toggle.addEventListener('click', function(){
            const target = this.getAttribute('data-target');
            const targetMenu = document.querySelector(target);

            // cek Viewpoint
            if(window.innerWidth < 992){
                // toggle visibility
                if(targetMenu){
                    if(targetMenu.style.display === 'block'){
                        // Menutup jika terbuka
                        targetMenu.style.display = 'none'; 
                    }else{
                        // sembunyikan semua dropdown
                        dropdownMenu.forEach(menu => {
                            menu.style.display = 'none';
                        });
                        targetMenu.style.display = 'block';
                    }
                }
            }
        })
    })

    function submenuOpen(){
        var menu = document.getElementById('submenu');

        if(window.innerWidth < 992){
            if(menu.style.display === 'block' || menu.style.display === ''){
                menu.style.display = 'none';
            }else{
                menu.style.display = 'block';
            }
        }
    }


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
    )
    const dekstop = document.querySelector('.hero-title');
    const mobile1 = document.querySelector('.mobile1');
    const mobile2 = document.querySelector('.mobile2');
    observer.observe(dekstop);
    observer.observe(mobile1);
    observer.observe(mobile2)  
})




