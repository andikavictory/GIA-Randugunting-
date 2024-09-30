document.addEventListener('DOMContentLoaded', function(){
const data = localStorage.getItem('dataIbadah');
let marquee = document.querySelector('.running-text');

   if(data){
    marquee.innerText = `${data} ~ GIA Randugunting`;
   }else{
    marquee.innerText = `Tidak ada data`;
   }
})