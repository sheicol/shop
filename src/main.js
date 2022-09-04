let shop = document.getElementById('shop');
//almacenamiento de los datos de cada card


//local stORAGE para que en la applicacion se muestren los datos de los items agrgados o removidos
let basket = JSON.parse(localStorage.getItem("data")) || [];
//funcion para cambiar los detalles de cada card.(template)
let generateShop = () => {
    return (shop.innerHTML = shopItemsData
        .map((x) => {
            let {
                id,
                name,
                price,
                description,
                img
            } = x;
            let search = basket.find((x) => x.id === id) || [];
            return `
        <div  id=product-id-${id} class="item">
            <img width="220" height="280" src=${img} alt="">
            <div class="details">
                <h3>${name}</h3>
                <p>${description}</p>
                <div class="price-quantity">
                    <h2>$ ${price}</h2>
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">\
                        ${search.item === undefined? 0: search.item}
                        </div>
                        <i onclick="increment(${id})" class="bi bi-plus"></i>
                </div>
            </div>
        </div>
    </div> `;
        }).join(""));
};

generateShop();

//funciones para incrementar items de c/card
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

//funcion para actualizar los items de c/card
let update = (id) => {
    let search = basket.find((x) => x.id === id);
    //console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
};

//funcion para anadir los items al carrito.
let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};
calculation();