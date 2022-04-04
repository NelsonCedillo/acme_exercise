import {hourToMin, textToObject} from './modules';

describe('Test function hourToMin', ()=>{
  test('Test Convert hours with minutes to only minutes', ()=>{
    expect(hourToMin(['12:00-14:00', '16:00-20:00']),
    ).toEqual(['720-840', '960-1200']);
  });
});
describe('Test function textToObject', ()=>{
  const dataObject = {};
  dataObject.names = ['RENE'];
  dataObject.hours= [['MO10:15-12:00', 'TU10:00-12:00']];
  dataObject.len = 1;
  test('Test Prework Data Input= Covert text to object', ()=>{
    expect(textToObject('RENE=MO10:15-12:00,TU10:00-12:00'),
    ).toMatchObject(dataObject);
  });
});
