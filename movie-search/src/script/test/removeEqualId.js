function removeEqualId(arrayWithMovieId, currentMovieId) {
  arrayWithMovieId.forEach((item, index) => {
    if (item.id === currentMovieId.id) {
      arrayWithMovieId.splice(index, 1);
    }
  });
  return arrayWithMovieId;
}

module.exports = removeEqualId;
