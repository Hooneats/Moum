const statContainer = document.getElementById("stat-container");
let backgroundcolor = ["#003f5c",
"#2f4b7c",
"#665191",
"#a05195",
"#d45087",
"#f95d6a",
"#ff7c43",
"#ffa600",]



function chart(
    charttype,
    items,
    items_data,
    chartoption = {responsive:true},
    titleObj = { display: false },
    isRes = true
  ) {
    
    if(myChart){
    myChart.destroy();
  
  }
    var ctx = document.getElementById("myChart").getContext("2d");
    myChart = new Chart(ctx, {
      responsive: isRes,
      type: charttype,
      data: {
        labels: items,
        datasets: items_data,
      },
      options: chartoption,
      title: titleObj,
    });
  }
  const setItemList = function (data) {
    statContainer.innerHTML = "";
    const chartItems = [];
    const chartValues = [];
    for (let d of data) {
      statContainer.innerHTML += `<div><span class="stat-label">${d.addict_item}</span><span>:</span><span class="counter">${d.saved_cost}</span></div>`;
      chartItems.push(d.addict_item);
      chartValues.push(d.saved_cost);
    }
    console.log(statContainer);
    const dataset = [
      {
        data: chartValues,
        backgroundColor: [
          "#003f5c",
          "#2f4b7c",
          "#665191",
          "#a05195",
          "#d45087",
          "#f95d6a",
          "#ff7c43",
          "#ffa600",
        ],
      },
    ];
    const chartOption = {
      responsive: true,
      legend: false,
      maintainAspectRatio: false,
      animation: false,
      pieceLabel: {
        mode: "label",
  
        fontSize: 11,
        fontStyle: "bold",
      },
    };
    chart(
      "pie",
      chartItems,
      dataset,
      chartOption,
      (titleObj = { display: false }),
      (isRes = true)
    );
  };
  function setMonthlyStat(data) {
    const chartItems=[1,5,10,15,20,25,30]
    
    const datasets=[]
    for(let item of data){
      const data=[]
      for(let saveData of item.daily_saved ){
        data.push(saveData.saved_cost)
      }
      const dataset = {
        
        label : item.saved_item,
        data: data,
        borderColor: backgroundcolor[Math.floor(Math.random() * backgroundcolor.length) ]
        
     }
     datasets.push(dataset)  
    }
    chart(
      "line",
      chartItems,
      datasets,
    );
    };
  function setYearlyStat(data){
    const chartItems=[]
    const thisMonth = new Date().getMonth()
    for(let i=1;i<=thisMonth;i++){
      chartItems.push(i);
    } 
    const chartoption={
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true
        }
      }
    }
    const datasets=[]
    for(let item of data){
      const data=[]
      for(let saveData of item.mothly_saved ){
        data.push(saveData.saved_cost)
      }
      const dataset = {
        
        label : item.saved_item,
        data: data,
        backgroundColor: backgroundcolor[Math.floor(Math.random() * backgroundcolor.length) ]
        
     }
     datasets.push(dataset)  
    }
    chart(
      "bar",
      chartItems,
      datasets,
      chartoption
    )
  }
  function setVersusStat(data){
    const chartItems = []
    const savedDates = []
    const deadDates = []
    for(let dataset of data){
      chartItems.push(dataset.saved_item)
      savedDates.push(dataset.total_saving_dates)
      deadDates.push(-dataset.total_dead_dates)
    }
    const datasets = [
      {
        label:  "절약한 일수",
        data : savedDates,
        backgroundColor:backgroundcolor[Math.floor(Math.random() * backgroundcolor.length) ],
        
      },
      {
        label:  "소비한 일수",
        data : deadDates,
        backgroundColor:backgroundcolor[Math.floor(Math.random() * backgroundcolor.length) ],
  
      }
    ]
    chart(
      "bar",
      chartItems,
      datasets
    )
  }