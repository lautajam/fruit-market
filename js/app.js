
const cart = document.querySelector("#cart");
const templateList = document.querySelector("#templateList");
const bill = document.querySelector("#bill");
const templateBill = document.querySelector("#templateBill");
const shopping = document.querySelector("#shopping");
const templateShopping = document.querySelector("#templateShowShopping");

const toastLiveExample = document.querySelector("#liveToast");

const fragment = document.createDocumentFragment();
let ArrayCart = [];

document.addEventListener("click", e => {

    if (e.target.matches(".card .btn-outline-dark")) {
        addToCart(e)
    }

    if (e.target.matches(".list-group-item .btn-success")) {
        btnIncrease(e);
    }

    if (e.target.matches(".list-group-item .btn-danger")) {
        btnDecrease(e);
    }

    if (e.target.matches("#btnBill")) {
        const toast = new bootstrap.Toast(toastLiveExample)
        toast.show()
        
        console.log(ArrayCart);
        printShopping();

        cartEmpty();
        console.log(ArrayCart);

    }
});

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
        ArrayCart[index].quantity++;
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

    printBill();
}

const printBill = () => {
    // console.log("print fruit");

    bill.textContent = "";

    const total = ArrayCart.reduce(
        (acc, current) => acc + current.quantity * current.price, 0
    )
    console.log(total);

    const clone = templateBill.content.cloneNode(true);
    clone.querySelector("span").textContent = total;
    fragment.appendChild(clone);
    bill.appendChild(fragment);

    if (total === 0) {
        bill.textContent = "";
    }
}

// NO TERMINADA
const printShopping = () => {

    shopping.textContent = "";

    console.log("Hola shoppeo")

    ArrayCart.forEach(item => {
        console.log(templateShopping);
        const clone = templateShopping.content.cloneNode(true);
        clone.querySelector(".lead").textContent = item.title;
        clone.querySelector(".small").textContent = item.quantity;
        clone.querySelector(".text-decoration-underline").textContent = "(" + item.price + ")";
        clone.querySelector(".fw-bold").textContent = item.price * item.quantity;

        fragment.appendChild(clone);    

    });

    shopping.appendChild(fragment);

}
// NO TERMINADA

const cartEmpty = () => {
    bill.textContent = "";
    cart.textContent = "";
    ArrayCart = [];

    const p = document.createElement("p");
    p.className = "text-center h3";
    p.textContent = "- Empty -";
    fragment.appendChild(p);
    cart.appendChild(fragment);
}

const btnIncrease = e => {
    // console.log("me diste click ", e.target.dataset.id)
    ArrayCart = ArrayCart.map(item => {
        if (item.id === e.target.dataset.id) {
            item.quantity++;
        }
        return item;
    })
    printCart();
};

const btnDecrease = e => {
    // console.log("me diste click ", e.target.dataset.id)
    ArrayCart = ArrayCart.filter(item => {
        if (item.id === e.target.dataset.id) {
            if (item.quantity > 0) {
                item.quantity--;
                if (item.quantity === 0) {
                    return;
                }
                return item;
            }
        } else { return item }
    })
    printCart();
};