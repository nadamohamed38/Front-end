$(window).on("load", ()=>{
    setTimeout(()=>{
        $(".loading").fadeOut(1000 , ()=>{
            $("body").css("overflow","visible")
        })
    })
    
})

var meals = []
mainrequest()



async function mainrequest(){
    
    var response = await fetch("https://themealdb.com/api/json/v1/1/search.php?s=")
     meals = await response.json()
     var temp = ""
    for (let i = 0; i < meals.meals.length; i++) {
        temp += `<div onclick="request(\'${meals.meals[i].strMeal}\',${1},${1})" class="col-md-3 position-relative overflow-hidden mb-3">
        <div><img src="${meals.meals[i].strMealThumb}" class="w-100 rounded-4" alt=""></div>
        
        <div class="layer position-absolute  text-center w-100 h-100 rounded-4  align-content-center fs-4 fw-bold"><h3 class="text-center">${meals.meals[i].strMeal}</h3></div>
    </div>`
    }

    
    document.getElementById("row").innerHTML = temp
     
}



async function request(ext,choice,k) {
    var response
    if(choice == 1){
      response = await fetch("https://themealdb.com/api/json/v1/1/search.php?s="+ext)
    }
    else if(choice == 2){
        response = await fetch("https://themealdb.com/api/json/v1/1/search.php?f="+ext)
      }
    else if(choice == 3){
        response = await fetch("https://themealdb.com/api/json/v1/1/categories.php?f=")
      }
    else if(choice == 4){
        var response = await fetch("https://themealdb.com/api/json/v1/1/list.php?i=list")
    }
    else if(choice == 5){
        var response = await fetch("https://themealdb.com/api/json/v1/1/filter.php?i="+ext)
    }
    else if(choice == 6){
        var response = await fetch("https://themealdb.com/api/json/v1/1/list.php?a=list")
    }
    else if(choice == 7){
        var response = await fetch("https://themealdb.com/api/json/v1/1/filter.php?a="+ext)
    }
    else if(choice == 8){
        var response = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c="+ext)
    }
     meals = await response.json()
    
     if(choice == 3){
        displayCat()
     }
     else if(choice == 4){
        displayMainIng()
     }
     else if(choice == 5){
        displayMainMeals()
    }
    else if(choice == 6){
        displayArea()
    }
    else if(choice == 7){
        
        displayAreaMeals()
        
    }
    else if(choice == 8){
        
        displayMealsCat()
        
    }
    else{

        display()
    }

    if(k == 1){
        displayMealIng();
    }
}



$(".nav ").css({"left" : -$(".sidenav").outerWidth()})

$(".open").click(() => {
    if ($(".nav ").css("left") == "0px"){
        $(".nav").animate({ "left": -$(".sidenav").outerWidth() }, 500);
        $(".navFa").addClass("fa-bars")
        $(".navFa").removeClass("fa-times")
    }
    else{
        $(".nav").animate({ "left": 0 }, 500);
        $(".navFa").removeClass("fa-bars")
        $(".navFa").addClass("fa-times")
    }
        
})



$(".srch").click(function() {
    $(".mainPage").hide()
    $(".search").show();
    $(".categories").hide()
    $(".mealsOfcat").hide()
    $(".area").hide()
    $(".mealsOfArea").hide()
    $(".ingredients").hide()
    $(".mainMeals").hide()
    $(".mealing").hide()
    $(".contact").hide()
    $(".nav").animate({ "left": -$(".sidenav").outerWidth() }, 500);
    $(".navFa").addClass("fa-bars")
    $(".navFa").removeClass("fa-times")
})

function srchbyName() {
    var name = document.getElementById("name").value;
    
    request(name,1,0)
}

var letter = document.querySelector("#letter");
function srchbyLetter() {
   
    if(letter.value.length > 1){
     letter.value = letter.value.slice(0,1);
    }

    request(letter.value ,2,0 )

}


function display() {
    var temp = ""
    for (let i = 0; i < meals.meals.length; i++) {
        temp += `<div onclick="request(\'${meals.meals[i].strMeal}\',${1},${1})" class="col-md-3 position-relative overflow-hidden mb-2">
        <div><img src="${meals.meals[i].strMealThumb}" class="w-100 rounded-4" alt=""></div>
        
        <div class="layer position-absolute w-100 h-100 rounded-4 align-content-center fs-4 fw-bold">${meals.meals[i].strMeal}</div>
    </div>`
    }

    document.querySelector(".search #row").innerHTML = temp
}


