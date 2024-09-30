document.addEventListener('DOMContentLoaded', function(){
const data = localStorage.getItem('dataIbadah');
let marquee = document.querySelector('.running-text');
let title = document.getElementById('title-event');
let subtitle = document.getElementById('subtitle-event')

   if(data){
    marquee.innerText = `${data} ~ GIA RANDUGUNTING`;
    const dataArray = data.split('~');
    title.innerText = dataArray[0];
    subtitle.innerText = dataArray[1];
   }else{
    marquee.innerText = `Tidak ada data`;
   }
})