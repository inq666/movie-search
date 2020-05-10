function changeArray(array, currentSlide) {
  const lengthArray = array.length;
  array.forEach((item, index) => {
    if (item.id === currentSlide.id) {
      array.splice(index, 1);
    }
  });
  if (array.length < lengthArray) {
    return true;
  }
  return false;
}

module.exports = changeArray;
