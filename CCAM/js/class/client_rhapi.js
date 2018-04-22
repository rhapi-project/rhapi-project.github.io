class ClientRhapi {
	constructor () {
		this.CONVENTION_PS_SECTORS_DATE = "2015-01-01";
		this.serverDataKeywords = [];
		this.serverDataContext = null;
	}
	
	CONVENTION_PS_SECTORS_DATE_Get() {
		return this.CONVENTION_PS_SECTORS_DATE;
	}
	
	serverDataKeywordsGet() {
		return this.serverDataKeywords;
	}
	
	serverDataKeywordsGet2(callback) {
		callback(this.serverDataKeywords);
	}
	
	serverDataContextGet() {
		return this.serverDataContext;
	}
	
	serverDataKeywordsSet(valNew) {
		this.serverDataKeywords = valNew;
	}
	
	serverDataContextSet(valNew) {
		this.serverDataContext = valNew;
	}
	
	// Récupération de données au format json
	serverDataGet(controller, urlStart, url, htmlResultsReset, callback) {
		console.log("url : " + url);
		
		//var datas = "{\"informations\":\"[{\"codActe\":\"89HEN5\"}, {\"nomLong\":\"Description longue de l'acte.\"}, {\"totalSize\":\"34\"}]\"}";
		//callback(controller, urlStart, datas, datas, htmlResultsReset);
		
		$.ajax({
			url: url,
			method: "GET",
			data: {id : ""},
			//dataType: "text",
			dataType: "json",
			crossDomain: true,
			success: function (dataRequest) {
				var datas = dataRequest;
				console.dir(datas);
				//var datas = JSON.parse(dataRequest);
				callback(controller, urlStart, url, datas, htmlResultsReset);
			},
			error: function () {
				console.log("Ajax error");
			}
		});
	}
	
	// Méthode qui créé les liens externes de l'application.
	serverDataUrlPrepare(inputVal, medicalActCode, medicalActGridCode, medicalActDomCode) {
		
		//var urlStart = "http://163.172.80.120/0005-0001-0001/";
		var urlStart = "https://demo.rhapi.net/demo01";
		var urlKeyword = urlStart + "/CCAM/?texte=" + inputVal;
		var urlMedicalAct = urlStart + "/CCAM/" + medicalActCode;
		var urlContext = urlStart + "/CCAM/contextes";
		var urlPrice = urlMedicalAct + "/tarif?grille=" + medicalActGridCode + "&dom=" + medicalActDomCode;
		
		if (inputVal != null) {
			var inputValLength = inputVal.length;
		} else {
			var inputValLength = 0;
		}
		var result = [];
		result["inputVal"] = inputVal;
		result["inputValLength"] = inputValLength;
		result["urlStart"] = urlStart;
		result["urlKeyword"] = urlKeyword;
		result["urlMedicalAct"] = urlMedicalAct;
		result["urlContext"] = urlContext;
		result["urlPrice"] = urlPrice;
		return result;
	}
}