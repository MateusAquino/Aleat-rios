// This script was developed to help an institution to transport .xlsx data (Excel) 
// to their database via POST, therefore, private data will be censored.

function addScript(src) {
  var s = document.createElement('script');
  s.setAttribute('src', src);
  document.body.appendChild(s);
}

// APIs necessárias (Decodificador de xlsx e modal popups)
addScript('https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.14.1/xlsx.full.min.js');
addScript('https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/7.33.1/sweetalert2.all.js');

// Lê o arquivo .xlsx
var do_file = (function() {
	var rABS = typeof FileReader !== "undefined" && (FileReader.prototype||{}).readAsBinaryString;
	var domrabs = document.getElementsByName("userabs")[0];
	if(!rABS) domrabs.disabled = !(domrabs.checked = false);

	var use_worker = typeof Worker !== 'undefined';
	var domwork = document.getElementsByName("useworker")[0];
	if(!use_worker) domwork.disabled = !(domwork.checked = false);

	return function do_file(files) {
		rABS = true;
		use_worker = false;
		var f = files[0];
		var reader = new FileReader();
		reader.onload = function(e) {
			var data = e.target.result;
			if(!rABS) data = new Uint8Array(data);
			process_wb(XLSX.read(data, {type: rABS ? 'binary' : 'array'}));
		};
		if(rABS) reader.readAsBinaryString(f);
		else reader.readAsArrayBuffer(f);
	};
})();

// Processa o workbook 
var process_wb = (function() {
	var to_json = function to_json(workbook) {
		var result = {};
		workbook.SheetNames.forEach(function(sheetName) {
			var roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {header:1});
			if(roa.length) result[sheetName] = roa;
		});
		return JSON.stringify(result, 2, 2);
	};

	return function process_wb(wb) {
		global_wb = wb;
		var output = to_json(wb);
		process(output);
	};
})();

var primeiraRun = true;
var enviar = false;
var i = 1, stopi = 1;

// Processa os dados de cada linha
function process(dados){
	dados = JSON.parse(dados)["Plan1"];
	var jMeses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  var jSalas = [null,null,null,"Sala Amarela 1 - 1º Andar","Sala Amarela 2 - 1º Andar","Sala Amarela 3 - Informatica - 1º Andar",
		"Sala Azul 1 - 2º Andar","Sala Azul 2 - 2º Andar","Sala Azul 3 - 2º Andar","Sala Azul 4 - 2º Andar","Sala Verde 1 - 3º Andar",
		"Sala Verde 2 - 3º Andar","Sala Verde 3 - 3º Andar","Sala Verde 4 - 3º Andar","Sala Verde 5 - 3º Andar","Sala Azul Celeste - Santuário Térreo",
		"Sala Azul - Santuário - 1º Andar","Sala Amarela - Santuário (Antiga Pascom) - 1º Andar","Sala Cinza - Subsolo","Sala Vermelha - Subsolo",
		"Sala Laranja - Subsolo","Sala Verde - Subsolo",null,"Auditório - Espaço Vida","Sala - Esperança","Restaurante Maior","Santuário","Igreja",
		"Restaurante Obra Social","Confessionário","Pátio",null,null,null,null,null,null,null,null,null,null,null,"barraca ","CP4"];
	for (i = 1; i<dados.length; i++){
		$('.importar').text("Importando... "+i+"/"+(dados.length-1));
		console.log("Importando... "+i+"/"+(dados.length-1));
		row = dados[i];
		stopi = dados.length+1;

		if (!row[0] || jMeses.indexOf(row[0])==-1){
			continue;
		}
		var email;
		if (row[5].indexOf("@")==-1)
			email = "***********************************";
		else
			email = row[5];
		var mes=jMeses.indexOf(row[0])+1;

		// -----------
		var hora = row[3].split(" ");
		var data = [row[1].split("-")[0].toString(), mes.toString(), ano.toString()];

		var dataI = new Date();
		dataI.setFullYear(data[2], (parseInt(data[1]) - 1), data[0]);
		var horaI = hora[0].split(":");
		dataI.setHours(horaI[0], horaI[1], 0, 0);
		
		var dataF = new Date();
		dataF.setFullYear(data[2], (parseInt(data[1]) - 1), data[0]);
		var horaF = hora[2].split(":");
		dataF.setHours(horaF[0], horaF[1], 0, 0);
		
		var dataAux = new Date();
		dataAux.setFullYear(data[2], (parseInt(data[1]) - 1), data[0]);
		dataAux.setHours(0, 0, 0, 0);
		// --------
		var sala = row[7].replace("0", "");
		var jSalaId = -1;
		for (let idx = 0; idx<jSalas.length; idx++){
			if (!jSalas[idx])
				continue;
			if (jSalas[idx].startsWith(sala)){
				jSalaId = idx;
				break;
			}
		}
		if (jSalaId==-1){
			console.log("SALA: '" + sala + "' DESCONHECIDA!");
			continue;
		}
		//---------
		var requisicao = {
					"id" : "0",
					"data" : dataAux,
					"dataInicio" : dataI,
					"dataFim" : dataF,
					"nome" : row[4],
					"email" : email,
					"pastoral" : {
						"id" : 59 // SECRETARIA
					},
					"sala" : {
						"id" : jSalaId
					},
					"recurso" : null,
					"recursos" : null,
					"motivo" : row[6],
					"status" : ****
		}
		// console.log('Data: ' + dataAux.getDate() + "/" + (dataAux.getMonth()+1) + "/" + dataAux.getFullYear() +
  // 					  '\nInicio: ' + dataI.getHours() + ":" + dataI.getMinutes() + ":" + dataI.getSeconds() +
  // 					  '\nFim: ' + dataF.getHours() + ":" + dataF.getMinutes() + ":" + dataF.getSeconds() +
  // 					  '\nNome: ' + row[4] +
  // 					  '\nEmail: ' + email +
  // 					  '\nPastoral: SECRETARIA' +
  // 					  '\nSala: ' + jSalas[jSalaId] +
  // 					  '\nMotivo: ' + row[6]);
		upJson(requisicao);
	}
	$('.importar').text("Importar do Excel");
}

