let shop = document.getElementById('shop');

//almacenamiento de los datos de cada card
let shopItemsData = [{
        id: "SetLorena",
        name: "Set Lorena",
        price: 170,
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
        img: "multimedia/b&gcorset.jpeg"
    },
    {
        id: "Redset",
        name: "Red Set",
        price: 120,
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
        img: "multimedia/redset.jpeg"
    },
    {
        id: "DreamSEt",
        name: "Dream Set",
        price: 130,
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
        img: "multimedia/blackcorset.jpeg"
    },
    {
        id: "Blackset",
        name: "Black Set",
        price: 150,
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
        img: "multimedia/blackset.jpeg"
    },
    {
        id: "GoldBlackPantie",
        name: "Lorena Pantie",
        price: 50,
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
        img: "multimedia/goldblackpanti.jpeg"
    },
    {
        id: "RedPantie",
        name: "Red Pantie",
        price: 50,
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
        img: "multimedia/redpantie.jpeg"
    },
    {
        id: " DReampantie",
        name: "Dream Pantie",
        price: 50,
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
        img: "multimedia/blackcorpant.jpeg"
    },
    {
        id: "blackpanti",
        name: "Black Pantie",
        price: 50,
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
        img: "multimedia/blacpanti.jpeg"
    },
]

//local stORAGE para que en la applicacion se muestren los datos de los items agrgados o removidos
let basket = JSON.parse(localStorage.getItem("data")) || [];
//funcion para cambiar los detalles de cada card.
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
                        <div id=${id} class="quantity">0</div>
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
    localStorage.setItem("data", JSON.stringify(basket));
    //console.log( basket);
    update(selectedItem.id);
};

//funciones para disminuir items de c/card
let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search.item === 0) return;
    else {
        search.item -= 1;
    }
    localStorage.setItem("data", JSON.stringify(basket));
    //console.log( basket);
    update(selectedItem.id);
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