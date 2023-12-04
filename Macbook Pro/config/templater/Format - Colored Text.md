<%* 
let input = tp.file.selection()
switch(input) {
	case "":
		tR = `<span style="color:${tp.file.cursor()}"></span>`
		break
	case "red": 
		tR = `<span style="color:rgb(255,0,0)">${tp.file.cursor()}</span>`
		break
	case "dred": 
		tR = `<span style="color:rgb(208,0,0)">${tp.file.cursor()}</span>`
		break
	case "dlblue": 
		tR = `<span style="color:rgb(77,152,219)">${tp.file.cursor()}</span>`
		break
	case "lime": 
		tR = `<span style="color:rgb(0,184,72)">${tp.file.cursor()}</span>`
		break
	default:
		tR = `<span style="color:${tp.file.cursor()}">${input}</span>`
		break
}
%>