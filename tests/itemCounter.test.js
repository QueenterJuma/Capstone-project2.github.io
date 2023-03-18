/**
 * @jest-environment jsdom
 */

import { getApiItems } from '../src/modules/api.js';

const body = '<div id="items"></div>';

describe('test item counter', () => {
  document.body.innerHTML = body;
  test('item count', async () => {
    const data = await getApiItems();
    const lists = document.getElementById('items');
    expect(data.length).toBe(10);
    data.forEach((element) => {
      const item = document.createElement('div');
      item.innerHTML = `<img class="item-img" src=${element.url} alt=${element.breeds[0].name} /> <div class="item-description"><p>${element.breeds[0].name}</p>`;
      item.className = 'item';
      lists.appendChild(item);
    });
    expect(document.querySelectorAll('.item').length).toBe(10);
  });
});
