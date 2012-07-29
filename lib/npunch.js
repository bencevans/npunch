var fs = require('fs'),
_ = require('underscore');
exports.powPath = process.env.HOME + '/.pow'
exports.nodepunchPath = process.env.HOME + '/.nodepunch'
var self = this;


// Public: Creates a symlink in the nodepunchPath to a project
//
// path  - String of the Absolute Path to the projects root.
// projectName - (Optional) String of an alternative name for the project.
//
// Examples
//
//   nodepunch.link('/home/bencevans/Development/HNCache-Server')
//   # => true
//
//   nodepunch.link('/home/bencevans/Development/HNCache-Server', 'HNCache')
//   # => true
//
// Returns True if all a success else an Error is thrown.

exports.link = function (path, projectName) {

	// If no projectName is given, extract it as the child directory
	if(typeof projectName == 'undefined') {
		var splitPath = path.split('/');
		var projectName = splitPath[splitPath.length - 1];
	}

	var linkResult = fs.symlinkSync(path, self.nodepunchPath + '/' + projectName);

	if(typeof linkResult == 'undefined')
		return true
	else
		return linkResult
}

// Public: Removes a symlink in the nodepunchPath to a project
//
// projectNameOrPath - String of the Path to a project or the projects name.
//
// Examples
//
//   nodepunch.unlink('/home/bencevans/Development/HNCache-Server')
//   # => true
//
//   nodepunch.unlink('/home/bencevans/Development/HNCache-Server', 'HNCache')
//   # => true
//
// Returns True if all a success else an Error is thrown.

exports.unlink = function (projectName) {

	// Check the project exists
	if(self.exists(projectName) == false) {
		throw Error("No Project Found")
	}

	//TODO: Check and turn off if running before unlink

	// Go forth and unlink
	var unlinkResult = fs.unlinkSync(self.nodepunchPath + '/' + projectName);

	if(typeof unlinkResult == 'undefined')
		return true
	else
		return unlinkResult


}

// Public: Generates Object containing all projects info
//
// Examples
//
//   nodepunch.list() ... With Projects
//   # => [ { name: 'HNCache-Server',
//            path: '/Users/bencevans/Development/HNCache/HNCache-Server' },
//          { name: 'TheMinecraftFilesJS',
//            path: '/Users/bencevans/Development/TheMinecraftFilesJS' } ]
//
//   nodepunch.list() ... With No Projects
//   # => []
//
// Returns object of all project's info.

exports.list = function () {

	var projects = [];

	_.each(fs.readdirSync(self.nodepunchPath), function (name) {
		projects.push(self.projectInfo(name));
	});

	return projects;
}

// Public: Generates Object containing all a single project's info
//
// projectName - String of a projects name.
//
// Examples
//
//   nodepunch.projectInfo(HNCache-Server) ... With Projects
//   # => { name: 'HNCache-Server',
//          path: '/Users/bencevans/Development/HNCache/HNCache-Server' }
//
//
// Returns object of a project's info if sucessful else throws error. 

exports.projectInfo = function (projectName) {

	if(fs.existsSync(self.nodepunchPath + '/' + projectName)) {
		return {name:projectName, path:fs.readlinkSync(self.nodepunchPath + '/' + projectName)};
	} else {
		throw "No Project Found"
	}

}

// Public: Finds projectName from anything relative. (directory/name)
//
// projectName - String of a projects name.
//
// Examples
//
//   nodepunch.findProjectName('/Users/bencevans/Development/HNCache/HNCache-Server') //When the Project DOES EXIST
//   # => 'HNCache-Server'
//
//   nodepunch.findProjectName('HNCache-Server') //When the Project DOES EXIST
//   # => 'HNCache-Server'
//
//   nodepunch.findProjectName('HNCache-Server') //When the Project DOES NOT EXIST
//   # => false
//
//
// If a project is found Returns string of projectsName
// Else returns False.

exports.findProjectName = function (identifier) {

	var searchResult = _.find(self.list(), function(project) {
		if (identifier == project.name || identifier == project.path)
			return true
		else
			return false
	})

	if(typeof searchResult !== "undefined")
		return searchResult.name
	else
		return false
}

// Public: Finds if a project exists or not.
//
// projectName - String of a projects name.
//
// Examples
//
//   nodepunch.exists('HNCache-Server') //When the Project DOES EXIST
//   # => true
//
//   nodepunch.exists('HNCache-Server') //When the Project DOES NOT EXIST
//   # => false
//
//
// If a project is found Returns true (bool)
// Else returns false (bool).

exports.exists = function (projectName) {

	var searchResults = _.find(this.list(), function(project){
		if(projectName == project.name)
			return true
		else
			return false
	})

	if(searchResults)
		return true
	else
		return false

}

exports.start = function () {

}

exports.stop = function () {

}