document.addEventListener("DOMContentLoaded",()=>{
    const addToCartButtons=document.querySelectorAll(".add-to-cart");
    const cartItemCount=document.querySelector(".cart-icon span");
    const carItemsList=document.querySelector(".cart-items")
    const cartTotal=document.querySelector(".cart-total");
    const cartIcon=document.querySelector(".cart-icon");
    const sidebar=document.getElementById("sidebar");
    let cartItems=[];
    let TotalAmount=0;
    addToCartButtons.forEach((button,index)=>
    {
        button.addEventListener("click",()=>{
    const item={
        name: document.querySelectorAll(".card .card--title")[index].textContent,
        price: parseFloat(document.querySelectorAll(".price")[index].textContent.slice(0,-4)),quantity:1,
    };
    console.log(cartItems)
    const exisitingItem=cartItems.find(
        (cartItem)=>cartItem.name===item.name
    );
    if(exisitingItem){
        exisitingItem.quantity++;
    }
    else{
        cartItems.push(item);
    }
    TotalAmount +=item.price;
    updateCartUI();
        });
        function updateCartUI(){
            updateCartItemCount(cartItems.length);
            updateCartItemList();
            updateCartTotal();
    
        }
        function  updateCartItemCount(count){
            cartItemCount.textContent=count;
    
        }
        function updateCartItemList() {
            carItemsList.innerHTML="";
            cartItems.forEach((item,index)=>{
    const cartItem=document.createElement("div");
    cartItem.classList.add("cart-item","individual-cart-item");
    cartItem.innerHTML=`
    <span>(${item.quantity}×)${item.name}</span>
    <span class="cart-item-price">${(item.quantity*item.price).toFixed(2)}JOD</span>
    <button class="remove-item" data-index="${index}"><i class="fa-solid fa-times"></i></button>
    `;
    carItemsList.append(cartItem);
    
    
            });
            const removeButtons=document.querySelectorAll(".remove-item");
            removeButtons.forEach((button)=>{
                button.addEventListener('click',(event)=>{
                    const index=event.target.dataset.index;
                    removeItemFromCart(index);
                })
            });
    
        }
    function removeItemFromCart(index){
        const removeItem=cartItems.splice(index,1)[0];
        TotalAmount -=removeItem.price *removeItem.quantity;
        updateCartUI();
    }
    function updateCartTotal(){
        cartTotal.textContent=`${TotalAmount.toFixed(2)}JOD`;
    }
    cartIcon.addEventListener('click',()=>{
        sidebar.classList.toggle('open');
    })
    const closeButton=document.querySelector(".sidebar-close");
    closeButton.addEventListener('click',()=>{
        sidebar.classList.remove('open');
    
    });
    
    });
    
    });