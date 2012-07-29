var assert = require("assert")
var nodepunch = require("../lib/npunch.js")


describe('Library', function(){
	describe('#exists()', function(){
		it('should return false when the value is not present', function(){
			assert.equal(false, nodepunch.exists());
		})
		it('should return false when a given project does not exist', function(){
			assert.equal(false, nodepunch.exists("AProjectThatDoesNotExist"));
		})
	})
})