import { writeLetterData } from './firebase.js';

(() => {
  // index.html의 버튼으로부터 이동된 것이 아니라면 튕기도록
  // if (!document.referrer.endsWith('/index.html')) {
  //   window.location.replace('/index.html');
  // }
  let selectedBadgeNum = null; // 선택된 배지 번호 (0~4)
  let selectedBadge = null; // 선택된 배지 element
  let letterLimits = `0/800`;
  let letter;
  let sender;

  const sendData = {
    text: null,
    badgeNum: null,
    sender: null,
  };

  const submitBtn = document.querySelector('.submit-btn');
  const backBtn = document.querySelector('.back-btn');
  const badgeList = document.querySelector('.badge-list');
  const badges = document.querySelectorAll('.badge-list .flower');
  const letterLimitElem = document.querySelector('.letter-limits');
  const textArea = document.querySelector('.letter-content');
  const senderInput = document.querySelector('.name-info');

  letterLimitElem.innerText = letterLimits;

  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (
      !selectedBadge ||
      !selectedBadgeNum ||
      selectedBadgeNum < 0 ||
      selectedBadgeNum > 5
    ) {
      alert('배지를 선택해주세요.');
      return;
    }
    if (!letter || !letter?.length) {
      alert('내용을 입력해주세요!');
      return;
    }
    if (!sender || !sender?.length) {
      alert('이름을 입력해주세요!');
      return;
    }
    // firebase 코드 작성 - DB에 저장

    writeLetterData(sendData.text, sendData.sender, sendData.badgeNum);
    // 저장 후에 main 화면으로 이동
    window.location.replace('./index.html');
  });

  textArea.addEventListener('keyup', (e) => {
    letter = e.currentTarget.value;
    sendData.text = letter;
    letterLimits = `${letter.length}/800`;
    letterLimitElem.innerText = letterLimits;
    console.log(letter, sendData.text);
  });

  senderInput.addEventListener('keyup', (e) => {
    sender = e.currentTarget.value;
    sendData.sender = sender;
    console.log(sender, sendData.sender);
  });

  badgeList.addEventListener('click', (e) => {
    if (!e.target.classList.contains('flower')) {
      return;
    }
    const badge = e.target;
    selectedBadgeNum = badge.dataset.num; // 선택한 배지 번호
    selectedBadge = badges[selectedBadgeNum];
    badges.forEach((badge) => badge.classList.remove('selected'));
    selectedBadge.classList.add('selected');
    sendData.badgeNum = selectedBadgeNum;
  });

  backBtn.addEventListener('click', (e) => {
    e.preventDefault();
    history.back();
  });
})();
