import getLastPost from '../utils/getLastPost';
import getTotalItems from '../utils/getTotalItems';
import getShopContents from '../utils/getShopContents';
import selectRandomItem from '../utils/selectRandomItem';

xdescribe('getLastPost', () => {
  test('should return an object', () => {
    const result = getLastPost();
    expect(typeof result).toBe('object');
  });

  test('returned object should have a content and an imgSrc property', () => {
    const result = getLastPost();
    expect(result).toHaveProperty('content', expect.any(String));
    expect(result).toHaveProperty('imgSrc', expect.any(String));
  });
});

describe('getTotalItems', () => {
  test('should return a number', async () => {
    const result = await getTotalItems();
    expect(typeof result).toBe('number');
  });
});

xdescribe('getShopContents', () => {
  test('should return an array', async () => {
    const result = await getShopContents();
    expect(Array.isArray(result)).toBe(true);
  });
  test('each item of the array should be an object', async () => {
    const result = await getShopContents();
    expect(typeof result[0]).toBe('object');
  });

  test('each object should have content and imgSrc property', async () => {
    const result = await getShopContents();
    expect(result[0]).toHaveProperty('content', expect.any(String));
    expect(result[0]).toHaveProperty('imgSrc', expect.any(String));
  });
});

xdescribe('selectRandomItem', () => {
  test('should return a single object from an array', () => {
    const array = [
      { content: 'cheese', imgSrc: 'imageofcheese' },
      { content: 'brian', imgSrc: 'imageofbrian' },
      { content: 'beef', imgSrc: 'imageofbeef' },
      { content: 'sauces', imgSrc: 'imageofsauces' },
    ];
    const num = 4;
    const result = selectRandomItem(array, num);
    expect(typeof result).toBe('object');
  });
});
