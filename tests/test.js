var assert = require("assert")
var nodepunch = require("../lib/npunch.js")



describe('Library', function(){
	describe('#link()', function(){
		it('should return true when successfully linking a project', function(){
			assert.equal(true, nodepunch.link(process.cwd() + '/tests/testProject'));
		})
		it('should error if a project already exists with the same name', function(){
			assert.equal(Error, nodepunch.link(process.cwd() + '/tests/testProject'));
		})
	})

	describe('#exists()', function(){
		it('should return false when the value is not present', function(){
			assert.equal(false, nodepunch.exists());
		})
		it('should return false when a given project does not exist', function(){
			assert.equal(false, nodepunch.exists("AProjectThatDoesNotExist"));
		})
	})

	describe('#unlink()', function(){
		it('should return true when successfully unlinked a project', function(){
			assert.equal(true, nodepunch.unlink('testProject'));
		})
		it('should error if a project doesn\'t exist when trying to unlink', function(){
			assert.equal(Error, nodepunch.unlink('testProject'));
		})
	})
})