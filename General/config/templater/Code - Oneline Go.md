<%* 
let input = tp.file.selection()
if (input != "") {
	tR = `\`{go}${input}\``
} else {
	tR = "`{go}" + tp.file.cursor() + "`"
}
%> 