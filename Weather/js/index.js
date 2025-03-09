var weather = [];
var loc = "cairo"
var date1,day1,day2,day3,mon1;
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

request();

function request() {
  var httpReq = new XMLHttpRequest();
  httpReq.open("get","https://api.weatherapi.com/v1/forecast.json?key=cb9cf0c3d7ef47409a2135853241204&days=3&q="+loc);
  httpReq.send();
  httpReq.addEventListener("readystatechange",function(){
    if(httpReq.readyState == 4 && httpReq.status == 200){
        weather = JSON.parse(httpReq.response)
        console.log(weather);
        date1 = new Date(weather.forecast.forecastday[0].date);
        mon1=date1.getDate()+months[date1.getMonth()];
        day1=days[date1.getDay()];
        day2=days[new Date(weather.forecast.forecastday[1].date).getDay()];
        day3=days[new Date(weather.forecast.forecastday[2].date).getDay()];
        console.log(day1+" "+day2+" "+day3);
        display()
    }
})
}

function display() {    
    var temp = "";
    
    temp += `<div class="col-lg-4  mb-3 bg-success bg-opacity-75 pb-5 p-2">

    <div class="d-flex justify-content-between bg-success bg-opacity-100 p-1">
    <div class ="day pb-1 text-white fs-4 fw-semibold">${day1}</div>
    <div class ="day pb-1 text-white fs-4 fw-semibold">${mon1}</div>
    </div>

    <div class="text-white  opacity-50 fs-4">${weather.location.name}</div>
    <div class="d-flex align-content-around">
      <div class="temp text-white fw-bold me-4">${weather.current.temp_c}<sup class="fs-1">o</sup>C</div>
      <div class="icon text-white ms-4 mt-4 fw-bold">${getIcon(weather.current.condition.text)}</div>
      
    </div>
    <div class="cond fs-5 mb-3">${weather.current.condition.text}</div>
    <span class="pe-3 fs-6"><i class="fa fa-umbrella p-1 fs-5 opacity-100" aria-hidden="true"></i>20%</span>
    <span class="pe-3 fs-6"><i class="fa fa-500px p-1 fs-5 " aria-hidden="true"></i>18km/h</span>
    <span class="pe-3 fs-6"><i class="fa fa-compass p-1 fs-5 " aria-hidden="true"></i>East</span>
  </div>


  <div class="col-lg-4 text-center mb-3 bg-success bg-opacity-75 pb-5 p-2">
    <div class ="day pb-1 text-white fs-4 fw-semibold bg-success bg-opacity-100 p-1">${day2}</div>
    <div class="text-white fs-2 fw-bold m-4 mt-5">${getIcon(weather.forecast.forecastday[1].day.condition.text)}</div>
    <div class="fw-bold fs-3 text-white m-1">${weather.forecast.forecastday[1].day.maxtemp_c}<sup class="fs-6">o</sup>C</div>
    <div class="mintemp fw-bold fs-6 mb-4">${weather.forecast.forecastday[1].day.mintemp_c}<sup>o</sup></div>
    <div class="cond fs-5">${weather.forecast.forecastday[1].day.condition.text}</div>
  </div>

  <div class="col-lg-4 text-center mb-3 bg-success bg-opacity-75 pb-5 p-2">
    <div class ="day pb-1 text-white fs-4 fw-semibold bg-success bg-opacity-100 p-1">${day3}</div>
    <div class="text-white  fs-2 fw-bold m-4 mt-5">${getIcon(weather.forecast.forecastday[2].day.condition.text)}</div>
    <div class="fw-bold fs-3 text-white m-1">${weather.forecast.forecastday[2].day.maxtemp_c}<sup class="fs-6">o</sup>C</div>
    <div class="mintemp fw-bold fs-6 mb-4">${weather.forecast.forecastday[2].day.mintemp_c}<sup>o</sup></div>
    <div class="cond fs-5">${weather.forecast.forecastday[2].day.condition.text}</div>
  </div>
     `

    document.getElementById("row").innerHTML = temp
}



function getIcon(condition) {
  if(condition == 'Clear'){
    return `<i class="fa fa-moon-o" aria-hidden="true"></i>`;
  }

  if(condition == 'Sunny'){
    return `<i class="fa fa-sun-o" aria-hidden="true"></i>`;
  }
  
  if(condition == 'Patchy rain nearby' || condition == 'Moderate rain'){
    return `<i class="fa fa-tint" aria-hidden="true"></i>`;
  }

  else{
    return `<i class="fa fa-cloud" aria-hidden="true"></i>`;
  }
}

function search(){
  loc = document.getElementById("srch").value;
  request();
}