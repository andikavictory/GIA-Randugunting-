
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
        var dropdownMenu = document.querySelectorAll('.containsDropdown');
        
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
    // saat max-width:991px and max-height:660px, hero section hightnya diganti menjadi rem
    var navbarBrand = document.querySelector('.navbar-brand');
    var navbarLogo = document.getElementById('logo');

    if(window.innerHeight <= 660 && window.innerWidth <= 991){
        heroSection.style.height = '100rem';
        navbarBrand.style.fontSize = '2.5rem';
        navbarLogo.style.width = '4.5rem';

    }else{
        heroSection.style.height = '100vh';
        navbarBrand.style.fontSize = '4rem';
        navbarLogo.style.width = '6rem';
    }

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




