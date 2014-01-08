require! {
	fs
	node-path: path

	prelude: 'prelude-ls'
}

const folder = 'G:/dev/github/ariatemplates/temp/documentation-code/samples'

# Get list of files ------------------------------------------------------------

# files = []

getNodeType = (path) ->
	stats = fs.statSync path

	switch
	| stats.isFile! => 'file'
	| stats.isDirectory! => 'directory'

getFilesInfo = (path) ->
	stats = fs.statSync path
	content = fs.readFileSync path, 'utf-8'

	{
		stats.size
		lines: content.split /\r\n|[\r\n]/g .length
	}

processFolder = (path, filter) ->
	nodes = fs.readdirSync path

	nodes = for node in nodes
		fullpath = node-path.join path, node
		{
			fullpath
			type: getNodeType fullpath
		}

	if filter? => nodes = [node for node in nodes | filter node]

	for node in nodes | node.type is 'directory'
		node.nodes = processFolder node.fullpath, filter

	nodes

traverse = (node, cb) ->
	cb node
	if node.type is 'directory' => for node in node.nodes => traverse node, cb



nodes = processFolder folder #, filter

templates = []
for node in nodes
	traverse node, (node) ->
		if node.type is 'file' and node-path.extname(node.fullpath) is '.tpl'
			templates.push node

templates = for template in templates
	infos = getFilesInfo template.fullpath
	{
		template.fullpath
		infos.size
		infos.lines
		ratio: infos.size / infos.lines
	}
console.log templates.length
console.log!

# ratios -----------------------------------------------------------------------

ratios = [template.ratio for template in templates]
# console.log ratios

sum = (values) ->
	result = 0
	for number in values => result += number
	result
mean = (values) -> sum(values) / values.length

console.log mean ratios

# by lines ---------------------------------------------------------------------

if no
	sortedByLines = templates.sort (a, b) ->
		a .= lines
		b .= lines

		switch
		| a > b => 1
		| a is b => 0
		| a < b => -1

# logs -------------------------------------------------------------------------

# sortedByLines.reverse!
# console.log sortedByLines

# console.log mean ratios

# extract ----------------------------------------------------------------------

if no
	templates = sortedByLines.reverse!

	kept = []
	minLines = 1000
	maxRatio = mean ratios
	currentLines = 0
	for template in templates | currentLines < minLines
		if template.ratio <= maxRatio
			kept.push template
			currentLines += template.lines

	# console.log kept
	# console.log currentLines

	# for tpl in kept => console.log tpl.fullpath


# extract fixed number of lines ------------------------------------------------

extractFixed = (lines) ->
	distances = prelude.sortBy (.length), [{
		length: prelude.abs template.lines - lines
		template
	} for template in templates]

console.log extractFixed(200).0
console.log extractFixed(500).0
