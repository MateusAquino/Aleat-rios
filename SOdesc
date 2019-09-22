// This script was made to help me translating my StackOverflow description o/

var pt = ["Técnico em Informática", "[Switch to English (en-US)](https://stackoverflow.com/users/7225971/mateus?tab=profile)", "\"Melhor uma crítica do que centenas de comentários inúteis.\" - Desconhecido", "Conta no LinkedIn", "pt_BR", "Linguagens de Programação (Aprendidas - Avançado)","Linguagens de Programação (Aprendidas - Básico)", "Linguagens de Programação (Aprendendo)", "Complementos (Aprendidos)","E muitas outras coisas...","Idiomas Gerais", "Fluente", "Nativo", "Aprendendo"];
var en = ["", "[Trocar para o Português (pt-BR)](https://pt.stackoverflow.com/users/63618/mateus?tab=profile)", "\"Better a critic than a hundred useless commentaries.\" - Unknown ", "LinkedIn Account", "en_US", "Programming Languages (Learned - Advanced)", "Programming Languages (Learned - Basic)", "Programming Languages (Learning)", "Complements (Learned)", "And many other things...", "General Languages", "Fluent", "Native", "Learning"];

function rep(txt, arr){ // replace idxs
	var res = txt;
	for (var i = 0; i < arr.length; i++)
		res = res.replace("{"+i+"}", arr[i]);
	res = res.replace("{lpaa}", strf(lpaa));
	res = res.replace("{lpab}", strf(lpab));
	res = res.replace("{lpa}", strf(lpa));
	res = res.replace("{ca}", strf(ca));
	return res;
}

function strf(arr){ // create skills formated string
	var res = "";
	for (var i = 0; i < arr.length; i++)
		res += (i!=0?" <b>|</b> ":"")+arr[i];
	return res;
}

var lpaa = ["Java"];                                                    //lrnd adv
var lpab = ["C", "JavaScript", "Python", "PHP", "C#"];                  //lrnd bsc
var lpa  = ["Haskell", "Ruby"];                                         //lrng
var ca   = ["CSS", "RegEx", "HTML", "Git", "HTTP", "Arduino", "Unity"]; //cplmnts

var txt = `## {0}

**{1}**

{2}  
**{3}:** [Mateus de Aquino | LinkedIn](https://www.linkedin.com/in/mateus-de-aquino/?locale={4})

<hr>
<b>{5}:</b><br>
{lpaa}

<b>{6}:</b><br>
{lpab}

<b>{7}:</b><br>
{lpa}

<b>{8}:</b><br>
{ca}

{9}

----------


<b>{10}:</b><br>
{11}: **Português** (pt-BR) *[{12}]* | **English** (en-US)<br>
{13}: **Spanish** (es) | **Français** (fr)`;

var txt_pt = rep(txt, pt);
var txt_en = rep(txt, en);
