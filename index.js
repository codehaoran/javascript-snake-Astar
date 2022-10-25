
class Snake {
  constructor(x, y, size) {
    this.x = x
    this.y = y
    this.size = size
    this.tail = [{ x: this.x, y: this.y }]
    this.rotateX = 1
    this.rotateY = 0
  }
  move() {
    let newRect
    if (this.rotateX === 1) {
      newRect = {
        x: this.tail[this.tail.length - 1].x + this.size,
        y: this.tail[this.tail.length - 1].y
      }
    } else if (this.rotateX === -1) {
      newRect = {
        x: this.tail[this.tail.length - 1].x - this.size,
        y: this.tail[this.tail.length - 1].y
      }
    } else if (this.rotateY === 1) {
      newRect = {
        x: this.tail[this.tail.length - 1].x,
        y: this.tail[this.tail.length - 1].y + this.size
      }
    } else if (this.rotateY === -1) {
      newRect = {
        x: this.tail[this.tail.length - 1].x,
        y: this.tail[this.tail.length - 1].y - this.size
      }
    }
    this.tail.shift()
    this.tail.push(newRect)
    // console.log(this.tail[0]);
    // console.log(this.tail[1]);
    // console.log('-------------');
  }
}
class Apple {
  constructor(oldX,oldY) {
    this.old = {x: oldX, y:oldY}
    let isTouching
    while (true) {
      isTouching = false
      this.x = Math.floor(Math.random() * canvas.width / snake.size) * snake.size
      this.y = Math.floor(Math.random() * canvas.height / snake.size) * snake.size
      for (let i = 0; i < snake.tail.length; i++) {
        if (this.x === snake.tail[i].x && this.y === snake.tail[i].y) {
          isTouching = true
        }
      }
      this.color = 'pink'
      this.size = snake.size
      createRect()
      if (!isTouching) {
        break
      }
    }
  }
}
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

let snake = new Snake(20, 20, 20)
let apple = new Apple()

window.onload = () => {
  setInterval(show, 1000 / 10)
}

function show() {
  update()
  draw()

}

function eatApple() {
  if (
    snake.tail[snake.tail.length - 1].x === apple.x &&
    snake.tail[snake.tail.length - 1].y === apple.y
  ) {
    snake.tail[snake.tail.length] = { x: apple.x, y: apple.y }
    apple = new Apple(apple.x, apple.y)
    // console.log(apple.x,apple.y);
    // console.log(apple.old.x, apple.old.y);
  }
}

function update() {
  snake.move()
  eatApple()
  checkHitWall()
  checkBody()
}

function draw() {
  createRect(0, 0, canvas.width, canvas.height)
  createRect(0, 0, canvas.width, canvas.height, 'black')
  for (let i = 0; i < snake.tail.length; i++) {
    const tail = snake.tail[i];
    createRect(tail.x, tail.y, snake.size - 3, snake.size - 3, 'white')
  }

  ctx.fillStyle = 'green'
  ctx.font = "20px Arial"
  ctx.fillText("Score: " + (snake.tail.length - 1), canvas.width - 100, 30)

  createRect(apple.x, apple.y, apple.size - 3, apple.size - 3, apple.color)
}



function createRect(x, y, w, h, color) {
  ctx.fillStyle = color
  ctx.fillRect(x, y, w, h)
}

function checkHitWall() {
  const head = snake.tail[snake.tail.length - 1]
  if (head.x <= -snake.size) {
    head.x = canvas.width
  } else if (head.x >= canvas.width + snake.size) {
    head.x = 0
  } else if (head.y <= -snake.size) {
    head.y = canvas.height
  } else if (head.y >= canvas.height + snake.size) {
    head.y = 0
  }
}

function checkBody() {
  const head_ = snake.tail[snake.tail.length - 1]
  for (let i = 0; i < snake.tail.length-1; i++) {
    const tail = snake.tail[i];
    if (head_.x === tail.x && head_.y === tail.y && head_.x !== apple.old.x && head_.y !== apple.old.y) {
      console.log('gameOver');
    }
  }
}

window.addEventListener('keydown', (e) => {
  setTimeout(() => {
    if (e.keyCode === 37 && snake.rotateX !== 1) {
      snake.rotateX = -1
      snake.rotateY = 0
    } else if (e.keyCode === 38 && snake.rotateY !== 1) {
      snake.rotateX = 0
      snake.rotateY = -1
    } else if (e.keyCode === 39 && snake.rotateX !== -1) {
      snake.rotateX = 1
      snake.rotateY = 0
    } else if (e.keyCode === 40 && snake.rotateY !== -1) {
      snake.rotateX = 0
      snake.rotateY = 1
    }
  }, 1);
})