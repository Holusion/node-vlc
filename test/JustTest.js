
describe('Array', function(){
  describe('#indexOf()', function(){
    it('should return -1 when the value is not present', function(){
	var res = [1,2,3];
      res.indexOf(0).should.equal(-1);
      res[0].should.equal(1);
    })
  })
})


