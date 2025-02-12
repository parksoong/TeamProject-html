const postSearch = document.querySelector('#mng-search');
const postSize = 10; //한 페이지당 표시될 게시물 수
const totalPost = 20; //서버에서 모든 게시물 수 가져오기
let currentPageNumber = 1;
const moveFirst = document.querySelector('.icon-angle-double-left');
const moveLast = document.querySelector('.icon-angle-double-right');
const movePrev = document.querySelector('.icon-left-open');
const moveNext = document.querySelector('.icon-right-open');


const posts = [];
for (let i = 1; i <= 100; i++) {
  posts.push({
    writeNum: `${i}`,
    nickName: `노란상어`,
    tier: `그랜드 마스터`,
    category: `자유`,
    title: `역삼역 근처 맛집 추천`,
    writeTime: `2025-01-12 15:00`,
    postId: `게시글${i}`
  });
}
const totalPages = Math.ceil(posts.length / postSize);

const bottomNumber = document.querySelector('.mng-page-number-button');
const postContainer = document.querySelector('.mng-list');
const postBottomNumberContainer = document.querySelector('.mng-page-numbers');

function getPost(page) {
  postContainer.innerHTML = '';
  const start = (page - 1) * postSize;
  const end = page * postSize;
  const postDisplay = posts.slice(start, end);
  postDisplay.forEach(post => {
    const postItem = document.createElement('li');
    postItem.classList.add('mng-list-item');
    postItem.innerHTML = `
      <input type="checkbox" id="mng-list-check">
      <div class="mng-list-writeNum">${post.writeNum}</div>
      <div class="mng-list-nickName">${post.nickName}</div>
      <div class="mng-list-tier">${post.tier}</div>
      <div class="mng-list-category">${post.category}</div>
      <div class="mng-list-title">${post.title}</div>
      <div class="mng-list-write-time">${post.writeTime}</div>
    `;
    const postLine = document.createElement('hr');
    postLine.classList.add('mng-list-item-line');
    postContainer.appendChild(postItem);
    postContainer.appendChild(postLine);
    postItem.addEventListener('click', () => {
      alert(`해당 게시글 : ${post.postId}`);
    });
  });
}

function postBottomNumber() {
  postBottomNumberContainer.innerHTML = '';
  const numberStart = Math.floor((currentPageNumber - 1) / 10) * 10 + 1;
  const numberEnd = Math.min(numberStart + 9, totalPages);

  for (let i = numberStart; i <= numberEnd; i++) {
    const numbers = document.createElement('p');
    numbers.textContent = i;

    if (i === currentPageNumber) {
      numbers.classList.add('mng-page-numbers-selector');
    } else {
      numbers.classList.add('mng-page-numbers-unSelector');
    }

    numbers.disabled = i === currentPageNumber;
    numbers.addEventListener('click', () => movePost(i));
    postBottomNumberContainer.appendChild(numbers);
  }
}

function movePost(post) {
  if (post < 1 || post > totalPages) return;
  currentPageNumber = post;
  getPost(currentPageNumber);
  postBottomNumber();
}





// 이전 페이지로 이동
movePrev.addEventListener('click', () => movePost(currentPageNumber - 1));

// 다음 페이지로 이동
moveNext.addEventListener('click', () => movePost(currentPageNumber + 1));

// 첫 페이지로 이동
moveFirst.addEventListener('click', () => movePost(1));

// 마지막 페이지로 이동
moveLast.addEventListener('click', () => movePost(totalPages));




getPost(currentPageNumber);
postBottomNumber();









/* 체크박스 체크 시 해당 리스트 삭제*/

document.addEventListener("DOMContentLoaded", function() {
  // 삭제 버튼
  const deleteButton = document.querySelector('.icon-trash');
  // 체크박스 선택된 항목 삭제
  deleteButton.addEventListener('click', function() {
    // 체크박스를 선택한 항목들 가져오기
    const checkedItems = document.querySelectorAll('.mng-list-check:checked');
    // 선택된 항목들 삭제
    checkedItems.forEach(item => {
      const listItem = item.closest('li'); // 체크된 항목의 <li> 요소 찾기
      if (listItem) {
        const hr = listItem.nextElementSibling;
        listItem.remove(); // 해당 <li> 삭제
        if(hr && hr.tagName === 'HR'){
          hr.remove();
      }
    };
  });
});
});