
const cart = document.querySelector("#cart");
const templateList = document.querySelector("#templateList");
const bill = document.querySelector("#bill");
const templateBill = document.querySelector("#templateBill");  

const fragment = document.createDocumentFragment();
let ArrayCart = [];

document.addEventListener("click", e =>{
    if (e.target.matches(".card .btn-outline-dark")) {
        addToCart(e)
    }

    // console.log(e.target.matches(".list-group-item .btn-success"));
    // console.log(e.target.matches(".list-group-item .btn-danger"));
    if (e.target.matches(".list-group-item .btn-success")) {
        btnIncrease(e);
    }
    if (e.target.matches(".list-group-item .btn-danger")) {
        btnDecrease(e);
    }
})

const addToCart = (e) => {

    console.log(e.target.dataset.fruit);

    const product = {
        title: e.target.dataset.fruit,
        id: e.target.dataset.fruit,
        quantity: 1,
        price: parseFloat(e.target.dataset.price)
    }
    // console.log(product);

    const index = ArrayCart.findIndex(item => item.id === product.id)
    // console.log(index);

    if (index === -1) {
     ArrayCart.push(product);
    } else {
        ArrayCart[index].quantity ++;
        // ArrayCart[index].price = ArrayCart[index].quantity * product.price;
    }
    console.log(ArrayCart)
    printCart();
}

const printCart = () => {

    cart.textContent = "";

    ArrayCart.forEach(item => {
        const clone = templateList.content.cloneNode(true);
        clone.querySelector(".lead").textContent = item.title;
        clone.querySelector(".badge").textContent = item.quantity;
        clone.querySelector("div #total span").textContent = item.price * item.quantity;
        clone.querySelector(".btn-danger").dataset.id = item.id;
        clone.querySelector(".btn-success").dataset.id = item.id;

        fragment.appendChild(clone);

    });

    cart.appendChild(fragment);
}

const btnIncrease = e => {
    console.log("me diste click ", e.target.dataset.id)
    ArrayCart = ArrayCart.map(item =>{
        if (item.id === e.target.dataset.id) {
            item.quantity++;
        }
        return item;
    })
    printCart();
};

const btnDecrease = e => {
    console.log("me diste click ", e.target.dataset.id)
    ArrayCart = ArrayCart.filter(item =>{
        if (item.id === e.target.dataset.id) {
            if (item.quantity > 0) {
                item.quantity--;
                if (item.quantity === 0) return;
                return item;
            }
        } else { return item}
    })
    printCart();
};