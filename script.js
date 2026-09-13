const menuData = {

starters: [

[
"Paneer Tikka",
"₹280",
"Smoky grilled paneer with aromatic Indian spices.",
"https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=700&q=85"
],

[
"Veg Spring Rolls",
"₹180",
"Crispy rolls filled with fresh vegetables.",
"https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=85"
],

[
"Chicken Wings",
"₹260",
"Crispy, spicy and full of flavour.",
"https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=700&q=85"
],

[
"Hara Bhara Kebab",
"₹220",
"Healthy, tasty and aromatic vegetarian kebabs.",
"https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=85"
]

],

mains: [

[
"Butter Chicken",
"₹320",
"Creamy tomato gravy with tender chicken.",
"https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=700&q=85"
],

[
"Dal Makhani",
"₹240",
"Slow-cooked black lentils with rich cream.",
"https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=85"
],

[
"Paneer Butter Masala",
"₹290",
"Soft paneer in a rich buttery tomato sauce.",
"https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=700&q=85"
],

[
"Biryani",
"₹300",
"Fragrant basmati rice layered with aromatic spices.",
"https://images.unsplash.com/photo-1563379091339-03246963d51a?auto=format&fit=crop&w=700&q=85"
]

],

tandoor: [

[
"Tandoori Chicken",
"₹360",
"Classic chicken marinated in aromatic spices.",
"https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=700&q=85"
],

[
"Tandoori Paneer",
"₹290",
"Charred paneer with peppers and onions.",
"https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=700&q=85"
],

[
"Garlic Naan",
"₹80",
"Soft naan topped with garlic and butter.",
"https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=85"
],

[
"Malai Tikka",
"₹310",
"Creamy marinated tikka grilled to perfection.",
"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=85"
]

],

desserts: [

[
"Gulab Jamun",
"₹120",
"Warm, soft and perfectly sweet.",
"https://images.unsplash.com/photo-1605196560546-712617b4b9a1?auto=format&fit=crop&w=700&q=85"
],

[
"Rasmalai",
"₹150",
"Soft cheese dumplings in chilled saffron milk.",
"https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=700&q=85"
],

[
"Kesar Kulfi",
"₹140",
"Traditional creamy saffron ice cream.",
"https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=700&q=85"
],

[
"Chocolate Brownie",
"₹180",
"Warm chocolate brownie with a rich centre.",
"https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&w=700&q=85"
]

],

drinks: [

[
"Mango Lassi",
"₹130",
"Creamy mango yoghurt drink.",
"https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=700&q=85"
],

[
"Masala Chai",
"₹90",
"Traditional Indian tea with aromatic spices.",
"https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=700&q=85"
],

[
"Fresh Lime Soda",
"₹100",
"Refreshing sweet and salty lime soda.",
"https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=700&q=85"
],

[
"Berry Mocktail",
"₹180",
"Fruity, refreshing and beautifully balanced.",
"https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=700&q=85"
]

]

};


/* CART */

let cart =
JSON.parse(localStorage.getItem("elanCart") || "[]");


function rupee(value){

return Number(
value.replace("₹","")
);

}


function saveCart(){

localStorage.setItem(
"elanCart",
JSON.stringify(cart)
);

renderCart();

}


/* MENU */

function renderMenu(category="starters"){

const menuGrid =
document.getElementById("menuGrid");


menuGrid.innerHTML = "";


menuData[category].forEach(
(item,index)=>{

const card =
document.createElement("article");


card.className =
"menu-card";


card.innerHTML = `

<img
src="${item[3]}"
alt="${item[0]}"
loading="lazy">

<div class="menu-info">

<div class="menu-title">

<h3>${item[0]}</h3>

<span class="price">
${item[1]}
</span>

</div>

<p>
${item[2]}
</p>

<button
class="add"
data-category="${category}"
data-index="${index}">

+ Add to order

</button>

</div>
`;


menuGrid.appendChild(card);

});

}


/* ADD TO CART */

function addItem(item){

const existing =
cart.find(
product =>
product.name === item[0]
);


if(existing){

existing.qty++;

}else{

cart.push({

name:item[0],

price:item[1],

img:item[3],

qty:1

});

}


saveCart();

openCart();

}


/* RENDER CART */

function renderCart(){

const count =
cart.reduce(
(total,item)=>
total + item.qty,
0
);


document.getElementById(
"cartCount"
).textContent=count;


const container =
document.getElementById(
"cartItems"
);


if(cart.length===0){

container.innerHTML = `

<div style="
padding:30px 0;
color:#777;
font-size:13px">

Your cart is empty 🍽️

</div>

`;

}else{

container.innerHTML =
cart.map(
(item,index)=>`

<div class="cart-row">

<img
src="${item.img}"
alt="${item.name}">

<div>

<h4>
${item.name}
</h4>

<small>
${item.price}
</small>

<div class="qty">

<button
data-minus="${index}">
−
</button>

<span>
${item.qty}
</span>

<button
data-plus="${index}">
+
</button>

</div>

</div>

<b>
₹${rupee(item.price)*item.qty}
</b>

</div>

`
).join("");

}


const total =
cart.reduce(
(sum,item)=>
sum +
rupee(item.price)*item.qty,
0
);


document.getElementById(
"cartTotal"
).textContent =
"₹"+total;

}


