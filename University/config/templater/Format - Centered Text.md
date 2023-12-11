<%* 
let input = tp.file.selection()
if (input != "") {
	tR = `<p style="text-align:center">${input}$</p>`
} else {
	tR = `<p style="text-align:center">${tp.file.cursor()}$</p>`
}
%> 