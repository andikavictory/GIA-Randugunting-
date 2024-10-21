

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

   // scroll trigger animation
   gsap.registerPlugin(ScrollTrigger);

   const header = document.querySelector('.container-header');
   const title = header.querySelector('.title');
   const backgroundTitle = header.querySelector('.background-text');

   let tl = gsap.timeline({
      scrollTrigger: {
         trigger : header,
         start : "top top",
         end : "20% top",
         scrub : true,
         markers : false 
      }
   });
      // animation background
      tl.fromTo(title,
         {y:"0%", scale:1}, //titik awal
         {y:"-50%", scale:0.5,duration: 1, ease: "power1.out"} //titik akhir dengan animasi ease melambat diakhir
      )
      .fromTo(backgroundTitle,
         {y:"-25%", opacity:1},//titik awal
         {y:"-30%", opacity:0,duration: 1, ease: "power1.out"},0 //titik akhir dengan 0 sebagai parameter animasi berjalan bersamaan dengan animasi ease melambat diakhir
      )
      .fromTo(title,
         {
            '--before-translateX': '-100rem',  // manipulasi variabel CSS untuk elemen ::before
            '--before-width': '500px',
         },
         {
            duration: 2,
            '--before-translateX': '632px',  // transform untuk menggeser kembali ke layar
            '--before-width': '220px',
            ease: "power1.out"
         }
      )
      .fromTo(title,
         {
            '--after-translateX': '100rem',  // manipulasi variabel CSS untuk elemen ::after
            '--after-width': '100px',
         },
         {
            duration: 3,
            '--after-translateX': '-250px',  // transform untuk menggeser kembali ke layar
            '--after-width': '590px',
            ease: "power1.out"
         },0
      );
      // .fromTo(title,
      //    {
      //       '--before-left':'-39.5rem',
      //       '--before-width':'220px',
      //       '--after-right':'-16rem',
      //       '--after-width':'590px',
      //    },
      //    {
      //       duration:2,
      //       '--before-left':'-100rem',
      //       '--before-width':'500px',
      //       '--after-right':'-100rem',
      //       '--after-width':'100px',
      //       ease:"power1.out"
      //    }
      // )
      // animation underline
      // ScrollTrigger.create({
      //    trigger : header,
      //    start : "top top",
      //    end : "bottom top",
      //    scrub : true,
      //    markers : true,
      //    onEnter:()=>{
      //       gsap.fromTo(title,
      //          {
      //             '--before-left':'-100rem',
      //             '--before-width':'500px',
      //             '--after-right':'-100rem',
      //             '--after-width':'100px',
      //          },
      //          {
      //             duration:2,
      //             '--before-left':'-39.5rem',
      //             '--before-width':'220px',
      //             '--after-right':'-16rem',
      //             '--after-width':'590px',
      //             ease:"power1.out"
      //          }
      //       )
      //    },
      //    onLeave:()=>{
      //       gsap.fromTo(title,
      //          {
      //             '--before-left':'-39.5rem',
      //             '--before-width':'220px',
      //             '--after-right':'-16rem',
      //             '--after-width':'590px',
      //          },
      //          {
      //             duration:2,
      //             '--before-left':'-100rem',
      //             '--before-width':'500px',
      //             '--after-right':'-100rem',
      //             '--after-width':'100px',
      //             ease:"power1.out"
      //          }
      //       )
      //    }
      // })

})