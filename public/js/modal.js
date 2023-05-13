export default class Modal {
  constructor() {
    // this.comment = comment;
    // this.makeModal();
    this.elem = document.querySelector('.letter-modal');
  }

  // makeModal() {
  //   const modal = document.createElement('div');
  //   modal.classList.add('modal');

  //   this.elem = modal;
  // }

  showModal(comment) {
    // console.log('showModal');
    // parent.appendChild(this.elem);
    this.elem.innerHTML = `
    <img src=${`./images/flower${
      comment?.badgeNum * 1 + 1 || undefined
    }.png`} />
    <div class="modal_body">
      <p class="modal_text">${comment?.text || undefined}</p>
      <p class="modal_sender">
        <span>${comment?.sender || undefined}</span>
        <span> 올림</span>
      </p>
    </div>
    <a class="btn js-close-modal">확인</a>`;

    const mainSection = document.querySelector('.main_section');
    const header = document.querySelector('.header-container');
    const imgContainer = document.querySelector('.image-container');
    mainSection.classList.add('modal-open');
    header.classList.add('filter');
    imgContainer.classList.add('filter');

    console.log(mainSection.classList);
    if (mainSection.classList.contains('modal-open')) {
      const box = this.elem.getBoundingClientRect();
      this.elem.style.top = `${window.innerHeight - box.height}px`;
    }

    const closeBtn = this.elem.querySelector('.btn.js-close-modal');
    closeBtn.addEventListener('click', (e) => {
      mainSection.classList.remove('modal-open');
      header.classList.remove('filter');
      imgContainer.classList.remove('filter');
    });
  }
}
