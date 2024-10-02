document.addEventListener('DOMContentLoaded', function(){
const data = localStorage.getItem('dataIbadah');
let marquee = document.querySelector('.running-text');
let title = document.getElementById('title-event');
let subtitle = document.getElementById('subtitle-event')

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
   function eventTime(){
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
            },950);
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
})