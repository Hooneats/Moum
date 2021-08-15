


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
var myChart=''
const deadEventList = [];

for (let d of savingItemData) {
  let event = {
    title: `${d.addict_item} : ${d.dead_cost_list[0].dead_cost}`,
    start: d.dead_cost_list[0].dead_date,
  };
  deadEventList.push(event);
}


$(function () {
  $(".title-container")[0].firstElementChild.innerText= `welcome! ${username}`
  $("#test-toggle").click(()=>{
    $("#savingItemModal").modal("toggle")
  })
  const diagramSection = document.querySelector(".diagram-section")
  const statSection = document.querySelector(".statistic-section")
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    height: "80%",
    customButtons: {
      myCustomButton: {
        text: 'add',
        
        click: function() {
          
        }
      }
    },
    eventClick: function(){
      $("#deadEventModal").modal("show");
    },
    dateClick: function(){
      $("#deadEventModal").modal("show");
    },
    headerToolbar: {
      left: 'title',
      right: 'myCustomButton,today,prev,next'
    },
    initialView: "dayGridMonth",
    events: deadEventList,
  });
  setItemList(savingItemData);
  calendar.render();
  // second section button listener
  $(".options-section a").click(function () {
    switch (this.parentNode.className) {
      case "option1":
        statSection.setAttribute("style","display:flex")
        setItemList(data);
        break;
      case "option2":
        diagramSection.setAttribute("style",'width:80%;')
        statSection.setAttribute("style","display:none")
        setMonthlyStat(monthlyStat);
        break;
      case "option3":
        statSection.setAttribute("style","display:none")
        setYearlyStat(yearlyStat);
        break;
      case "option4":
        statSection.setAttribute("style","display:none")
        $(".statistic-section").hide();
        setVersusStat(VersusData);
        break;
      
    }
  });
  document.getElementById("calendar").setAttribute("hidden", "true");
  $("#nav-placeholder").load("../base.html #navbar", () => {
    document.getElementById("nav-logout").toggleAttribute("hidden");
    document.getElementById("nav-login").toggleAttribute("hidden");
    document.getElementById("nav-signup").toggleAttribute("hidden");
    document.getElementById("nav-mypage").toggleAttribute("hidden");
    document.getElementById("nav-statistic").toggleAttribute("hidden");
    document.getElementById("nav-wishlist").toggleAttribute("hidden");
  });
  $("#footer-placeholder").load("../base.html #footer");
  $("#modal-placeholder").load("../base.html #modals",function(){


    $(".add-item-button").click(()=>{  
      document.querySelector(".add-saving-item-form").toggleAttribute("hidden")
      document.querySelector(".saving-list-section").toggleAttribute("hidden")

    });
    $("#test-toggle").click(()=>{
      if(!document.querySelector("#savingItemModalContainer .saving-list-section form")){
      document.querySelector(".add-saving-item-form").removeAttribute("hidden")
      document.querySelector(".saving-list-section").setAttribute("hidden","true")
      }
    })

    // savingItem - buttons -eventlistener

    // savingItem - edit or submit
    $("#savingItemModalContainer .edit-submit").click(function(){
    
      switch($(this)[0].innerText){
        case "edit": $(this)[0].innerText= "submit";
        
        $("#savingItemModalContainer .item-selection").prop('disabled',(i,v)=>{return !v;})
        $("#savingItemModalContainer form input").prop('disabled',(i,v)=>{return !v;});break;
        
        case "submit": 
        
        // ajax edit saving item
        $("#savingItemModalContainer .item-selection").prop('disabled',(i,v)=>{return !v;})
        $("#savingItemModalContainer form input").prop('disabled',(i,v)=>{return !v;})
        $(this)[0].innerText= "edit";break;
      }
    });

    // savingItem - delete

    $("#savingItemModalContainer .delete").click(function(){
      // sql do delete (return boolean)
      // 
      // if( modal hide ) refresh page
      
      this.parentElement.remove();

      if(!document.querySelector("#savingItemModalContainer .saving-list-section form")){
        
        $("#savingItemModalContainer .saving-list-section")[0].firstElementChild.removeAttribute("hidden")
      }

    });
    // selectItem - eventlistener
    $("#savingItemModalContainer select").on("change",function(){
      if(this.value=="other"){
        document.querySelector(".saving-item-selection-other").removeAttribute("hidden")
        document.querySelector(".saving-item-selection-other").removeAttribute("disabled")
        this.setAttribute("name","")
      }
      else{
        document.querySelector(".saving-item-selection-other").value=""
        document.querySelector(".saving-item-selection-other").setAttribute("hidden","true")
        document.querySelector(".saving-item-selection-other").setAttribute("disabled","true")
        this.setAttribute("name","addict_item")
      }
    })

    // category - eventlistener
    $(".option").click(function(e){
      if($(this).hasClass("deselect")){
        $(this).appendTo(".selected-category-box")
      }
      else{
        $(this).appendTo(".category-box")

      }
      $(this).find("a")[0].toggleAttribute("hidden");
      $(this).toggleClass("deselect")
      

    })
    // show category edit modal
    $(".edit-button-selection button").click(()=>{
      
      $("#categorySelectionModal").modal("show")
    })

    // category submit
    $(".add-item-button").click(function(){
      const categoryList= document.querySelector(".selected-category-box").children
      const dataToSend=[]
      for(let category of categoryList){

        dataToSend.push(category.getAttribute("name"))
      }
      wishlist = dataToSend

      // ajax
      // return boolean (데이터 변경 성공 실패여부)
      const bool = true
      if(bool){
      for(let el of $(".category-section div")){
        el.setAttribute("hidden","true")
      };
      getWishList(dataToSend)
      alert("category change success")
      $("#categorySelectionModal").modal("hide")
    }
    else{
      alert("category change failed")
    }
    })
  });
  $(".edit-button-selection").click(()=>{
    for(let category of wishlist){
      $(`div[name=${category}]`).appendTo(".selected-category-box")
      $(`div[name=${category}]`).removeClass("deselect")
  $(`div[name=${category}]`).find("a")[0].removeAttribute("hidden","false");
    }
  })
  $("#calendar-toggle").click(() => {
    document.getElementById("calendar").toggleAttribute("hidden");
  });
});



function getWishList(data){
  for(let category of data){
  document.querySelector(`.${category}`).removeAttribute("hidden")
}
}
getWishList(wishlist);


function getCategory(){

}