import getLastPost from '../utils/getLastPost';
import getTotalItems from '../utils/getTotalItems';
import getShopContents from '../utils/getShopContents';

describe('getLastPost', () => {
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

describe('getShopContents', () => {
  test('should return an array of objects', async () => {
    const result = await getShopContents();
  });
});
