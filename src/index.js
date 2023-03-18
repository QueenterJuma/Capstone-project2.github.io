import './styles/style.css';
import 'animate.css';
import logoSrc from './image/logo.jpg';
import amineGithubSrc from './image/git-github-hub-icon-25.png';
import queenGithubSrc from './image/github-mark.png';
import { getApiItems } from './modules/api.js';
import displayItems from './modules/display.js';

const loadGithubIcons = () => {
  const amineGithub = document.querySelector('.amine-github');
  const queenGithub = document.querySelector('.queen-github');
  amineGithub.src = amineGithubSrc;
  queenGithub.src = queenGithubSrc;
};
const loadLogo = () => {
  const logoImage = document.querySelector('#logo img');
  logoImage.src = logoSrc;
};

const getItemsCount = () => document.querySelectorAll('.item').length;
window.onload = async () => {
  loadLogo();
  loadGithubIcons();
  const items = await getApiItems();
  displayItems(items);
  const itemsCounter = document.getElementById('item-counters');
  itemsCounter.innerHTML = `(${getItemsCount()}) Breeds of dog`;
};
