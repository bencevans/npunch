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

	return fs.symlinkSync(path, self.nodepunchPath + '/' + projectName);
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

exports.unlink = function (projectNameOrPath) {

	//TODO: Check and turn off if running before unlink

	// Check if using Name.
	if (fs.existsSync(self.nodepunchPath + '/' + projectNameOrPath)) {

		return fs.unlinkSync(self.nodepunchPath + '/' + projectNameOrPath);

		// Else Try as Path
	} else if (fs.existsSync(projectNameOrPath)) {

		var project = _.find(self.list(), function (project) {
			return (project.path == projectNameOrPath) ? true : false;
		})

		if (project) {
			return fs.unlinkSync(self.nodepunchPath + '/' + project.name);
		} else {
			throw "No Project Found"
		}

	} else {

		throw "No Project Found."
	}

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

exports.start = function () {

}

exports.stop = function () {

}