#n(ode)punch

Forever. Node. Pow.

nodepunch interfaces Pow and Forever in order to run your apps in development with no pain.

###Intended Usage

	# npunch
	<<COMMAND LIST>>
	
	# npunch link <path> <projectName>
	Symlinks the current directory to ~/.nodepunch so nodepunch knows the projects existance.
	<path> will be assumesd the path to current working dir.
	<projectName> will be assumed as the current working directory's name.
	
	#npunch list
	displays a list of added projects along with their status
	
	#npunch unlink <projectName>
	removes project symlink from ~/.nodepunch
	<projectName> If none supplied, check symlinks for current dir or parent of current dir.
	
	#npunch start <-- watch [false|true]>
	starts an instance if one doesn't already exist
	<watch> assume true
	
	#npunch restart
	restarts project's instance
	
	#npunch watch [on/true|off/false]
	Turns on/off watch restarting (Restarting on filesystem change)
	
	#npunch stop
	stops project's instance
	
	#npunch open
	calls system default open webaddress.