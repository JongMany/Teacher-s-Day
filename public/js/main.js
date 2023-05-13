import { getDataFromFireBase } from './firebase.js';

// $(document).ready(function (e) {
//   $('img[usemap]').rwdImageMaps();
//   $('#teacher').width('100%');
// });
// $('img[usemap]').rwdImageMaps();

// $(function () {
//   $('img[usemap]').rwdImageMaps();
//   $('#teacher').width('100%');
// });
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);
console.log(vh);
window.addEventListener('resize', () => {
  vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

window.addEventListener('DOMContentLoaded', init);

// init();
// const comments = [
//   {
//     id: '168385779964925952',
//     text: '안녕하세요?',
//     sender: '이종민',
//     badgeNum: '4',
//   },
//   {
//     id: '168385813209242965',
//     text: '감사합니다!',
//     sender: '곽소정',
//     badgeNum: '3',
//   },
// ];

function init() {
  const comments = [];
  // const badgesElem = [];
  const teacherElem = document.querySelector('.teacher-image');
  const imgContainer = document.querySelector('.image-container');
  const imageMap = document.querySelector('#teacher');
  const mainSection = document.querySelector('.main_section');

  const imagePoint = calculateCoordsFromImageMap(imageMap, teacherElem);

  getDataFromFireBase(comments, imgContainer, imagePoint);
}

export function calculateCoordsFromImageMap(imageMap, srcImg, isResize) {
  if (!srcImg) return;
  if (!imageMap) return;

  const width = 1775;
  const height = 2260;
  const teacherBox = srcImg?.getBoundingClientRect();
  const widthRatio = teacherBox?.width / width;
  const heightRatio = teacherBox?.height / height;

  const results = [];
  for (const area of imageMap?.children) {
    // console.dir(area.getAttribute('coords'));
    const coords = area.coords.split(',');
    const centerCoords = isResize
      ? {
          x: (coords[0] * 1 + coords[2] * 1) / 2,
          y: (coords[1] * 1 + coords[3] * 1) / 2,
        }
      : {
          x: ((coords[0] * 1 + coords[2] * 1) / 2) * widthRatio,
          y: ((coords[1] * 1 + coords[3] * 1) / 2) * heightRatio,
        };

    // console.log(centerCoords);
    results.push(centerCoords);
  }
  return results;
}
