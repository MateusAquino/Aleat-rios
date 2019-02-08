function fix(wrongLatin) {
	return decodeURI(encodeURI(wrongLatin).replace(/%C3%87/g, 'Ç').replace(/%C3%A7/g, 'ç').replace(/(?<=%C3).{1,3}%C2/g, ''))
}

console.log(fix('SÃ£o JosÃ© dos Campos')) // prints: São José dos Campos

/* Example of encoding issues:

ç -> Ã§
À -> Ã€
Ã -> Ãƒ
*/
