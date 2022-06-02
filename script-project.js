//Start Get/Create all tag elements and the declaration
var cart = document.getElementById("shopcart");
var span = document.getElementsByClassName("close")[0];
var span1 = document.getElementsByClassName("close")[1];
var successModal = document.getElementById('successSection'); 
var summaryDiv = document.getElementsByClassName('summaryDiv')[0];
var modal = document.getElementById("modalSection");
var addToCart = document.getElementsByClassName("addToCart");
var modaltable = document.getElementById("modaltable");
var tableHead = document.getElementById('table');
var naira = document.getElementById("naira");
var pr1 = document.getElementById("pr1");
var pr2 = document.getElementById("pr2");
var pr3 = document.getElementById("pr3");
var pr4 = document.getElementById("pr4");
var pr5 = document.getElementById("pr5");
var pr6 = document.getElementById("pr6");
var checkoutbtn = document.getElementsByClassName('modalbtn')[1];
var continuebtn = document.getElementsByClassName('modalbtn')[0];
var productSect = document.getElementById('products');
var hovers =  productSect.getElementsByClassName('imagesPr');
var hovered =  productSect.getElementsByClassName('PriceDiv');
var quantCell = document.createElement('tr');
var increase = quantCell.insertCell(0);
var increaseBTN = document.createElement("button");
increaseBTN.innerHTML = "+" ;
increase.innerHTML = increaseBTN;
var count = quantCell.insertCell(1);
count.innerHTML = 1 ;
var decrease = quantCell.insertCell(2); 
var decreaseBTN = document.createElement("button");
decreaseBTN.innerHTML = "-" ;
decrease.innerHTML = decreaseBTN;
var index = 0;
var Total = 0;
var allPrice;
var allQuantity; 
var Remove;
var incr = 0;
var decr = 0;
var m = 0; 

// End Get/Create all tag elements and the declarations




// OPENNING OF MODAL WINDOW 
cart.onclick = function() {
    modal.style.display = "block";
    // console.log("cart is clicked");
    allPrice = tableHead.getElementsByClassName('price');
    allQuantity = tableHead.getElementsByClassName('quant');
    UpdateTotal();    
    Remove = document.getElementsByClassName('remove');
   
    // console.log(parseFloat(allPrice[0].innerText.replace('₦', '')));
    // console.log(parseFloat(allQuantity[0].innerText));

        
  }

  //UPDATE TOTAL AMOUONT
  function UpdateTotal ()
  {
    for (let j = 0; j < tableHead.getElementsByClassName('price').length; j++) {
        Total = Total + (parseFloat(tableHead.getElementsByClassName('price')[j].innerText.replace('₦', ''))
        * parseFloat( tableHead.getElementsByClassName('quant')[j].innerText));
        
        // console.log(parseFloat(allPrice[j].innerText.replace('₦', '')));
        // console.log(parseFloat(allQuantity[j].innerText));
        // console.log(Total);
        
    }
    naira.innerText = "₦" + Total;
    
  }

  //REMOVING CART ROW
  function removeItem(event)
  {
    Total = 0;
    event.target.parentElement.parentElement.remove();
    UpdateTotal();
    decreaseCartNum();
  }

  

  //CHANGE THE QUANTITY AND AMOUNT USING INCREAMENT AND DECREAMENT
  function increament(event) {
      Total = 0;      
      number = parseFloat(event.target.parentElement.getElementsByClassName('quant')[0].innerText); 
      number = number + 1; 
      event.target.parentElement.getElementsByClassName('quant')[0].innerText = number;  
    //   console.log(number);
      UpdateTotal();
  }

  function decreament(event) {
    Total = 0;      
      number = parseFloat(event.target.parentElement.getElementsByClassName('quant')[0].innerText); 

      if (number == 1 || number < 1) {
        number = 1;
        alert("You can't enter a less than 1 quantity in the Cart, if you wish to remove, please click Remove button!") 
        return;
        }

    else {   
        number = number - 1; 
        event.target.parentElement.getElementsByClassName('quant')[0].innerText = number;
        // console.log(number);
        UpdateTotal();
    
        }
}

    
// CLOSING OF MODAL WINDOW
  span.addEventListener('click' , closeModal);
  span1.addEventListener('click' , function() { 
//   { closeModal(); closingCart();
     document.location.reload() } );

  function closeModal() { 
    modal.style.display = "none";
    successModal.style.display = "none"
  }

