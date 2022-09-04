
const cart = document.querySelector("#cart");
const template = document.querySelector("#template");
const fragment = document.createDocumentFragment();
const btns = document.querySelectorAll(".btn");

const ObjectCart = {};

const addToCart = (e) => {
    console.log(e.target.dataset.fruit);

    const product = {
        title: e.target.dataset.fruit,
        id: e.target.dataset.fruit,
        quantity: 1
    }

    if (ObjectCart.hasOwnProperty(product.id)) {
        product.quantity = ObjectCart[product.title].quantity + 1;
    }
    ObjectCart[product.title] = product;

    printCart(product);
}

const printCart = (product) => {

    cart.textContent = "";

    Object.values(ObjectCart).forEach(item => {
        const clone = template.content.firstElementChild.cloneNode(true);
        clone.querySelector(".lead").textContent = item.title;
        clone.querySelector(".badge").textContent = item.quantity;

        fragment.appendChild(clone);

    });

    cart.appendChild(fragment);
}

btns.forEach(btn => btn.addEventListener("click", addToCart));
