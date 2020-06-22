const removeEqualId = require('./removeEqualId');

const arrayWithMovieId = [
  {
    id: 'hello',
  },
  {
    id: 'tb5155151',
  },
  {
    id: 1111111111,
  },
  {
    id: 'tb2326665',
  },
  {
    id: null,
  },
];

test('funtion should return true if of object and id of currentMovieId are equal, else false ', () => {
  const expectedArray = [
    {
      id: 'hello',
    },
    {
      id: 1111111111,
    },
    {
      id: 'tb2326665',
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
  const expectedArray = [
    {
      id: 'hello',
    },
    {
      id: 'tb5155151',
    },
    {
      id: 1111111111,
    },
    {
      id: 'tb2326665',
    },
    {
      id: null,
    },
  ];

  const currentMovieId = {
    id: 'hello rss',
  };
  expect(removeEqualId(arrayWithMovieId, currentMovieId)).toEqual(expect.arrayContaining(expectedArray));
});

test('funtion should return true if of object and id of currentMovieId are equal, else false ', () => {
  const expectedArray = [
    {
      id: 'hello',
    },
    {
      id: 'tb5155151',
    },
    {
      id: 1111111111,
    },
    {
      id: 'tb2326665',
    },
    {
      id: null,
    },
  ];
  const currentMovieId = {
    id: 'tb515111',
  };
  expect(removeEqualId(arrayWithMovieId, currentMovieId)).toEqual(expect.arrayContaining(expectedArray));
});

test('funtion should return true if of object and id of currentMovieId are equal, else false ', () => {
  const expectedArray = [
    {
      id: 'hello',
    },
    {
      id: 'tb5155151',
    },
    {
      id: 1111111111,
    },
    {
      id: 'tb2326665',
    },
  ];
  const currentMovieId = {
    id: null,
  };
  expect(removeEqualId(arrayWithMovieId, currentMovieId)).toEqual(expect.arrayContaining(expectedArray));
});

test('funtion should return true if of object and id of currentMovieId are equal, else false ', () => {
  const expectedArray = [
    {
      id: 'hello',
    },
    {
      id: 'tb5155151',
    },
    {
      id: 1111111111,
    },
    {
      id: null,
    },
  ];
  const currentMovieId = {
    id: 'tb2326665',
  };
  expect(removeEqualId(arrayWithMovieId, currentMovieId)).toEqual(expect.arrayContaining(expectedArray));
});

test('funtion should return true if of object and id of currentMovieId are equal, else false ', () => {
  const expectedArray = [
    {
      id: 'hello',
    },
    {
      id: 'tb5155151',
    },
    {
      id: 'tb2326665',
    },
    {
      id: null,
    },
  ];
  const currentMovieId = {
    id: 1111111111,
  };
  expect(removeEqualId(arrayWithMovieId, currentMovieId)).toEqual(expect.arrayContaining(expectedArray));
});

test('funtion should return true if of object and id of currentMovieId are equal, else false ', () => {
  const expectedArray = [
    {
      id: 'hello',
    },
    {
      id: 'tb5155151',
    },
    {
      id: 1111111111,
    },
    {
      id: 'tb2326665',
    },
    {
      id: null,
    },
  ];
  const currentMovieId = {
    id: 'undefined',
  };
  expect(removeEqualId(arrayWithMovieId, currentMovieId)).toEqual(expect.arrayContaining(expectedArray));
});
