const removeEqualId = require('./removeEqualId');

test('funtion should return true if of object and id of currentMovieId are equal, else false ', () => {
  const arrayWithMovieId = [
    {
      id: 'tb2131414',
    },
    {
      id: 'tb5155151',
    },
    {
      id: 'tb1015515',
    },
    {
      id: 'tb1651515',
    },
    {
      id: 'tb5155151',
    },
  ];
  const expectedArray = [
    {
      id: 'tb2131414',
    },
    {
      id: 'tb1015515',
    },
    {
      id: 'tb1651515',
    },
  ];
  const currentMovieId = {
    id: 'tb5155151',
  };
  expect(removeEqualId(arrayWithMovieId, currentMovieId)).toEqual(expect.arrayContaining(expectedArray));
});

test('funtion should return true if of object and id of currentMovieId are equal, else false ', () => {
  const arrayWithMovieId = [
    {
      id: 'tb5151511',
    },
    {
      id: 'tb1551515',
    },
    {
      id: 'tb15515115',
    },
    {
      id: 'tb1155110',
    },
    {
      id: '000000000',
    },
  ];
  const expectedArray = [
    {
      id: 'tb5151511',
    },
    {
      id: 'tb1551515',
    },
    {
      id: 'tb15515115',
    },
    {
      id: 'tb1155110',
    },
    {
      id: '000000000',
    },
  ];

  const currentMovieId = {
    id: 'hello rss',
  };
  expect(removeEqualId(arrayWithMovieId, currentMovieId)).toEqual(expect.arrayContaining(expectedArray));
});

test('funtion should return true if of object and id of currentMovieId are equal, else false ', () => {

   const arrayWithMovieId = [
    {
      id: 'hello',
    },
    {
      id: 'cat',
    },
    {
      id: 'dog',
    },
    {
      id: 'car',
    },
    {
      id: 'home',
    },
  ];
  const expectedArray = [
    {
      id: 'hello',
    },
    {
      id: 'cat',
    },
    {
      id: 'dog',
    },
    {
      id: 'car',
    },
    {
      id: 'home',
    },
  ];
  const currentMovieId = {
    id: 'tb515111',
  };
  expect(removeEqualId(arrayWithMovieId, currentMovieId)).toEqual(expect.arrayContaining(expectedArray));
});

test('funtion should return true if of object and id of currentMovieId are equal, else false ', () => {
  const arrayWithMovieId = [
    {
      id: 'tb2131414',
    },
    {
      id: 'qqqqqqqqq',
    },
    {
      id: '111111111',
    },
    {
      id: 100,
    },
    {
      id: 9999999999,
    },
  ];
  const expectedArray = [
    {
      id: 'qqqqqqqqq',
    },
    {
      id: '111111111',
    },
    {
      id: 100,
    },
    {
      id: 9999999999,
    },
  ];
  const currentMovieId = {
    id: 'tb2131414',
  };
  expect(removeEqualId(arrayWithMovieId, currentMovieId)).toEqual(expect.arrayContaining(expectedArray));
});

test('funtion should return true if of object and id of currentMovieId are equal, else false ', () => {
  const arrayWithMovieId = [
    {
      id: 'tb2131414',
    },
    {
      id: 'tb5155151',
    },
    {
      id: 'tb1015515',
    },
    {
      id: 'tb1651515',
    },
    {
      id: null,
    },
  ];
  const expectedArray = [
    {
      id: 'tb2131414',
    },
    {
      id: 'tb1015515',
    },
    {
      id: 'tb1651515',
    },
    {
      id: null,
    },
  ];
  const currentMovieId = {
    id: 'tb5155151',
  };
  expect(removeEqualId(arrayWithMovieId, currentMovieId)).toEqual(expect.arrayContaining(expectedArray));
});

test('funtion should return true if of object and id of currentMovieId are equal, else false ', () => {
  const arrayWithMovieId = [
    {
      id: 'tb21tb2131414tb2131414tb2131414tb2131414tb2131414tb2131414tb213141431414',
    },
    {
      id: 'tb1015515tb1015515tb1015515tb1015515',
    },
    {
      id: 'tb10tb1651515tb1651515tb1651515tb165151515515',
    },
    {
      id: 'tb16515tb5155151tb5155151tb5155151tb515515115',
    },
    {
      id: 'tb5155151',
    },
  ];
  const expectedArray = [
    {
      id: 'tb21tb2131414tb2131414tb2131414tb2131414tb2131414tb2131414tb213141431414',
    },
    {
      id: 'tb1015515tb1015515tb1015515tb1015515',
    },
    {
      id: 'tb10tb1651515tb1651515tb1651515tb165151515515',
    },
    {
      id: 'tb16515tb5155151tb5155151tb5155151tb515515115',
    },
    {
      id: 'tb5155151',
    },
  ];
  const currentMovieId = {
    id: 'tb51551511',
  };
  expect(removeEqualId(arrayWithMovieId, currentMovieId)).toEqual(expect.arrayContaining(expectedArray));
});

test('funtion should return true if of object and id of currentMovieId are equal, else false ', () => {
  const arrayWithMovieId = [
    {
      id: 'tb2131414',
    },
    {
      id: 'tb5155151',
    },
    {
      id: 'tb1015515',
    },
    {
      id: 'tb1651515',
    },
    {
      id: 'tb5155151',
    },
  ];
  const expectedArray = [
    {
      id: 'tb2131414',
    },
    {
      id: 'tb5155151',
    },
    {
      id: 'tb1015515',
    },
    {
      id: 'tb1651515',
    },
    {
      id: 'tb5155151',
    },
  ];
  const currentMovieId = {
    id: 111111111111111111111,
  };
  expect(removeEqualId(arrayWithMovieId, currentMovieId)).toEqual(expect.arrayContaining(expectedArray));
});