//category

$(".categ").click(function() {

    $(".mainPage").hide()
    $(".search").hide();
    $(".categories").show()
    $(".mealsOfcat").hide()
    $(".area").hide()
    $(".mealsOfArea").hide()
    $(".ingredients").hide()
    $(".mainMeals").hide()
    $(".mealing").hide()
    $(".contact").hide()
    $(".nav").animate({ "left": -$(".sidenav").outerWidth() }, 500);
    $(".navFa").addClass("fa-bars")
    $(".navFa").removeClass("fa-times")
    request("",3,0)
})

function displayCat() {
    var temp = ""
    for (let i = 0; i < meals.categories.length; i++) {
        temp += `<div onclick="request(\'${meals.categories[i].strCategory}\',${8},${0})" class="col-md-3 position-relative overflow-hidden mb-2" id = "col">
        <div><img src="${meals.categories[i].strCategoryThumb}" class="w-100 rounded-4" alt=""></div>
        <div class="layer position-absolute h-100 rounded-4 text-center text-black overflow-auto p-2"><h5>${meals.categories[i].strCategory}</h5><p>${meals.categories[i].strCategoryDescription.slice(0,100)}</p></div>
    </div>`
  
    }

    document.querySelector(".categories #row").innerHTML = temp
    
}


function displayMealsCat() {
    $(".mainPage").hide()
    $(".search").hide();
    $(".categories").hide()
    $(".mealsOfcat").show()
    $(".area").hide()
    $(".mealsOfArea").hide()
    $(".ingredients").hide()
    $(".mainMeals").hide()
    $(".mealing").hide()
    $(".contact").hide()
    var temp = ""
    for (let i = 0; i < meals.meals.length; i++) {
        temp += `<div onclick="request(\'${meals.meals[i].strMeal}\',${1},${1})" class="col-md-3 position-relative overflow-hidden mb-2">
        <div><img src="${meals.meals[i].strMealThumb}" class="w-100 rounded-4" alt=""></div>
        
        <div class="layer position-absolute w-100 h-100 rounded-4 align-content-center fs-4 fw-bold">${meals.meals[i].strMeal}</div>
    </div>`
    }

    document.querySelector(".mealsOfcat #row").innerHTML = temp
}




//area

$(".ar").click(function() {

    $(".mainPage").hide()
    $(".search").hide();
    $(".categories").hide()
    $(".mealsOfcat").hide()
    $(".area").show()
    $(".mealsOfArea").hide()
    $(".ingredients").hide()
    $(".mainMeals").hide()
    $(".mealing").hide()
    $(".contact").hide()
    $(".nav").animate({ "left": -$(".sidenav").outerWidth() }, 500);
    $(".navFa").addClass("fa-bars")
    $(".navFa").removeClass("fa-times")
    request("",6,0)
})


function displayArea(){
    var temp = ""
    for (let i = 0; i < meals.meals.length; i++) {
        temp += `<div onclick="area(\'${meals.meals[i].strArea}\')" class="col-md-3 position-relative overflow-hidden text-center text-white mb-2" id = "col">
        <div><i class="fa fa-home m-2 fs-1" aria-hidden="true"></i></div>
        <div class=""><h5 class="h2">${meals.meals[i].strArea}</h5></div>
    </div>`
  
    }

    document.querySelector(".area #row").innerHTML = temp
}

function area(x) {
    
    $(".mainPage").hide()
    $(".search").hide();
    $(".categories").hide()
    $(".mealsOfcat").hide()
    $(".area").hide()
    $(".mealsOfArea").show()
    $(".ingredients").hide()
    $(".mainMeals").hide()
    $(".mealing").hide()
    $(".contact").hide()
    request(x,7,0)
}

function displayAreaMeals() {
    var temp = ""
    for (let i = 0; i < meals.meals.length; i++) {
        temp += `<div onclick="request(\'${meals.meals[i].strMeal}\',${1},${1})" class="col-md-3 position-relative overflow-hidden mb-2">
        <div><img src="${meals.meals[i].strMealThumb}" class="w-100 rounded-4" alt=""></div>
        
        <div class="layer position-absolute w-100  h-100 rounded-4 align-content-center fs-4 fw-bold">${meals.meals[i].strMeal}</div>
    </div>`
    }

    document.querySelector(".mealsOfArea #row").innerHTML = temp
}