// Envia a requisição json para que o site suba no BD
function upJson(json){
	$.ajax({
		url: "****************",
		method: "POST",
	 	data: JSON.stringify(json),
		dataType: "json",
		contentType: 'application/json; charset=utf-8',
		mimeType: 'application/json; charset=utf-8' ,
		success : function(data) {} 
	});	
}

// Função do botão -> sobe o excel pro leitor
var ano = 0;
async function upExcel() {
	var arch;
  	const {value: file} = await Swal({
    	title: 'Selecione o arquivo .xlsx',
    	//input: 'file',
    	//inputAttributes: {'accept': '.xlsx', 'aria-label': 'Subir planilha do Excel'},
    	html: '<input id="xlf" class="swal2-input" type="file" accept=".xlsx" style="border:0;">'+
    	'<br>Definir ano: <input type="number" id="ano" min="1900" max="9999" step="1"/>'+
    	'<br>OBS: Pastoral pré-definida: SECRETARIA (id=59)',
    	confirmButtonText: 'Processar',
    	showLoaderOnConfirm: true,
    	onOpen: function() {
    		$('#ano').val(new Date().getFullYear());
    		xlf = document.getElementById('xlf');
    		if(!xlf.addEventListener) return;
			function handleFile(e) {arch = e;}
			xlf.addEventListener('change', handleFile, false);
    	},
    	preConfirm: function() {
			if(!arch) return;
			ano = $('#ano').val();
			do_file(arch.target.files);
    	}
  	});
} 

// Add botões principais
var node = document.createElement("span");
node.className = "fc-button fc-state-default fc-corner-right fc-state-active importar";
node.innerText = "Importar do Excel";
node.style="background-color: green;";
node.onclick=function(){upExcel();}
$(".fc-header-right")[0].appendChild(node);

node = document.createElement("span");
node.className = "fc-button fc-state-default fc-corner-right fc-state-active";
node.innerText = "Parar Importação";
node.onclick=function(){
	i=stopi;
	$('.importar').text("Importar do Excel");
}
$(".fc-header-right")[0].appendChild(node);
