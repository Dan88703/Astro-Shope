function bones(product) {
  return `<img src="${product.image}" id="img" alt="product">
          <h3>${product.title}</h3>
          <p>${product.price}zl</p>`;
}

let toBasket = [];
let listPr = [];

document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main');
  if (!main) return;

  fetch('http://localhost:3000/products')
    .then(response => response.json())
    .then(data => {
      listPr = data;
      display(listPr);
    })
    .catch(err => {
      console.log('error', err);
    });

  function display(items) {
    main.innerHTML = '';

    if (items.length === 0) {
      main.innerText = "Not exist";
      return;
    }

    items.forEach(i => {
      const product = document.createElement('div');
      product.classList.add('prod');
      product.innerHTML = bones(i);

      const butBuy = document.createElement('button');
      butBuy.setAttribute('class', 'butBuy');
      butBuy.dataset.id = i.id;
      butBuy.innerText = 'Buy';

      butBuy.style.cssText = `
        margin-left:10px;
        width:70px;
        height:20px;
      `;

      product.appendChild(butBuy);
      main.appendChild(product);
    });
  }

  // function findProduct(id) {
  //   return listPr.find(i => i.id == id);
  // }

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('butBuy')) {
      const find = parseInt(e.target.dataset.id);
      addToBuscet(find);
    }
  });

  function addToBuscet(prodId) {
    let item = listPr.find(i => i.id == prodId);
    let itemBasket = toBasket.find(i => i.id == prodId);

    if (itemBasket) {
      itemBasket.quantity += 1;
    } else {
      toBasket.push({
        ...item,
        quantity: 1
      });
    }

    console.log(toBasket);
  }

  const inp = document.getElementById('things');
  const inpBut = document.getElementById('serch');

  if (inp && inpBut) {
    inpBut.addEventListener('click', () => {
      const inInp = inp.value.toLowerCase();

      const filter = listPr.filter(i => {
        const name = typeof i === 'string' ? i : i.title;
        return name && name.toLowerCase().includes(inInp);
      });

      display(filter);
    });
  }
});

export { toBasket };
export { listPr };
