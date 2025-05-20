import { toBasket } from './maen.js';
const but = document.getElementById('buscet')


const modal = new tingle.modal({
    footer: true,
    closeMethods: ['overlay', 'button', 'escape'],
    closeLabel: "X",
    cssClass: ['basketStyle'],

});
function consist(basketProducts) {
    console.log(basketProducts.quantity)
    let price2 = basketProducts.price * basketProducts.quantity
    return `
    <div class='inBasket'>
    <img src="${basketProducts.image}" id="buscImg" alt="product">
        <h1 class = "tit">${basketProducts.title}</h1>
        <p class="tit">${price2}zl</p>
         <div class="count">
          <button class='b max'>+</button>
          <p class="tit">${basketProducts.quantity}</p>
          <button class='b min'>-</button>
         </div> 
          <button class='delete'>delete</button>  
        </div>
    `
}

document.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            const cartItem = e.target.closest('.inBasket');
            cartItem.remove()
        }
})

document.addEventListener('click', (e) => {
        if (e.target.classList.contains('min')) {
            const parent = e.target.closest('.inBasket');
            const title = parent.querySelector('h1')?.innerText;
            const item = toBasket.find(i => i.title === title);
            if (item) {
                item.quantity--;
    
                if (item.quantity <= 0) {
                    toBasket = toBasket.filter(i => i.title !== title); 
                    parent.remove(); 
                }
            }
            update();
        }
        if (e.target.classList.contains('max')) {
            const parent = e.target.closest('.inBasket');
            const title = parent.querySelector('h1')?.innerText;
            const item = toBasket.find(i => i.title === title);
    
            if (item) {
                item.quantity++;
            }
    
            update();
        } 
});


function update() {
    let html = ``
    if (toBasket.length === 0) {
        html += `Empty`
    } else {
        toBasket.forEach(i => {
            html += consist(i)
        })
    }
    modal.setContent(html);
    modal.open()
}

but.addEventListener('click', () => {
    update()
})
