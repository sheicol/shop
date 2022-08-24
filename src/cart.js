let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};
calculation();

let generateCartItems = ()=> {
    if(basket.length !== 0){
        return (ShoppingCart.innerHTML = basket
            .map((x) => {
                console.log(x);
                let { id, item } = x;
                let search = shopItemsData.find((y) => y.id === id) || [];
            return `
        <div class= "cart-item">
            <img width = "100" src=${search.img} alt=""/>
            <div class="details">

                <div class="title-price-x">
                    <h4 class="title-price">
                        <p>${search.name}</p>
                        <p class ="cart-item-price">$ ${search.price}</p>
                    </h4>
                    <i class="bi bi-x-lg"></i>
                </div>
                    
                <div class="buttons">
                    <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                    <div id=${id} class="quantity">${item}</div>
                    <i onclick="increment(${id})" class="bi bi-plus"></i>
                </div>  
                
                <h3></h3>
                </div> 
        </div>
        `;
        })
        .join(""));
}   else{
    ShoppingCart.innerHTML = ``;
    label.innerHTML = `
    <h2>Cart is Empty</h2>
    <a href="index.html">
    <button class="HomeBtn">Back To Home</button>
    </a>
    `;
    }
};


generateCartItems();

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    } else {
        search.item += 1;
    }
    
    //console.log( basket);
    update(selectedItem.id);
    localStorage.setItem("data", JSON.stringify(basket));
};

//funciones para disminuir items de c/card
let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
        search.item -= 1;
    }
    update(selectedItem.id);
    //esta cesta es un array
    basket = basket.filter((x) => x.item !== 0);
    //console.log( basket);
    //the localstorage va en al final para poder hacer los updates pertinentes.
    localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    //console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
};

