
  const totalSaving = 135000000
  const totalSavingtoLocale = totalSaving.toLocaleString()
document.querySelector("#current-saving").innerText =totalSavingtoLocale
$('.counter').counterUp({
    delay: 10,
    time: 800
});
$('.anchor-option').on("click",function(){
  $('.title-section span')[0].classList.add('hide')
  $('.title-section span')[1].classList.add('hide')
   setTimeout(()=> { 
    
     $('.title-section span')[0].innerText = this.innerText
     $('.title-section span')[1].innerText = this.innerText

 }, 500);
 setTimeout(function() { 
   $('.title-section span')[0].classList.remove('hide')
   $('.title-section span')[1].classList.remove('hide')
 }, 500);

})






 var month_name = function (dt) {
   mlist = [
     "January",
     "February",
     "March",
     "April",
     "May",
     "June",
     "July",
     "August",
     "September",
     "October",
     "November",
     "December",
   ];
   return mlist[dt.getMonth()];
 };
 const d = new Date();
 const n = month_name(d);
