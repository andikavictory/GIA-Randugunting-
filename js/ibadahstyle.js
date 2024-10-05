document.addEventListener('DOMContentLoaded', function(){
   // get API Spreadsheet
   const API_KEY = "AIzaSyDv7Vs4gYRG0wgsX_hwiqSU1K5hFd_NY_g";
   const SHEET_ID= "102qEJ5r79KoA2KRDl85knGxm2au9XDZPDmHq6mW96Tc";
   const RANGE= "Sheet1!A2:L";

   async function fetchData(){
      try{
         const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`)
         const data = await response.json();
         
         const row = data.values;
         const sie = row.map(row => row[0]);
         const hari = row.map(row => row[1]);
         const waktu = row.map(row => row[2]);
         const deskripsi = row.map(row => row[3]);
         const ayat = row.map(row => row[4]);
         const ketua = row.map(row => row[5]);
         const sekertaris = row.map(row => row[6]);
         const bendahara = row.map(row => row[7]);
         const sieAcara = row.map(row => row[8]);
         const humas = row.map(row => row[9]);
         const sieMusik = row.map(row => row[10]);
         

      return {sie,hari,waktu,deskripsi,ayat,ketua,sekertaris,bendahara,sieAcara,humas,sieMusik}; 
   } 
   // menampilkan jika error
   catch (error) {
      console.error('error fetching data :', error);
   }}

   // async function displayData(){
   //    const data = await fetchData();
   //    console.log(data.waktu);
   // }
   // displayData();
   
   


   
   
   const data = localStorage.getItem('dataIbadah');
   let marquee = document.querySelector('.running-text');
   let title = document.getElementById('title-event');
   let subtitle = document.getElementById('subtitle-event')
   
      
   // navbar setting
   let hamburgerMenu = document.getElementById('hamburger');
   let exitMenu = document.getElementById('exit');
   let navbarTitle = document.querySelector('.navbar-title');
   
   hamburgerMenu.addEventListener('click', function(){
      setTimeout(()=> {
      navbarTitle.classList.toggle('active');
   },500);   
   })
   exitMenu.addEventListener('click', function(){
      setTimeout(()=> {
         navbarTitle.classList.toggle('active');
      },500); 
   })
   
   
   if(data){
       marquee.innerText = `${data} ~ GIA RANDUGUNTING`;
       const dataArray = data.split('~');
       title.innerText = dataArray[0];
       if(dataArray[1]){
          subtitle.innerText = dataArray[1];
       }
      }else{
       marquee.innerText = `Tidak ada data`;
      }
   
      // mendapatkan event time terdekat
      async function eventTime(){
         const data = await fetchData();
         const times = data.waktu;
         const timesArray = times.map(times => times.split(':'));
         const hour = timesArray.map(hour => hour[0]);
         const minute = timesArray.map(hour => hour[1]);
         console.log(hour,minute);
         const now = new Date();
         const dayOfWeek = now.getDay();
         const eventTimeOffset = (6-dayOfWeek+7)%7;
         
      // jika hari ini adalah event time dan untuk menghitung waktu selanjutnya
      const nextEventDay = new Date();
      nextEventDay.setDate(now.getDate()+(eventTimeOffset === 0 && now.getHours()>=18 && now.getMinutes()>=30 ? 7 : eventTimeOffset));
      nextEventDay.setHours(18,30,0,0);
      
      return nextEventDay.getTime();
      }
   
   
      function startCountdown(){
         const countdownDate = eventTime();
   
         // update countdown setiap detik
         const interval = setInterval(function(){
            const now = new Date().getTime();
            // menghitung selisih antara event time dan now
            const distance = countdownDate - now;
   
            // konversi
            const days = Math.floor(distance/(1000*60*60*24));
            const hours = Math.floor(distance % (1000*60*60*24)/(1000*60*60));
            const minutes = Math.floor(distance % (1000*60*60)/(1000*60));
            const seconds = Math.floor(distance % (1000*60)/1000);
   
            // menampilkan countdown
            let elementDay = document.querySelector('.day');
            let elementHour = document.querySelector('.hour');
            let elementMinute = document.querySelector('.minute');
            let elementSecond = document.querySelector('.second');
   
           function timeMove(element,value){
            if(element.innerText != value){
               element.classList.add('active');
               setTimeout(() => {
                  element.innerText = value;
                  element.classList.remove('active');
               },cekMaxWidth())
            }
           }
   
           function cekMaxWidth(){
            if(window.innerWidth > 991){
               return 950;
            }
            if(window.innerWidth < 991){
               return 935;
            }
            
           }
   
           timeMove(elementDay,days);
           timeMove(elementHour,hours);
           timeMove(elementMinute,minutes);
           timeMove(elementSecond,seconds);
   
             // Jika countdown selesai
           if (distance < 0) {
            clearInterval(interval); // Hentikan interval
            setTimeout(startCountdown, 1000); // Mulai countdown untuk Sabtu berikutnya
        }},1000);
      }
      startCountdown();
   
   
   
      // pagination galeri
      const galeriContainer = document.querySelector('.galeri-items');
      const parentPage = document.querySelector('.pagination');
      let images = Array.from(galeriContainer.children);
      let maxImages = setMaxImages();
      let pageNow = 1;

      function setMaxImages(){
      if(window.innerWidth >= 1200){
         return 12;
      } else if(window.innerWidth < 1200 && window.innerWidth >= 768) {
         return 9;
      } else if(window.innerWidth < 768){
         return 6;
      }
   }

      // jumlah yang masuk dalam galeri Container
      function showPage(page){
         const start = (page -1 ) * maxImages;
         const end = start + maxImages;

         images.forEach((image,index)=>{
            image.style.display = (index >= start && index < end) ? "block" : "none";
            })
      }

      // menghitung pagination
      let numberpage = Math.ceil(images.length/maxImages);
         
        for(let i = 1;i <= numberpage;i++){
         let newPage = document.createElement('li');
         newPage.classList.add('page-item');

         let newLink = document.createElement('a');
         newLink.classList.add('page-link');
         newLink.innerText = i;

         newPage.appendChild(newLink);
         parentPage.appendChild(newPage);

         // saat paination di klik maka pageNow berubah angka yang akan diproses
         newPage.addEventListener('click',function(){
            // menghilangkan semua kelas aktif terlebih dahulu
            const allPage = parentPage.querySelectorAll('.page-item');
            allPage.forEach((page)=>{
               page.classList.remove('active');
            })
            // merubah nilai pageNow setelah itu menambahkan kelas active, baru di proses shoPage()
            pageNow = i;
            newPage.classList.add('active');
            showPage(pageNow);
         })
        }
        const pageFirst = parentPage.querySelector('.page-item:first-child');
        pageFirst.classList.add('active');
      showPage(pageNow);

      // carousel event
      const iconLeft = document.getElementById('iconLeft');
      const iconRight = document.getElementById('iconRight');
      const items = document.querySelectorAll(".item");
      const innerCarousel = document.querySelector('.inner-carousel');
      let totalItems = items.length;
      let currentIndex = Math.floor(totalItems/2); //lokasi saat ini
      
      function updateCarousel(){
         innerCarousel.style.transform = `translateX(${(currentIndex-2) * marginItemEvent()}%)`;
         iconLeft.style.display = (currentIndex === 0) ? "none" : "block";
         iconRight.style.display = (currentIndex === totalItems - 1) ? "none" : "block";
      
         function marginItemEvent(){
            if(window.innerWidth > 991){
               return -20;
            }
            if(window.innerWidth <= 991 && window.innerWidth > 520){
               return -17;
            }
            if(window.innerWidth < 520 && window.innerWidth > 340){
               return -17.3;
            }
            if(window.innerWidth <= 340){
               return -19.4;
            }
         }
      }
      iconLeft.addEventListener('click',function(){
            if(currentIndex > 0){
               items[currentIndex].classList.remove('active');
               currentIndex--;
               items[currentIndex].classList.add('active');
               updateCarousel();
            }
   
      })
      iconRight.addEventListener('click',function(){
         if(currentIndex < totalItems - 1){
            items[currentIndex].classList.remove('active');
            currentIndex++;
            items[currentIndex].classList.add('active');
            updateCarousel();
         }
         
   })
   })