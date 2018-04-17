console.log('linked');

var images = document.querySelectorAll('.voting img');
var currentProducts = [];

function Product(img) {
  this.name = 'name';
  this.img = img;
  this.views = 0;
  this.votes = 0;
}

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

function getCallback(num) {
  return function(e) {
    imageClicked(e, num);
  };
}

function imageClicked(e, num) {
  console.log('image ' + num + ' clicked');
  currentProducts[num].votes++;
  pickProducts();
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
images.forEach(function(elem, idx) {
  elem.addEventListener('click', getCallback(idx));
});
pickProducts();