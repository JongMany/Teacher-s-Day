export default class Badge {
  constructor(comment, idx) {
    this.imageUrl = `./images/flower${comment.badgeNum * 1 + 1}.png`;
    this.comment = comment;
    this.index = idx;
    this.parent = document.querySelector('.teacher-image');
  }

  makeBadgeImage(parent, coords) {
    // const xCoords = box.x + coords.x - 20;
    const xCoords = coords.x - 10;
    const yCoords = coords.y;
    const badgeContainer = document.createElement('div');
    const image = document.createElement('img');
    const sender = document.createElement('span');

    image.classList.add('badge-img');
    image.src = this.imageUrl;

    sender.classList.add('badge-sender');
    sender.innerText = this.comment.sender;

    badgeContainer.classList.add('badge-container');
    badgeContainer.append(image);
    badgeContainer.append(sender);

    badgeContainer.style.top = `${yCoords}px`;
    badgeContainer.style.left = `${xCoords}px`;

    this.elem = badgeContainer;
    parent.appendChild(badgeContainer);
  }

  /* makeBadgeImage(parent, coords) {
    // const xCoords = box.x + coords.x - 20;
    const xCoords = coords.x - 10;
    const yCoords = coords.y;
    const badgeContainer = document.createElement('div');
    const image = document.createElement('img');
    image.classList.add('badge-img');
    image.src = this.imageUrl;
    image.style.top = `${yCoords}px`;
    image.style.left = `${xCoords}px`;
    this.elem = image;
    parent.appendChild(image);
  }
   */
  changeCoords(coords) {
    // const xCoords = box.x + coords.x - 20;
    const xCoords = coords.x - 10;
    const yCoords = coords.y;
    this.elem.style.top = `${yCoords}px`;
    this.elem.style.left = `${xCoords}px`;
  }
}
