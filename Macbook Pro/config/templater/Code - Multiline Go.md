<%* 
let input = tp.file.selection()
switch(input) {
	case "":
		tR = "```go unwrap title:\n" +
		"func main() {\n" +
		`	${tp.file.cursor()}\n` +
		"}\n"+
		"```"
		break
	case "fold":
		tR = "```go unwrap fold title:\n" +
		"func main() {\n" +
		`	${tp.file.cursor()}\n` +
		"}\n"+
		"```"
		break
}
%>

