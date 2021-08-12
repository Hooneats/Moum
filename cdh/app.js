
  const totalSaving = 135000000
  const totalSavingtoLocale = totalSaving.toLocaleString()
document.querySelector("span.counter").innerText =totalSavingtoLocale
$('.counter').counterUp({
    delay: 10,
    time: 800
});


window.onload = function(){
  
    var labels = document.querySelectorAll('label');
    var checked = false;
    var last_id = '';
    for(var i = 0; i<labels.length; i++){
      labels[i].addEventListener('mouseup', function(e){
       if(last_id.length > 0){
         
         if(e.currentTarget.getAttribute('for') === last_id){
           last_id = '';
         } else {
           last_id = e.currentTarget.getAttribute('for');
         }
         
       } else {
         last_id = e.currentTarget.getAttribute('for');
       }
        if(last_id.length > 0){
          document.getElementById('calendar').className = 'active';
          var index = last_id.split('-')[1];
          var elm_width = window.getComputedStyle(document.querySelector('label[for="'+last_id+'"]')).width;
         if(last_id.match(/0/)){
           document.documentElement.style.setProperty('--margin-left', elm_width);   
         } else if (last_id.match(/1/)){
            document.documentElement.style.setProperty('--margin-left', '0px');
         } else {
           document.documentElement.style.setProperty('--margin-left', '-'+(parseInt(elm_width)*(index-1))+'px');
         }
        } else {
          document.getElementById('calendar').className = '';
          document.documentElement.style.setProperty('--margin-left', '0px');   
        }
      });
    }
  }
