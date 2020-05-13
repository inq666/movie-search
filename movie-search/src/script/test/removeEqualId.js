function removeEqualId(arrayWithMovieId, currentMovieId) {
  const newArray = arrayWithMovieId.slice();
  newArray.forEach((item, index) => {
    if (item.id === currentMovieId.id) {
      newArray.splice(index, 1);
    }
  });
  return newArray;
}

module.exports = removeEqualId;