//   CHECKOUT FUNCTION
    checkoutbtn.addEventListener("click" , function () {   
    closeModal();
    payWithPaystack();
    
    
})

// REMOVE ALL CARTS ITEMS FUNCTION
function closingCart() {
    
    while (tableHead.hasChildNodes())
    
       {tableHead.removeChild(tableHead.firstChild)}
       Total = 0;

    naira.innerText = Total;
    decreaseCartNum();
}

// CONTINUE SHOPPING BUTTON
continuebtn.addEventListener('click' , closeModal);


// POPULATE SUMMARY MODAL
function addToSummary ( ) {

    var name = document.getElementById("modalName").value; 
    document.getElementById('customerName').innerText = name ;

    let newtable = tableHead ;
    let i = 1;  
   
    while (i<newtable.rows.length) { 
        newtable.rows[i].cells[4].remove();          
        newtable.rows[i].cells[3].childNodes[1].remove();
        newtable.rows[i].cells[3].childNodes[4].remove();        
        i++;
     }
        
    summaryDiv.append(newtable);
    successModal.style.display = 'block';    
}

// PRODUCT OBJECTS
var products = [{
            index: 1,
            id: 'product1',
            name: 'SAMSUNG TV',
            price: 50000,
            buttonID: "pr1"
            
        },
        {
            index: 2,
            id: 'product2',
            name: 'PIXEL 4A',
            price: 25000, 
            buttonID: "pr2"
        },
        {
            index: 3,
            id: 'product3',
            name: 'PS 5',
            price: 30000,
            buttonID: "pr3"
        },
        {
            index: 4,
            id: 'product4',
            name: 'MACBOOK AIR',
            price: 80000,
            buttonID: "pr4"
        },
        {
            index: 5,
            id: 'product5',
            name: 'APPLE WATCH',
            price: 95000,
            buttonID: "pr5"
        },
        {
            index: 6,
            id: 'product6',
            name: 'AIR PODS',
            price: 75000,
            buttonID: "pr6"
        }

]
// END OF PRODUCT OBJECTS

function IncreaseCartNum() {
    var cartCount = parseFloat(document.getElementById('cartID').innerText);
    cartCount = cartCount + 1; 
    document.getElementById('cartID').innerText = cartCount;
}

function decreaseCartNum() {
    var cartCount = parseFloat(document.getElementById('cartID').innerText);
    cartCount = tableHead.children.length - 1;
    // cartCount = cartCount - 1; 
    if (cartCount < 0) { cartCount = 0 } 
        
    document.getElementById('cartID').innerText = cartCount;
}


// FORM VALIDATION FUNCTION

function validName(){

    if (document.getElementById('modalName').value == "") 
      {   document.getElementsByClassName("errorColumn")[0].innerText = "Please enter your first name and last name";
        
        }  
        else {document.getElementsByClassName("errorColumn")[0].style.display = 'none' ;}
}

function validEmail(){
    if (! /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test((document.getElementById('modalEmail').value)))
        
    { 
        document.getElementsByClassName("errorColumn")[1].innerHTML = "Please enter a valid emaili address";
        
    }
    else {document.getElementsByClassName("errorColumn")[1].style.display = 'none'};
}

