function fix(wrongLatin1) {
	return decodeURI(encodeURI(wrongLatin1).replace(/%C3%87/g, 'Ç').replace(/%C3%A7/g,'ç').replace(/(?<=%C3).+?%C2/g,""))
}

console.log(fix('SÃ£o JosÃ© dos Campos')) // prints: São José dos Campos

/* Example of encoding issues:

ç -> Ã§
À -> Ã€
Ã -> Ãƒ
*/
