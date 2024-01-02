var pos = 0;
const pacArray = [
  ['images/PacMan1.png', 'images/PacMan2.png'], // Images for moving right
  ['images/PacMan3.png', 'images/PacMan4.png'], // Images for moving left
];

var direction = 0;
const pacMen = [];
let imagesLoaded = 0;

function preloadImages(callback) {
  pacArray.forEach((directionArray) => {
    directionArray.forEach((imageSrc) => {
      const img = new Image();
      img.onload = () => {
        imagesLoaded++;
        if (imagesLoaded === pacArray[0].length * pacArray.length) {
          callback();
        }
      };
      img.src = imageSrc;
    });
  });
}

// Factory to make a PacMan
function makePac() {
  let velocity = setToRandom(20);
  let position = setToRandom(200);

  // Add image to div id = game
  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';

  // Change the image source to the first image in the array
  newimg.src = pacArray[0][0]; // Start with the first image for moving right

  newimg.width = 100;
  newimg.style.left = position.x + 'px'; // Add 'px' to left property
  newimg.style.top = position.y + 'px'; // Add 'px' to top property
  game.appendChild(newimg);

  return {
    position,
    velocity,
    newimg,
  };
}

function update() {
  pacMen.forEach((item) => {
    checkCollisions(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    // Toggle between PacMan images based on direction for the mouth animation
    if (item.velocity.x > 0) {
      // Moving right
      item.newimg.src = pacArray[0][pos % 2];
    } else {
      // Moving left
      item.newimg.src = pacArray[1][pos % 2];
    }

    item.newimg.style.left = item.position.x + 'px'; // Add 'px' to left property
    item.newimg.style.top = item.position.y + 'px'; // Add 'px' to top property
  });

  // Increment the position and direction for the mouth animation
  pos++;
  setTimeout(() => update(), 80); // Decreased the timeout to make it faster
}

function checkCollisions(item) {
  if (
    item.position.x + item.velocity.x + item.newimg.width > window.innerWidth ||
    item.position.x + item.velocity.x < 0
  ) {
    // Change direction when hitting the wall
    item.velocity.x = -item.velocity.x;
    direction = (direction + 1) % 2; // Toggle between 0 and 1 for left and right
  }

  if (
    item.position.y + item.velocity.y + item.newimg.height > window.innerHeight ||
    item.position.y + item.velocity.y < 0
  )
    item.velocity.y = -item.velocity.y;
}

function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
}

// Initialize the game
preloadImages(() => {
  // Do nothing here, wait for the user to start the game
});

// Utility function to set position to random coordinates
function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

// Event listener for the start button
document.getElementById('startButton').addEventListener('click', () => {
  makeOne();
  update();
});
