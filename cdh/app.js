const totalSaving = 135000000;
const totalSavingtoLocale = totalSaving.toLocaleString();
document.querySelector("#current-saving").innerText = totalSavingtoLocale;
$(".counter").counterUp({
  delay: 10,
  time: 800,
});
$(".anchor-option").on("click", function () {
  $(".title-section span")[0].classList.add("hide");
  $(".title-section span")[1].classList.add("hide");
  setTimeout(() => {
    $(".title-section span")[0].innerText = this.innerText;
    $(".title-section span")[1].innerText = this.innerText;
  }, 500);
  setTimeout(function () {
    $(".title-section span")[0].classList.remove("hide");
    $(".title-section span")[1].classList.remove("hide");
  }, 500);
});



const deadEventList = []
const data = [{
  addict_item: "smoke",
  dead_cost: "4500원",
  dead_date: "2021-08-15"
},
{
  addict_item: "smoke",
  dead_cost: "4500원",
  dead_date: "2021-08-17"
},{
  addict_item: "smoke",
  dead_cost: "4500원",
  dead_date: "2021-08-20"
},{
  addict_item: "smoke",
  dead_cost: "4500원",
  dead_date: "2021-08-23"
}
]
for(let d of data){
  let event = {
    title : `${d.addict_item} : ${d.dead_cost}`,
    start : d.dead_date,
  }
  deadEventList.push(event)
}



$(function () {
  var calendarEl = document.getElementById('calendar');
        var calendar = new FullCalendar.Calendar(calendarEl, {
          initialView: 'dayGridMonth',
          events: deadEventList,
          
        });
        calendar.render();
  document.getElementById("calendar").setAttribute("hidden","true")
  $("#nav-placeholder").load("../base.html #navbar", () => {
    document.getElementById("nav-logout").toggleAttribute("hidden");
    document.getElementById("nav-login").toggleAttribute("hidden");
    document.getElementById("nav-signup").toggleAttribute("hidden");
    document.getElementById("nav-mypage").toggleAttribute("hidden");
    document.getElementById("nav-statistic").toggleAttribute("hidden");
    document.getElementById("nav-wishlist").toggleAttribute("hidden");
  });
  $("#footer-placeholder").load("../base.html #footer");
  $("#calendar-toggle").click(()=>{
    document.getElementById("calendar").toggleAttribute("hidden")
  })
});
function elementInViewport2(el) {
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  while (el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top < window.pageYOffset + window.innerHeight &&
    left < window.pageXOffset + window.innerWidth &&
    top + height > window.pageYOffset &&
    left + width > window.pageXOffset
  );
}
window.addEventListener("onScroll", () => {
  console.log();
});

// var month_name = function (dt) {
//   mlist = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];
//   return mlist[dt.getMonth()];
// };
// const d = new Date();
// const n = month_name(d);


