let carts=document.querySelectorAll(".fa-shopping-cart");
let products=[
    {
        name:'soup',
        tag:'soup',
        price:30,
        incart:0

    },
    {
        name:'cake',tag:'cake',
        price:30,
        incart:0

    },
    {
        name:'starter',tag:'starter',
        price:30,
        incart:0

    },
    {
        name:'paneer',tag:'paneer',
        price:30,
        incart:0

    },
    {
        name:'rice',tag:'rice',
        price:30,
        incart:0

    },
    {
        name:'samose',tag:'samose',
        price:30,
        incart:0

    },
    {
        name:'paneer tikka',tag:'paneertikka',
        price:30,
        incart:0

    },
    {
        name:'eggfry',tag:'eggfry',
        price:30,
        incart:0

    },{
        name:'dal',tag:'dal',
        price:30,
        incart:0

    },
    {
        name:'pasta',tag:'pasta',
        price:30,
        incart:0

    },{
        name:'chicken',tag:'chicken',
        price:30,
        incart:0

    },{
        name:'salad',tag:'salad',
        price:30,
        incart:0

    }
];
for(let i=0; i<carts.length; i++){
    carts[i].addEventListener('click', ()=>{
        cartnumber(products[i]);
        totalcost(products[i]);
    })
}
function onload(){
    let meal=localStorage.getItem('cartnumber');
    if(meal){
        document.querySelector(".order-lg-last span").textContent=meal;
    }
}
function cartnumber(product){
    
    let meal=localStorage.getItem('cartnumber');
    meal=parseInt(meal);
    if(meal){
    localStorage.setItem('cartnumber',meal+1);
    document.querySelector(".order-lg-last span").textContent=meal+1;

}else{
localStorage.setItem('cartnumber',1);
document.querySelector(".order-lg-last span").textContent=1;
}
setitem(product);
}
function setitem(product){
    // console.log('hello');
    let cartitem=localStorage.getItem("productincart");
    // console.log(cartitem);
    cartitem=JSON.parse(cartitem);
    // console.log(cartitem);
    if(cartitem != null){
        if(cartitem[product.tag] == undefined){
            cartitem={
                ...cartitem,
                [product.tag]:product
            }
        }
        cartitem[product.tag].incart += 1;
    }
   else{
    product.incart=1;
    cartitem={
        [product.tag]:product
    }
   }
    localStorage.setItem("productincart",JSON.stringify(cartitem));
}

function totalcost(product){
    let cartcost=localStorage.getItem("cost");
    
    if(cartcost != null){
        cartcost=parseInt(cartcost);
        localStorage.setItem("cost",cartcost+product.price);
    }
    else{
        localStorage.setItem("cost",product.price);
    }
    // localStorage.setItem("cost",product.price);
}
function dispaly(){
    let cartitem= localStorage.getItem("productincart");
    cartitem= JSON.parse(cartitem);
    
    let procon=document.querySelector(".produc");
    let  cartcost=localStorage.getItem("cost");
    if(cartitem && procon ){
       procon.innerHTML='';
       Object.values(cartitem).map(item=>{
        procon.innerHTML += `<tr >
        <td><a href="" style="text-decoration:none;color:red; font-size:20px"><i class="fas fa-times"></i></a></td>\
        <td><img src="../images/10.jpg" style="width:100px; height:100px;" class="myimgs"></td>
        <td>${item.name}</td>
        <td>$${item.price}.00</td>
        <td>
        <a href="" style="text-decoration:none;color:#c75643; font-size:20px"><i class="fas fa-minus-square"></i></a>
        ${item.incart}
        <a href="" style="text-decoration:none;color:#61b15a; font-size:20px"><i class="fas fa-plus-square"></i></a>
        </td>
        <td>$${item.incart * item.price}.00</td>  
        </tr>      
        `
       });
       document.querySelector(".pages").innerHTML=`
       $${cartcost}.00
       `
    }
}
dispaly(); 
onload();