/* OPEN CART */

function openCart(){

document
.getElementById("cart")
.classList
.add("open");

document
.getElementById("backdrop")
.classList
.add("show");

}


/* CLOSE CART */

function closeCart(){

document
.getElementById("cart")
.classList
.remove("open");

document
.getElementById("backdrop")
.classList
.remove("show");

}


/* MENU TABS */

document
.getElementById("tabs")
.addEventListener(
"click",
function(event){

if(
event.target.tagName !==
"BUTTON"
)return;


document
.querySelectorAll(".tabs button")
.forEach(
button =>
button.classList.remove(
"active"
)
);


event.target.classList.add(
"active"
);


renderMenu(
event.target.dataset.cat
);

});


/* ADD BUTTON */

document
.getElementById("menuGrid")
.addEventListener(
"click",
function(event){

const button =
event.target.closest(".add");


if(!button)return;


const category =
button.dataset.category;


const index =
button.dataset.index;


addItem(
menuData[category][index]
);

});


/* CART QUANTITY */

document
.getElementById("cartItems")
.addEventListener(
"click",
function(event){

const plus =
event.target.dataset.plus;

const minus =
event.target.dataset.minus;


if(plus !== undefined){

cart[plus].qty++;

}


if(minus !== undefined){

cart[minus].qty--;


if(cart[minus].qty <= 0){

cart.splice(minus,1);

}

}


saveCart();

});


/* CART BUTTONS */

document
.getElementById("cartBtn")
.onclick=openCart;


document
.getElementById("closeCart")
.onclick=closeCart;


document
.getElementById("backdrop")
.onclick=closeCart;


document
.getElementById("clearCart")
.onclick=function(){

cart=[];

saveCart();

};


/* CHECKOUT */

document
.getElementById("checkoutBtn")
.onclick=function(){

if(cart.length===0){

alert(
"Please add at least one item."
);

return;

}


document
.getElementById(
"checkoutBackdrop"
)
.classList
.add("show");

};


document
.getElementById("closeCheckout")
.onclick=function(){

document
.getElementById(
"checkoutBackdrop"
)
.classList
.remove("show");

};


/* CHECKOUT FORM */

document
.getElementById("checkoutForm")
.addEventListener(
"submit",
function(event){

event.preventDefault();


const type =
document.getElementById(
"cType"
).value;


const address =
document.getElementById(
"cAddress"
).value.trim();


if(
type==="Delivery" &&
!address
){

alert(
"Please enter delivery address."
);

return;

}


const orderId =
"ELN-" +
Math.floor(
10000 +
Math.random()*90000
);


document.getElementById(
"checkoutMsg"
).textContent =

`✓ Demo order ${orderId}
placed successfully.
No real payment was processed.`;


cart=[];

saveCart();

});


/* WHATSAPP ORDER */

document
.getElementById("whatsappBtn")
.onclick=function(){

if(cart.length===0){

alert(
"Please add items first."
);

return;

}


const orderText =
cart.map(
item =>

`${item.name} x${item.qty} = ₹${
rupee(item.price)*item.qty
}`

).join("%0A");


const total =
cart.reduce(
(sum,item)=>
sum +
rupee(item.price)*item.qty,
0
);


const message =

`Hello ÉLAN,%0A%0AI would like to order:%0A${orderText}%0A%0ATotal: ₹${total}`;


window.open(

`https://wa.me/919876543210?text=${message}`,

"_blank"

);

};


/* MOBILE MENU */

document
.getElementById("hamburger")
.onclick=function(){

document
.getElementById("nav")
.classList
.toggle("open");

};


document
.querySelectorAll("nav a")
.forEach(
link => {

link.onclick=function(){

document
.getElementById("nav")
.classList
.remove("open");

};

});


/* RESERVATION */

document
.getElementById("rDate")
.min =
new Date()
.toISOString()
.split("T")[0];


document
.getElementById("reservationForm")
.addEventListener(
"submit",
function(event){

event.preventDefault();


const name =
document.getElementById(
"rName"
).value;


const id =
"RSV-" +
Math.floor(
1000 +
Math.random()*9000
);


document.getElementById(
"reservationMsg"
).textContent =

`✓ Reservation ${id}
requested for ${name}.`;

});


/* BACK TO TOP */

window.addEventListener(
"scroll",
function(){

document
.getElementById("top")
.classList
.toggle(
"show",
window.scrollY > 600
);

});


document
.getElementById("top")
.onclick=function(){

window.scrollTo({

top:0,

behavior:"smooth"

});

};


/* YEAR */

document.getElementById(
"year"
).textContent =
new Date().getFullYear();


/* INITIAL LOAD */

renderMenu();

renderCart();