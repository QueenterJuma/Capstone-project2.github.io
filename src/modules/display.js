import likeSrc from '../image/hearts-icons-vectors-illustrations.png';
import { getAllLikesData, sendALike } from './api.js';
import { displayPopup } from './popup.js';

const sortLike = async () => {
  const data = await getAllLikesData();
  return data.sort((a, b) => a.item_id - b.item_id);
};

const getNumberOfLikes = (item) => {
  if (document.querySelector(`.item[data-index="${item.item_id}"]`)) {
    document.querySelector(`.item[data-index="${item.item_id}"] .number-likes`).textContent = item.likes;
  }
};

const displayItems = async (itemslist) => {
  const itemsContainer = document.getElementById('items');
  itemslist.forEach((item, index) => {
    const itemElement = document.createElement('div');
    itemElement.className = 'item';
    itemElement.setAttribute('data-index', index);
    itemElement.innerHTML = `<img class="item-img" src=${item.url} alt=${item.breeds[0].name} /> <div class="item-description"><p>${item.breeds[0].name}</p><div class="like-container"><img class="like-icon" src=${likeSrc} alt="like" /> <p> <span class ="number-likes" >0</span> likes </p></div> </div><button class="comment-button">Comment</button>`;
    itemsContainer.appendChild(itemElement);
    if (index % 2 === 0) {
      itemElement.style.animation = 'backInLeft 2s';
    } else {
      itemElement.style.animation = 'backInRight 2s';
    }
    const commentButton = document.querySelector(`.item[data-index="${index}"] .comment-button`);
    commentButton.addEventListener('click', () => {
      displayPopup(item, index);
    });
    const likeButton = document.querySelector(`.item[data-index="${index}"] .like-icon`);
    likeButton.addEventListener('click', async (e) => {
      e.target.style.animation = 'rubberBand 2s';
      e.target.style.background = 'pink';
      await sendALike(index);
      const data = await getAllLikesData();
      const itemIndex = await data.filter((item) => item.item_id === index);
      getNumberOfLikes(itemIndex[0]);
      setTimeout((e) => {
        e.target.style.animation = '';
      }, 2000);
    });
  });
  const numberofLikesData = await sortLike();
  if (numberofLikesData.length !== 0) {
    numberofLikesData.forEach((item) => {
      getNumberOfLikes(item);
    });
  }
};

export default displayItems;
