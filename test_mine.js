var assert = require('assert');
var mine = require('../app.js')

describe('MineSweeper', function(){
  describe('timer works', function(){
    it('60 seconds ', function(){
      assert.equal('1', mine.testMinuteTime(60));
    })
  })
  describe('different types', function(){
    it('different amount of mines', function(){
      assert.equal('25', mine.level('Hard'));
    })
  })
  describe('step on mine', function(){
    it('gameover', function(){
      assert.equal('0', mine.lose(1));
    })
  })
  describe('avoid all the mines', function(){
    it('win', function(){
      assert.equal('1', mine.win(85));
    })
  })
})