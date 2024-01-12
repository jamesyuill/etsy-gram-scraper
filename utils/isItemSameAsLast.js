export default function isItemSameAsLast(lastPost, newItem) {
  if (!newItem) {
    console.log('Had trouble getting new Item');
    return;
  } else {
    if (lastPost.content === newItem.content) {
      return true;
    } else {
      return false;
    }
  }
}