function validationNumber() {

    let formIDNum = document.getElementById('modalPhone').value;
    let text; 
    if (isNaN(formIDNum) ||  formIDNum.length !== 11 )

    {  
        document.getElementsByClassName("errorColumn")[2].innerText = "Please enter a valid phone number of 11 digit";
        console.log(formIDNum.length)  
    }

    else {document.getElementsByClassName("errorColumn")[2].style.display = 'none';}
    
}
// END ALL FORM VALIDATION FUNCTION

   
// ADD TO CART LISTENER, CREATION OF MODAL VIEW
Array.from(addToCart).forEach(element => {

        var counter = 0;
        
        element.onclick =  function name(){

          counter ++;
        //   console.log( this.id + ' has been clicked ' + counter + ' times' );
          var btn = element.id;                
                
               if (element.innerText == "ADD TO CART" && counter == 1 ) {
    
                        element.innerText = "REMOVE FROM CART";  /* On Click, change text to Remove from cart */
                        element.style.backgroundColor = 'yellow'; /* Change the background on click */
    
                        IncreaseCartNum();  /* Increase the cart counter by 1 */
                    
                    //  START FIND FUNCTION          
                        function matchID(product){                 
                            return product.buttonID == btn ;    
                        }            
                        var productOBJ = products.find(matchID); //Get the product object of the cart clicked using find function
                        // console.log(productOBJ.name);
                    // END FIND FUNCTION 
                            
                    
                    //CREATE A MODAL ROW AND APPEND CELLS
                    var newRow = document.createElement("tr");
                    newRow.innerHTML = 
                    `
                        <td class="serial">${ index} </td>
                        <td class="item">${productOBJ.name}</td>
                        <td class="price">₦${productOBJ.price} </td>
                        <td class="quantity">
                            <button id="icreament" class="increaseCL" type="button"> + </button>
                            <span class="quant" id="quantID"> 1 </span>                
                            <button id="decrease" type="button" class="decreaseCL"> - </button>
                        </td>
                        <td>
                            <button class="remove" type="button"> Remove </button>
                        </td>
                    `;
    
                    newRow.style.textAlign = "center";
                    tableHead.append(newRow); 
                    newRow.getElementsByClassName('remove')[0].addEventListener('click' , removeItem); /* Add event to remove row on remove click */ 
                    newRow.getElementsByClassName('increaseCL')[0].addEventListener('click' , increament); /* Add event to remove row on remove click */
                    newRow.getElementsByClassName('decreaseCL')[0].addEventListener('click' , decreament); /* Add event to remove row on remove click */      
                                
               }           
           
                       
                else if (element.innerText == "REMOVE FROM CART" && counter == 2 ) {
    
                element.innerText = "ADD TO CART";  /* On Click, change back to add to cart */
                element.style.backgroundColor = 'rgb(228, 74, 74)'; /* Change the background on click */
               
    
                for (const a of tableHead.querySelectorAll("td")) {

                    if (a.innerText.includes(element.parentElement.getElementsByTagName("b")[0].innerText)) {                     
                      a.parentElement.remove();
                      console.log(a.innerText)
                    }
                  }

                  decreaseCartNum();
    
                   
               } 
               
               else { 
                   alert("You cant add items to cart more than ones, please click on cart to add more quantities")
               }

          
        }
    });

//  END ADD TO CART LISTENER, CREATION OF MODAL VIEW


// ADD HOVER EVENT LISTENER ON PRODUCT  

    for (let index = 0; index < hovers.length; index++) {

        hovers[index].addEventListener("mouseover", function() {hovered[index].style.display = 'block';})
        hovers[index].addEventListener("mouseout", function() {hovered[index].style.display = 'none';})      
     
    }
// END HOVER EVENTS ON PRODUCT



//  PAYSTACK FUNCTION CALL
function payWithPaystack(e) {
   
    let handler = PaystackPop.setup({
      key: 'pk_test_8ed8107298f1d6f83f591d26535a6b77a3e62134', // Replace with your public key
      email: document.getElementById("modalEmail").value,     
      amount: parseFloat(naira.innerText.replace('₦', '')) * 100,

      ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
      // label: "Optional string that replaces customer email"
      onClose: function(){
        alert('Window closed.');
      },
      callback: function(){
        addToSummary()
      }
    });
    handler.openIframe();
  }


