
const cart = document.querySelector("#cart");
const template = document.querySelector("#template");
const fragment = document.createDocumentFragment();
const btns = document.querySelectorAll(".btn");

const ArrayCart = [];

const addToCart = (e) => {
    console.log(e.target.dataset.fruit);

    const product = {
        title: e.target.dataset.fruit,
        id: e.target.dataset.fruit,
        quantity: 1
    }

   const index = ArrayCart.findIndex(
    (item) => item.id === product.id
   )
    console.log(index);

    if (index === -1) {
     ArrayCart.push(product);
    } else {
        ArrayCart[index].quantity ++;
    }
    console.log(ArrayCart)
    printCart(ArrayCart);
}

const printCart = (array) => {

    cart.textContent = "";

    array.forEach(item => {
        const clone = template.content.firstElementChild.cloneNode(true);
        clone.querySelector(".lead").textContent = item.title;
        clone.querySelector(".badge").textContent = item.quantity;

        fragment.appendChild(clone);

    });

    cart.appendChild(fragment);
}

btns.forEach(btn => btn.addEventListener("click", addToCart));