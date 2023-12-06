<%* 
let input = tp.file.selection()
if (input != "") {
	tR = `<sup>${input}</sup>`
} else {
	tR = `<sup>${tp.file.cursor()}</sup>`
}
%> 