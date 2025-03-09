var prodName = document.getElementById("prodname");
var prodPrice = document.getElementById("prodprice");
var prodCateg = document.getElementById("prodcategory");
var prodDesc = document.getElementById("proddesc");
var mainindex;
var products =[];

if(localStorage.getItem("products") != null){
    products = JSON.parse(localStorage.getItem("products"));
    displayProducts(products);
}

function addProduct(){
    var product = {
        name : prodName.value ,
        price : prodPrice.value,
        categ : prodCateg.value,
        desc : prodDesc.value
    }

    if(document.getElementById("addbtn").innerHTML == "Add Product"){
    products.push(product);
    } 
    else{
        products.splice(mainindex,1,product)
        document.getElementById("addbtn").innerHTML = "Add Product"
    }

    localStorage.setItem("products" , JSON.stringify(products))
    displayProducts(products);
    clear();
}

function displayProducts(prodArray){
    var temp = "";
    for(var i = 0 ; i < prodArray.length ; i++){

        temp += `<tr><td>${i}</td>
        <td>${prodArray[i].name}</td>
        <td>${prodArray[i].price}</td>
        <td>${prodArray[i].categ}</td>
        <td>${prodArray[i].desc}</td>
        <td><button onclick="updateProduct(${i})" class="btn btn-outline-warning">Update</button></td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger">Delete</button></td>
        </tr>
        `

    }

    document.getElementById("tbody").innerHTML=temp;
}

function updateProduct(index){
    mainindex = index;
    document.getElementById("addbtn").innerHTML = "Update Product";
    prodName.value = products[index].name;
    prodprice.value = products[index].price;
    prodCateg.value = products[index].categ;
    prodDesc.value = products[index].desc;
}

function clear(){
    prodName.value="";
    prodPrice.value="";
    prodCateg.value="";
    prodDesc.value="";
    
}

function deleteProduct(index){
    products.splice(index,1);
    displayProducts(products);
    localStorage.setItem("products" , JSON.stringify(products))
}

function searchProduct(){
    var search = document.getElementById("srch").value;
    console.log(search);
    var tempArray = []
        for (var i = 0; i < products.length; i++) {
            if (products[i].name.toLowerCase().includes(search.toLowerCase())) {
                tempArray.push(products[i]);
            }
        }
        console.log(tempArray);
        displayProducts(tempArray)
    
}