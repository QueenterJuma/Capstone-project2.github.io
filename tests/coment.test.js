/**
 * @jest-environment jsdom
 */
import { getApiComments } from '../src/modules/api.js';
import { appendComment } from '../src/modules/popup.js';

const body = '<ul id="listcoment" class="listcoment"></ul>';

describe('Test if the comments are correctly retrieved from API', () => {
  document.body.innerHTML = body;
  test('get comments with the id test expect an array of six objects ', async () => {
    const data = await getApiComments('test');
    expect(data.length).toBe(6);
  });

  test('test if the Dom comments number match the API retrieved data', async () => {
    const commentsList = document.getElementById('listcoment');
    const data = await getApiComments('test');
    data.forEach((comment) => {
      commentsList.appendChild(appendComment(comment));
    });
    expect(document.querySelectorAll('li').length).toBe(data.length);
  });
});
