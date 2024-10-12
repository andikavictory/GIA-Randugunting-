import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getStorage, ref, listAll, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";

document.addEventListener('DOMContentLoaded', function(){
   
   // memunculkan animasi loading 3 detik untuk menunggu data di load terlebih dahulu
   const loading = document.querySelector('.loading');
   document.body.classList.add("no-scroll");
   
   // setelah 3 detik, loading dimatikan
   setTimeout(() => {
      document.body.classList.remove("no-scroll");
      loading.style.display ="none";
   },3000);
   
   // get API Spreadsheet
   const API_KEY = "AIzaSyDv7Vs4gYRG0wgsX_hwiqSU1K5hFd_NY_g";
   const SHEET_ID= "102qEJ5r79KoA2KRDl85knGxm2au9XDZPDmHq6mW96Tc";
   const RANGE= "Sheet1!A2:N";

   async function fetchData(){
      try{
         const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`)
         const data = await response.json();
         
         const row = data.values;
         const id = row.map(row => row[0]);
         const sie = row.map(row => row[1].toUpperCase());
         const singkatan = row.map(row => row[2]);
         const hari = row.map(row => row[3]);
         const waktu = row.map(row => row[4]);
         const deskripsi = row.map(row => row[5]);
         const ayat = row.map(row => row[6]);
         const ketua = row.map(row => row[7]);
         const sekertaris = row.map(row => row[8]);
         const bendahara = row.map(row => row[9]);
         const sieAcara = row.map(row => row[10]);
         const humas = row.map(row => row[11]);
         const sieMusik = row.map(row => row[12]);
         const backgroundHero = row.map(row => row[13]);
         

      return {id,sie,singkatan,hari,waktu,deskripsi,ayat,ketua,sekertaris,bendahara,sieAcara,humas,sieMusik,backgroundHero}; 
   } 
   // menampilkan jika error
   catch (error) {
      console.error('error fetching data :', error);
   }}
   
   const data = localStorage.getItem('setEvent');

   // get API Firebase
   const firebaseConfig = {
      apiKey: "AIzaSyDeHv0Q7ImUx3O1Gd2UihMcwY3gG4rDBTQ",
      authDomain: "website-giar.firebaseapp.com",
      projectId: "website-giar",
      storageBucket: "website-giar.appspot.com",
      messagingSenderId: "748369602327",
      appId: "1:748369602327:web:8b65fcbe2106612fdeb952",
   }
   // masuk ke storage
   const app = initializeApp(firebaseConfig);
   const storage = getStorage(app);
   const storageName = ["","Umum","TPI Berkat Sion","Komsel Bethesda","Komsel Bethel","Komsel Betlehem","PPK","PWK","PRBK","KAA"];
   const storageReff = ref(storage,`Foto/${storageName[data]}/`);

   async function APIFirebase() {
     
      try{
         // Mendapatkan semua file di folder 'Foto/'
         const result = await listAll(storageReff);
         let indexData = 0;
         

         if(result.items.length === 0 ){
            console.log("Tidak ada file didalam Folder");
            return;
         }

         for(const item of result.items){
            try{
               const url = await getDownloadURL(item);
               // menampilkan Gambar pada galeri sesuai index
               // membuat div pembungkus baru
               const containerImg = document.createElement('div');
               containerImg.classList.add('col-sm-6','col-md-4','col-lg-4','col-xl-3','img');
               // membuat img baru
               const img = document.createElement('img');
               img.src = url;
               img.alt = storageName[data]+indexData;
               img.dataset.id = indexData;
               indexData ++;

               // menjadikan img anak dari DIV containerImg
               containerImg.appendChild(img);

               // Mengambil div galeri sebagai container utama
               const containerGaleri = document.querySelector('.galeri-items');
               containerGaleri.appendChild(containerImg);

            }catch(error){
               console.error("Tidak mendapatkan URL",error)
            }
         }
      
      } catch (error){
         console.error("Error API firebaseConfig",error);
      }
   }

   // memasukkan gallery terlebih dahulu, setelah  itu lakukan pengecekkan pagination
   async function runGallery(){
      await APIFirebase();
      
      // mengambil div modal galeri
      const containerGaleri = document.getElementById('container-galeri');
      const containerImgAll = containerGaleri.querySelectorAll('.img');

      const modalGaleri = document.querySelector('.modal-galeri');
      const containerModal = modalGaleri.querySelector('.container-modal');
      const containerImgModal = containerModal.querySelector('.container-img');

      //   saat DIV container IMG di klik maka akan memunculkan halaman putih fixed/ modalGaleri ada class "active"
      containerImgAll.forEach(containerImg => {
         const img = containerImg.querySelector('img');

         img.addEventListener('click',function(e){
            if(e.target.tagName === 'IMG'){
            modalGaleri.classList.add('active');
            document.body.classList.add('no-scroll')

            containerImgModal.innerHTML='';
            const imgModal = document.createElement('img');
            imgModal.src = e.target.src;
            imgModal.alt = e.target.alt;
            imgModal.loading = "lazy";
            imgModal.style.height = "auto";
            imgModal.style.width = "100%";
            imgModal.style.objectFit = "cover";
            containerImgModal.appendChild(imgModal);
         }})
         });
         // menutup modal saat klik bagian luar
         modalGaleri.addEventListener('click',function(e){
            if(e.target === modalGaleri){
               modalGaleri.classList.remove('active');
               document.body.classList.remove('no-scroll')
            }
         })
      

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
   }
   runGallery();

   async function displayData() {
      const database = await fetchData();
      const eventIndex = database.id.findIndex(item => item === data);
     

      // background hero sesuai index
      const eventHeroImg = document.querySelector('.hero img');
      const databackground = ["umum.jpg","TPI.jpg","komsel_Bethesda.jpg","Komsel_Bethel.jpg","komsel_Betlehem.jpg","PPK.jpg","PWK.jpg","PRBK.jpg","KAA.jpg"]

      // content event
      const dayEvent = document.querySelector('.dayEvent');
      const timeEvent = document.querySelector('.timeEvent');

      dayEvent.innerText = database.hari[eventIndex];
      timeEvent.innerText = database.waktu[eventIndex];

      
      eventHeroImg.src = `img/ibadah/background/${databackground[eventIndex]}`;
   


      // menambahkan Title
      title.innerText = database.sie[eventIndex];
      // jika ada tambahkan kepanjangan
      if(typeof database.singkatan[eventIndex] !== "undefined"){
      subtitle.innerText = database.singkatan[eventIndex];
      }else{
         subtitle.innerText = "";
      }
      // text berjalan
      marquee.innerText = cekSingkatan();
   
      function cekSingkatan() {
         const singkatan = database.singkatan[eventIndex];
     
         if (singkatan === undefined || singkatan === "" || singkatan === null) {  // Cek juga apakah kosong atau null
             return database.sie[eventIndex] + " ~ " + "GIA RANDUGUNTING";
         } else {
             return database.sie[eventIndex] + " ~ " + singkatan + " ~ " + "GIA RANDUGUNTING";
         }
     }

   //   mengambil deskripsi dan container-ayat
     const eventDeskripsi = document.querySelector('.description');
     const eventAyat = document.querySelector('.container-ayat');

     eventDeskripsi.innerText = database.deskripsi[eventIndex];
     eventAyat.innerText = database.ayat[eventIndex];

   }
   displayData();
   
   
  
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
   
      // mendapatkan event time terdekat
       async function eventTime(){
         const database = await fetchData();

         // mendaoatkan jam menit detik mili detik sesuai dengan index yang di mau
         const eventIndex = database.id.findIndex(item => item === data);
         const times = database.waktu[eventIndex];
         const timesArray = times.split(':');
         const eventHour = parseInt(timesArray[0]);
         const eventMinute = parseInt(timesArray[1]);
         const eventSecond = 0;
         const eventMiliSecond = 0;

         // mendapatkan hari
         const Days = {
            "Senin" : 1,
            "Selasa" : 2,
            "Rabu" : 3,
            "Kamis" : 4,
            "Jumat" : 5,
            "Sabtu" : 6,
            "Minggu" : 7,
         }
         const eventDay = database.hari[eventIndex];
         const numberDay = Days[eventDay];

         // mengambil hari ini
         const now = new Date();
         const dayOfWeek = now.getDay();
         const eventTimeOffset = (numberDay-dayOfWeek+7)%7;
         
      // jika hari ini adalah event time dan untuk menghitung waktu selanjutnya
      const nextEventDay = new Date();
      nextEventDay.setDate(now.getDate()+(eventTimeOffset === 0 && now.getHours()>=eventHour && now.getMinutes()>=eventMinute ? 7 : eventTimeOffset));
      nextEventDay.setHours(eventHour,eventMinute,eventSecond,eventMiliSecond);
      
      return nextEventDay.getTime();
      }
   
   
      async function startCountdown(){
         const countdownDate = await eventTime();

         // ambil element div tear-off-container
         const containerTearOff = document.querySelectorAll('.tear-off-container');

         function tearOff(element,newValue){
            const front = element.querySelector('.tear-off-front');
            const back = element.querySelector('.tear-off-back');

            // mengisi front dan back dengan waktu terbaru
            setTimeout(() => {front.innerText = newValue;},900);
            back.innerText = newValue;

         }
   
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


            // function mengambil container tear off dan waktu terbaru dan membandingkannya
            timeMove(containerTearOff[0],days);
            timeMove(containerTearOff[1],hours);
            timeMove(containerTearOff[2],minutes);
            timeMove(containerTearOff[3],seconds);
      
            // function menambil container tear off dan mengambil value hari waktu dengan + 0 didepan
            tearOff(containerTearOff[0],days.toString().padStart(2,"0"));
            tearOff(containerTearOff[1],hours.toString().padStart(2,"0"));
            tearOff(containerTearOff[2],minutes.toString().padStart(2,"0"));
            tearOff(containerTearOff[3],seconds.toString().padStart(2,"0"));

   
             // Jika countdown selesai
           if (distance < 0) {
            clearInterval(interval); // Hentikan interval
            setTimeout(startCountdown, 1000); // Mulai countdown untuk Sabtu berikutnya
        }},1000);
      }

  // kondisi dimana inner berbeda yang memicu animation active
      function timeMove(element,value){
         const front = element.querySelector('.tear-off-front');
         const back = element.querySelector('.tear-off-back')
       
      if (back.innerText != value) {
         front.classList.add('active');
         back.classList.add('active');
         setTimeout(() => {
            front.classList.remove('active');
            back.classList.remove('active');
         }, 900);
         }
               }
      startCountdown();

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