//ingredients

$(".ing").click(function() {

    $(".mainPage").hide()
    $(".search").hide();
    $(".categories").hide()
    $(".mealsOfcat").hide()
    $(".area").hide()
    $(".mealsOfArea").hide()
    $(".ingredients").show()
    $(".mainMeals").hide()
    $(".mealing").hide()
    $(".contact").hide()
    $(".nav").animate({ "left": -$(".sidenav").outerWidth() }, 500);
    $(".navFa").addClass("fa-bars")
    $(".navFa").removeClass("fa-times")
    request("",4,0)
})

function displayMainIng() {
    var temp = ""
    for (let i = 0; i < 20; i++) {
        
        temp += `<div onclick="request(\'${meals.meals[i].strIngredient}\',${5},${0})" class="col-md-3 position-relative overflow-hidden text-center text-white mt-2">
        <div><i class="fa fa-cutlery fs-3 m-2" aria-hidden="true"></i></div>
        <div><h5>${meals.meals[i].strIngredient}</h5>
        <p>${meals.meals[i].strDescription.slice(0,100)}</p>
        </div>
    </div>`
    }

    document.querySelector(".ingredients #row").innerHTML = temp
}


function displayMainMeals(){
    $(".mainPage").hide()
    $(".search").hide();
    $(".categories").hide()
    $(".mealsOfcat").hide()
    $(".area").hide()
    $(".mealsOfArea").hide()
    $(".ingredients").hide()
    $(".mainMeals").show()
    $(".mealing").hide()
    $(".contact").hide()
    var temp = ""
    for (let i = 0; i < meals.meals.length; i++) {
        
        temp += `<div onclick="request(\'${meals.meals[i].strMeal}\',${1},${1})" class="col-md-3 position-relative overflow-hidden mb-2" id = "col">
        <div><img src="${meals.meals[i].strMealThumb}" class="w-100 rounded-4" alt=""></div>
        <div class="layer position-absolute w-100 h-100 rounded-4 text-center text-black p-3 align-content-center"><h5>${meals.meals[i].strMeal}</h5></div>
    </div>`
    }

    document.querySelector(".mainMeals #row").innerHTML = temp
    
}


function displayMealIng() {
    $(".mainPage").hide()
    $(".search").hide();
    $(".categories").hide()
    $(".mealsOfcat").hide()
    $(".area").hide()
    $(".mealsOfArea").hide()
    $(".ingredients").hide()
    $(".mainMeals").hide()
    $(".mealing").show()
    $(".contact").hide()
    var temp = ""
    temp += `<div  class="col-md-4 position-relative overflow-hidden" id = "col">
        <div><img src="${meals.meals[0].strMealThumb}" class="w-100 rounded-4" alt=""></div>
        <div class="w-100 rounded-4 text-white p-3 align-content-center"><h5>${meals.meals[0].strMeal}</h5></div>
    </div>
    <div  class="col-md-8 position-relative overflow-hidden text-white" id = "col">
        <div><h3>Instructions</h3>
        <p>${meals.meals[0].strInstructions}</p>
        </div>
        <div class="w-100 rounded-4 text-white p-3 align-content-center"><h5 class="fw-bold">Area : ${meals.meals[0].strArea}</h5>
        <h5 class="fw-bold">Category : ${meals.meals[0].strCategory}</h5>
        <h5 class="fw-bold">Recipes :</h5></div>
        <div class="d-flex flex-wrap">
        <div class="bg-info rounded-2 m-1 p-1">
        <span>${meals.meals[0].strIngredient1}</span>
        </div>
        <div class="bg-info rounded-2 m-1 p-1">
        <span>${meals.meals[0].strIngredient2}</span>
        </div>
        <div class="bg-info rounded-2 m-1 p-1">
        <span>${meals.meals[0].strIngredient3}</span>
        </div>
        <div class="bg-info rounded-2 m-1 p-1">
        <span>${meals.meals[0].strIngredient4}</span>
        </div>
        <div class="bg-info rounded-2 m-1 p-1">
        <span>${meals.meals[0].strIngredient5}</span>
        </div>
        <div class="bg-info rounded-2 m-1 p-1">
        <span>${meals.meals[0].strIngredient6}</span>
        </div>
        <div class="bg-info rounded-2 m-1 p-1">
        <span>${meals.meals[0].strIngredient7}</span>
        </div>
        <div class="bg-info rounded-2 m-1 p-1">
        <span>${meals.meals[0].strIngredient8}</span>
        </div>
        <div class="bg-info rounded-2 m-1 p-1">
        <span>${meals.meals[0].strIngredient9}</span>
        </div>
        <div class="bg-info rounded-2 m-1 p-1">
        <span>${meals.meals[0].strIngredient10}</span>
        </div>
        </div>
        <div><h5 class="fw-bold">Tags : </h5><button onclick="src()" class="btn btn-success">Source</button>
      <button class="btn btn-danger" onclick="youtube()">Youtube</button>
        </div>
    </div>
    `

    document.querySelector(".mealing #row").innerHTML = temp
}

