import { listPr } from './maen.js';
document.querySelector('.add-btn').addEventListener('click', () => {    
    fetch('http://localhost:3000/products')
    .then(res => res.json())
    .then(data => {
      const maxId = data.reduce((max, p) => 
        (p.id && p.id > max) ? p.id : max, 0);
      console.log('add new product id:', data.id);
      let newProduct = {
        id: maxId + 1,
        title: document.getElementById('tit').value,
        price: parseFloat(document.getElementById('num').value),
        category: 'lol',
        image: document.getElementById('file').files[0].name
    };
     return fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProduct)
    })
     
    })
    .then(res => res.json())
    .then(data => {
      console.log('add new product id:', data.id);
      location.reload();
    })
    .catch(error => {
      console.error('Error', error);
    });
  });
  