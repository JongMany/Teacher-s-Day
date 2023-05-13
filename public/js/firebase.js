import Badge from './badge.js';
import Modal from './modal.js';
import { calculateCoordsFromImageMap } from './main.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js';

import {
  getDatabase,
  ref,
  onValue,
  set,
} from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js';

const firebaseConfig = {
  apiKey: 'AIzaSyAJKICb0c-xI3GfCBWgO-2hKB0zpnsryMs',
  authDomain: 'teacher-s-day-367c1.firebaseapp.com',
  projectId: 'teacher-s-day-367c1',
  storageBucket: 'teacher-s-day-367c1.appspot.com',
  messagingSenderId: '739025491493',
  appId: '1:739025491493:web:e66c155aeac4c8c7e1d1cc',
  databaseURL:
    'https://teacher-s-day-367c1-default-rtdb.asia-southeast1.firebasedatabase.app',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

function getLettersData(imagePoint, imgContainer) {
  const db = getDatabase();

  const lettersRef = ref(db, 'letters');
  onValue(lettersRef, (snapshot) => {
    const snapData = snapshot.val();
    if (!snapData) return;
    let data = Object.values(snapData);
    console.log(data);
    if (data.length > 20) {
      data = shuffle(data);
      data = data.slice(0, 20);
    }
    const msg = document.querySelector('.change-msg');
    if (!msg) return;
    msg.innerHTML = `<span class='count'>${data.length}</span>개의 감사 메세지가 전달됐어요`;
    const badges = data.map((comment, idx) => new Badge(comment, idx));
    console.log(imagePoint, badges[1]);

    badges.forEach((badge) =>
      badge.makeBadgeImage(imgContainer, imagePoint[badge.index])
    );

    const modal = new Modal();

    badges.forEach((badge) => {
      badge.elem.addEventListener('click', (e) => {
        // console.log(modal);
        modal.showModal(badge.comment);
      });
    });
    console.log(imagePoint);
    window.addEventListener('resize', (e) => {
      const imageMap = document.querySelector('#teacher');
      const teacherElem = document.querySelector('.teacher-image');
      const imagePoint = calculateCoordsFromImageMap(
        imageMap,
        teacherElem,
        false
      );

      badges.forEach((badge) => {
        badge.changeCoords(imagePoint[badge.index]);
      });
    });
  });
}

export function writeLetterData(text, sender, badgeNum) {
  const db = getDatabase();
  const now = new Date();
  const id = `${now.getTime()}${Math.floor(Math.random() * 100000)}`;

  set(ref(db, `letters/${id}`), {
    id,
    text: text ? text?.trim() : text,
    sender,
    badgeNum,
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

export function getDataFromFireBase(comments, imgContainer, imagePoint) {
  // DB로부터 데이터 받아와서 comments에 저장

  // TODO: comments를 받아오기
  getLettersData(imagePoint, imgContainer);
  console.log(comments);

  // TODO: comments에 뭐가 있으면 감사문구 변경하기!
  if (comments.length <= 0) return;

  const msg = document.querySelector('.change-msg');

  if (!msg) return;

  msg.innerHTML = `<span class='count'>${comments.length}</span>개의 감사 메세지가 전달됐어요`;
  const badges = comments.map((comment, idx) => new Badge(comment, idx));
  console.log(imagePoint, badges[1]);

  badges.forEach((badge) =>
    badge.makeBadgeImage(imgContainer, imagePoint[badge.index])
  );

  const modal = new Modal();

  badges.forEach((badge) => {
    badge.elem.addEventListener('click', (e) => {
      // console.log(modal);
      modal.showModal(badge.comment);
    });
  });
  console.log(imagePoint);
  window.addEventListener('resize', (e) => {
    const imageMap = document.querySelector('#teacher');
    const teacherElem = document.querySelector('.teacher-image');
    const imagePoint = calculateCoordsFromImageMap(imageMap, teacherElem, true);
    console.log(imagePoint);
    badges.forEach((badge) => {
      badge.changeCoords(imagePoint[badge.index]);
    });
  });
}

function shuffle(array) {
  const shuffle = [];
  for (let index = array.length; index > 0; index--) {
    // 무작위 index 값을 만든다. (0 이상의 배열 길이 값)
    const random = Math.floor(Math.random() * index);
    // 임시로 원본 값을 저장하고, randomPosition을 사용해 배열 요소를 섞는다.
    const spliceArray = array.splice(random, 1);
    const value = spliceArray[0];
    shuffle.push(value);
  }
  return shuffle;
}