function src() {
    window.open("${meals.meals[0].strSource}")
}

function youtube() {
    window.open("${meals.meals[0].strYoutube}")
}








//contact us

$(".cont").click(function() {

    $(".mainPage").hide()
    $(".search").hide();
    $(".categories").hide()
    $(".mealsOfcat").hide()
    $(".area").hide()
    $(".mealsOfArea").hide()
    $(".ingredients").hide()
    $(".mainMeals").hide()
    $(".mealing").hide()
    $(".contact").show()
    $(".nav").animate({ "left": -$(".sidenav").outerWidth() }, 500);
    $(".navFa").addClass("fa-bars")
    $(".navFa").removeClass("fa-times")
    
})

var emailReg = /^ [a-zA-Z0-9.! #$%&’+/=?^_` {|}~-]+@ [a-zA-Z0-9-]+ (?:. [a-zA-Z0-9-]+)$/;
var nameReg = /^[a-zA-Z]{1,}$/i
var phoneReg = /"^01[0-2 5]\d{8}$"/
var passReg = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/

var Name = document.querySelector(".namee");
var email = document.querySelector(".email");
var phone = document.querySelector(".phone");
var age = document.querySelector(".age");
var pass = document.querySelector(".pass");
var repass = document.querySelector(".repass");



function nameMatch() {
    
    if(Name.value.match(nameReg)){
        $(".namealert").hide()
        return 1
    }
    else if(Name.value == ""){
        return 0
    }
    else{
        $(".namealert").show()
        return 0
    }
}

function emailMatch() {
    if(email.value.match(emailReg)){
        $(".emailalert").hide()
        return 1
    }
    else if(email.value == ""){
        return 0
    }
    else{
        $(".emailalert").show()
        return 0
    }
}

function phoneMatch() {
 
    if(phone.value.match(phoneReg)){
        $(".phonealert").hide()
        return 1
    }
    else if(phone.value == ""){
        return 0
    }
    else{
        $(".phonealert").show()
        return 0
    }
}

function ageMatch() {
    
    if(age.value > 0){
        $(".agealert").hide()
        return 1
    }
    else if(age.value == ""){
        return 0
    }
    else{
        $(".agealert").show()
        return 0
    }
}

function passMatch() {
  
    if(pass.value.match(passReg)){
        $(".passalert").hide()
        return 1
    }
    else if(pass.value == ""){
        return 0
    }
    else{
        $(".passalert").show()
        return 0
    }
}

function repassMatch() {
   
    if(repass.value==pass.value && passMatch() == 1){
        $(".repassalert").hide()
        return 1
    }
    else if(repass.value == ""){
        return 0
    }
    else{
        $(".repassalert").show()
        return 0
    }
}

function contactUs(x) {
    var n , e , a , p ,pss , rp;
    if(x == 1){
        n = nameMatch()
    }
    else if(x == 2){
        e =  emailMatch()
    }
    else if(x == 3){
        p =  phoneMatch()
    }
    else if(x == 4){
        a =  ageMatch()
    }
    else if(x == 5){
        pss =  passMatch()
    }
    else if(x == 6){
        rp =  repassMatch()
    }
    if(n == 1 && e == 1 && p == 1 && a == 1 && pss == 1 && rp == 1){
        $("#btn").removeClass("disabled")
    }
    else{
        $("#btn").addClass("disabled")
    }
}
