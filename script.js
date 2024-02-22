let highestZ = 1;

class Paper {
  holdingPaper = false;
  touchX = 0;
  touchY = 0;
  mouseX = 0;
  mouseY = 0;
  prevMouseX = 0;
  prevMouseY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    const handleMove = (clientX, clientY) => {
      if (!this.holdingPaper) return;

      this.mouseX = clientX;
      this.mouseY = clientY;

      this.velX = this.mouseX - this.prevMouseX;
      this.velY = this.mouseY - this.prevMouseY;

      if (!this.rotating) {
        this.currentPaperX += this.velX;
        this.currentPaperY += this.velY;
      }

      paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;

      this.prevMouseX = this.mouseX;
      this.prevMouseY = this.mouseY;
    };

    document.addEventListener('mousemove', (e) => {
      handleMove(e.clientX, e.clientY);
    });

    document.addEventListener('touchmove', (e) => {
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
      e.preventDefault();
    });

    const handleStart = (clientX, clientY) => {
      this.holdingPaper = true;
      paper.style.zIndex = highestZ;
      highestZ += 1;

      this.touchX = clientX;
      this.touchY = clientY;
      this.prevMouseX = clientX;
      this.prevMouseY = clientY;

      this.rotating = event.button === 2 || event.touches?.length > 1; // Right-click or multi-touch for rotation
    };

    paper.addEventListener('mousedown', (e) => {
      handleStart(e.clientX, e.clientY);
    });

    paper.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      handleStart(touch.clientX, touch.clientY);
      e.preventDefault();
    });

    window.addEventListener('mouseup', () => {
      this.holdingPaper = false;
      this.rotating = false;
    });

    document.addEventListener('mouseleave', () => {
        this.holdingPaper = false;
        this.rotating = false;
    });
    
    window.addEventListener('touchend', () => {
      this.holdingPaper = false;
      this.rotating = false;
    });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});
