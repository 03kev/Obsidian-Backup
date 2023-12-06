<%* 
let input = tp.file.selection()
if (input != "") {
	tR = `![[${input} | ]]`
} else {
	tR = `![[${tp.file.cursor()} | ]]`
}
%>