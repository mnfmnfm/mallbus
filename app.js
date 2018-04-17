console.log('linked');

var images = document.querySelectorAll('.voting img');
var currentProducts = [];

function Product(img) {
  this.name = 'name';
  this.img = img;
  this.views = 0;
  this.votes = 0;
  this.percentage = 0;
}

Product.votes = 0;

Product.prototype.getTableRow = function() {
  var row = document.createElement('tr');
  var name = document.createElement('td');
  name.textContent = this.img.split('.')[0].split('/')[1];
  row.appendChild(name);
  var votes = document.createElement('td');
  votes.textContent = this.percentage;
  row.appendChild(votes);
  var totals = document.createElement('td');
  totals.textContent = this.votes + ' / ' + this.views;
  row.appendChild(totals);
  return row;
};

Product.prototype.updatePercentage = function() {
  this.percentage = (this.votes / this.views) || 0;
};

var PRODUCTS = ['bag.jpg',
  'banana.jpg',
  'bathroom.jpg',
  'boots.jpg',
  'breakfast.jpg',
  'bubblegum.jpg',
  'chair.jpg',
  'cthulhu.jpg',
  'dog-duck.jpg',
  'dragon.jpg',
  'pen.jpg',
  'pet-sweep.jpg',
  'scissors.jpg',
  'shark.jpg',
  'sweep.png',
  'tauntaun.jpg',
  'unicorn.jpg',
  'usb.gif',
  'water-can.jpg',
  'wine-glass.jpg'
].map(x => new Product('assets/' + x));

function imageClicked(e) {
  var num = parseInt(e.target.id);
  console.log('image ' + num + ' clicked');
  currentProducts[num].votes++;
  Product.votes++;
  if (Product.votes < 25) {
    pickProducts();
  } else {
    PRODUCTS.forEach(x => x.updatePercentage());
    PRODUCTS.sort( (a, b) => (b.percentage - a.percentage) || (b.views - a.views));
    var table = document.getElementById('tab');
    table.style.visibility = 'visible';
    PRODUCTS.forEach(x => table.appendChild(x.getTableRow()));
    images.forEach(function(elem) {
      elem.removeEventListener('click', imageClicked);
    });
  }
}

function pickProducts() {
  var newProducts = [];
  while (newProducts.length < 3) {
    var newProduct = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
    if (!newProducts.includes(newProduct) && !currentProducts.includes(newProduct)) {
      newProduct.views++;
      newProducts.push(newProduct);
    }
  }
  currentProducts = newProducts;
  for (var i in currentProducts) {
    images[i].src = currentProducts[i].img;
  }
}
images.forEach(function(elem) {
  elem.addEventListener('click', imageClicked);
});
pickProducts();