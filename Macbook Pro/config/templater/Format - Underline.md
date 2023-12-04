<%* 
let input = tp.file.selection()
if (input != "") {
	tR = `<ins>${input}</ins>`
} else {
	tR = `<ins>${tp.file.cursor()}</ins>`
}
%> 