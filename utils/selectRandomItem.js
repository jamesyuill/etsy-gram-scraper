export default function selectRandomItem(array, totalNum) {
  const randomIndex = Math.floor(Math.random() * totalNum + 1);
  return array[randomIndex];
}
