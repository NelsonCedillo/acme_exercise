import {findMatch} from './index';

describe('Test the function findMatch', () =>{
  describe('Test for find ', ()=>{
    test('Suma 1', ()=>{
      expect(
          findMatch('RENE=MO10:15-12:00,TU10:00-12:00\r\nASTRID=MO10:00-12:00'),
      ).toEqual({'RENE-ASTRID': '1'});
    });
  });
  /* test('Test 1', () => {
    expect(sum(1, 2)).toEqual(3);
  });*/
});
