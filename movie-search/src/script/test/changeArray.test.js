const changeArray = require('./changeArray');

test('funtion should return true if of object and id of slide are equal, else false ', () => {
  const array = [
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
  const slide = {
    id: 'tb5155151',
  };
  expect(changeArray(array, slide)).toBeTruthy();
});

test('funtion should return true if of object and id of slide are equal, else false ', () => {
  const array = [
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
  const slide = {
    id: 'hello rss',
  };
  expect(changeArray(array, slide)).toBeFalsy();
});

test('funtion should return true if of object and id of slide are equal, else false ', () => {
  const array = [
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
  const slide = {
    id: 'tb515111',
  };
  expect(changeArray(array, slide)).toBeFalsy();
});

test('funtion should return true if of object and id of slide are equal, else false ', () => {
  const array = [
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
  const slide = {
    id: 'tb2131414',
  };
  expect(changeArray(array, slide)).toBeTruthy();
});

test('funtion should return true if of object and id of slide are equal, else false ', () => {
  const array = [
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
  const slide = {
    id: 'tb5155151',
  };
  expect(changeArray(array, slide)).toBeTruthy();
});

test('funtion should return true if of object and id of slide are equal, else false ', () => {
  const array = [
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
  const slide = {
    id: 'tb51551511',
  };
  expect(changeArray(array, slide)).toBeFalsy();
});

test('funtion should return true if of object and id of slide are equal, else false ', () => {
  const array = [
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
  const slide = {
    id: 111111111111111111111,
  };
  expect(changeArray(array, slide)).toBeFalsy();
});
