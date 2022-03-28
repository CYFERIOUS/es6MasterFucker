

const assert = require('assert')
import Arithmetics from '../modules/arithmetics.js'


describe('calculator arithmetics', () => {

 const numero = new Arithmetics(0);
  it('should be int type', () => {
   
    const isInteger = Number.isInteger(numero.number);
    assert.equal(true, isInteger);
  })


  it('Adding operation', () => {
    const isAdding = numero.adittion(1,1);
    assert.equal(2, isAdding);
  })

  it('Substraction operation', () => {
    const isSubtracting = numero.subtraction(1,1);
    assert.equal(0, isSubtracting);
  })

  it('multiplication operation', () => {
    const isMultiplying = numero.multiplication(1,1);
    assert.equal(1, isMultiplying);
  })

it('division operation', () => {
    const isDividing = numero.division(1,1);
    assert.equal(1, isDividing);
  })



});
