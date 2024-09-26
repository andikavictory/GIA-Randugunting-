
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
            toggle.addEventListener('click', function(e){
                e.preventDefault();
                if(containerTarget.classList.contains('active')){
                    closeMenuDropdown();
                }else{
                    openMenuDropdown();
                }
            })
            // if(!window.matchMedia("(hover:none)").matches){
            // saat tombol dihover dan containermenu maka container active
            function setupListener(){
            if (window.matchMedia("(min-width: 991px)").matches) {
            toggle.addEventListener('mouseenter',openMenuDropdown);}}
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
        
         setupListener();
            window.addEventListener('resize',setupListener);
        // }
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


     // sub tombol muncul
     var buttonHero = document.querySelector('.btn-hero');
     isOpen = false;

     buttonHero.addEventListener('click',function(){
        buttonHero.classList.add('active');
        let subButtons = document.querySelectorAll('.subbtn-hero');
        let index = 0;
        
        if(isOpen){
        function showPrevSubbutton(){
            if(index < subButtons.length && index >= 0){
            subButtons[index].classList.remove('active');
            subButtons[index].style.top = '-59px';
            if(window.innerWidth <= 991) {
            subButtons[index].style.left = '-70px';
            }
            index++;
            setTimeout(showPrevSubbutton,300);
        }  else{setTimeout(() => {
            buttonHero.classList.remove('active');
        },600);
        }
            isOpen = false;
           
        } 
        showPrevSubbutton();
    }else{
        function showNextSubbutton(){
        if(index < subButtons.length){
            subButtons[index].classList.add('active');
            marginButtonScreenSize();
            index++;
            setTimeout(showNextSubbutton,300);
           
        }else{
            isOpen = true;
            setTimeout(() => {
            document.querySelector('.btn-hero').classList.remove('active');
        },600);
        }}
    
        showNextSubbutton();
        
     } 
    //  mengatur tata letak top pada sub button
     function marginButtonScreenSize(){
        let width = window.innerWidth;
        
        if (width > 991) {
            subButtons[index].style.top = "50px";
        } else if (width <= 991 && width > 850) {
            setTopStyles(["-3.3rem", "-3.3rem", "50px", "50px"]);
            setLeftStyles(["-22.5rem", "12rem", "-12rem", "1rem"]);
        } else if (width <= 850 && width > 700) {
            setTopStyles(["-3.3rem", "-3.3rem", "50px", "50px"]);
            setLeftStyles(["-19.5rem", "11rem", "-12rem", "1rem"]);
            setButtonStyles("10rem", "0.8rem");
        } else if (width <= 700 && width > 500) {
            setTopStyles(["30px", "30px", "90px", "90px"]);
            setLeftStyles(["-12rem", "1rem", "-12rem", "1rem"]);
        } else if (width <= 500) {
            setTopStyles(["30px", "30px", "80px", "80px"]);
            setLeftStyles(["-8rem", "1rem", "-8rem", "1rem"]);
            setButtonStyles("8rem", "0.6rem");
        }
    }

    function setTopStyles(tops) {
        subButtons.forEach((btn, idx) => btn.style.top = tops[idx]);
    }

    function setLeftStyles(lefts) {
        subButtons.forEach((btn, idx) => btn.style.left = lefts[idx]);
    }

    function setButtonStyles(width, fontSize) {
        subButtons[index].style.width = width;
        subButtons[index].style.fontSize = fontSize;
    }}
    )
    window.addEventListener('resize', function() {
        marginButtonScreenSize();
    });



});


   