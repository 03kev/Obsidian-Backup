<%* 
let input = tp.file.selection()
if (input != "") {
	tR = `<sub>${input}</sub>`
} else {
	tR = `<sub>${tp.file.cursor()}</sub>`
}
%> 