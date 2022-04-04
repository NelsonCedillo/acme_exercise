import {findMatch} from './index';

describe('Test the function findMatch', () =>{
  describe('Test for maching in the same frame time', ()=>{
    const map = new Map();
    map.set('RENE-ASTRID', 1);
    test('Test same hours', ()=>{
      expect(
          findMatch('RENE=MO10:00-12:00,TU10:00-12:00\r\nASTRID=MO10:00-12:00'),
      ).toMatchObject(map);
    });
    test('Test intersection frame times: frame 1 into frame 2', ()=>{
      expect(
          findMatch('RENE=MO10:30-11:00,TU10:00-12:00\r\nASTRID=MO10:00-12:00'),
      ).toMatchObject(map);
    });
    test('Test intersection frame times: frame 2 into frame 1', ()=>{
      expect(
          findMatch('RENE=MO09:30-13:00,TU10:00-12:00\r\nASTRID=MO10:00-12:00'),
      ).toMatchObject(map);
    });
    test('Test intersection frame times: frame 1 left frame 2', ()=>{
      expect(
          findMatch('RENE=MO09:30-11:00,TU10:00-12:00\r\nASTRID=MO10:00-12:00'),
      ).toMatchObject(map);
    });
    test('Test intersection frame times: frame 1 right frame 2', ()=>{
      expect(
          findMatch('RENE=MO10:30-13:00,TU10:00-12:00\r\nASTRID=MO10:00-12:00'),
      ).toMatchObject(map);
    });
  });
  describe('Test not maching in the same frame time', ()=>{
    const map = new Map();
    test('Test  not intersection frame times: frame 1 left frame 2', ()=>{
      expect(
          findMatch('RENE=MO08:30-09:00,TU10:00-12:00\r\nASTRID=MO10:00-12:00'),
      ).toMatchObject({});
    });
    test('Test  not intersection frame times: frame 1 right frame 2', ()=>{
      expect(
          findMatch('RENE=MO08:30-09:00,TU10:00-12:00\r\nASTRID=MO10:00-12:00'),
      ).toMatchObject(map);
    });
  });
});
