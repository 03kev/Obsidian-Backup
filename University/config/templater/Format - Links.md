<%* 
let input = tp.file.selection()
if (input != "") {
	tR = `[${tp.file.cursor()}](${input})`
} else {
	tR = "[" + tp.file.cursor() + "]()"
}
%> 