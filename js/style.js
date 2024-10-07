
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
            };
            
        });;
});
   