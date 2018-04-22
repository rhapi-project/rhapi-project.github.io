class Controller {
	constructor () {
		this.controller = this;
		this.clientRhapi = new ClientRhapi();
		this.menu = new Menu();
		this.searchCcam = new SearchCCAM();
		this.medicalAct = new MedicalAct();
	}
	
	// [1/2] Récupération de l'objet "contextes".
	controlContext () {
		var serverUrls = this.clientRhapi.serverDataUrlPrepare(null, null, null);
		this.clientRhapi.serverDataGet(this.controller, serverUrls["urlStart"], serverUrls["urlContext"], false, this.controller.contextResults);
	}
	
	// [2/2] Récupération de l'objet "contextes".
	contextResults(controller, urlStart, urlComplete, datas, htmlResultsReset) {
		controller.clientRhapi.serverDataContextSet(datas);
		controller.menu.versionUpdate("Ver. " + datas.version);
		controller.control();
	}
	
	// Une fois l'objet "contextes" récupéré, appel de la méthode de contrôle qui contient les principaux événements de l'application.
	control () {
		var controller = this.controller;
		var clientRhapi = this.clientRhapi;
		var searchCcam = this.searchCcam;
		var medicalAct = this.medicalAct;
		
		// ####################
		// Page "Recherche"
		// ####################
		
		// Le clique du logo ramène à la page de recherche.
		$("#menu-logo").click(function() {
			medicalAct.pauseOn();
			searchCcam.resumeOn();
		});
		
		var dateInputDefault = new Date();
		var dateInputDefaultMonth = dateInputDefault.getMonth() + 1 + "";
		dateInputDefaultMonth = (dateInputDefaultMonth.length == 1)?"0" + dateInputDefaultMonth:dateInputDefaultMonth;
		var dateInputDefaultDisplay = dateInputDefault.getDate() + "/" + dateInputDefaultMonth + "/" + dateInputDefault.getFullYear();
		searchCcam.dateSearchSet(dateInputDefaultDisplay);
		
		var inputVal, inputValLength = 0;
		var urlStart, urlKeyword;
		
		// Champ de date de la page de recherche d'un acte.
		$("#input-search-date").datepicker({
			altField: "#input-search-date",
			closeText: 'Fermer',
			prevText: 'Précédent',
			nextText: 'Suivant',
			currentText: 'Aujourd\'hui',
			monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
			monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
			dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
			dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
			dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
			weekHeader: 'Sem.',
			dateFormat: 'dd/mm/yy'
		});
		
		// Quand une touche du clavier est tapée dans le champ de recherche
		$("#input-search").keydown(function(keyPressed) {
			setTimeout(function () {
				console.debug("keyPressed.which : " + keyPressed.which);
				
				inputVal = searchCcam.inputSearchGetKeyword();
				console.debug("inputVal : " + inputVal);
				console.debug("controller.searchCcam.inputSearchLastGet() : " + controller.searchCcam.inputSearchLastGet());
				if (inputVal != controller.searchCcam.inputSearchLastGet()) {
					console.log("inputVal != controller.searchCcam.inputSearchLastGet()");
					controller.searchCcamF(controller, true);
				} //else if (keyPressed.which == 13) {
				//	keyPressed.preventDefault();
				//	return false;
				//}
				
				controller.searchCcam.inputSearchNextSet(controller.searchCcam.inputSearchGetKeyword());
				
				inputVal = searchCcam.inputSearchGetKeyword();
				var dataUrl = clientRhapi.serverDataUrlPrepare(inputVal, null, null, null);
				inputVal = dataUrl["inputVal"];
				inputValLength = dataUrl["inputValLength"];
				urlStart = dataUrl["urlStart"];
				urlKeyword = dataUrl["urlKeyword"];
			}, 50);
		});
		
		// [1/3] Autocomplétion lors de la frappe dans le champ de recherche d'un acte.
		$("#input-search").autocomplete({
			source: function (request, reply){
				console.log("- input-search.autocomplete -");
				searchCcam.inputSearchAutocompleteReplySet(reply);
				controller.autocomplete(controller);
			},
			minLength: 3
		});
		
		// Clique d'un élément du menu des suggestions proposées par l'autocomplétion.
		$(".ui-autocomplete").click(function () {
			console.warn("- .ui-autocomplete click -");
			inputVal = searchCcam.inputSearchGetKeyword();
			console.debug("inputVal : " + inputVal);
			if (inputVal != controller.searchCcam.inputSearchCurrentGet() && inputVal != controller.searchCcam.inputSearchLastGet()) {
				console.info("controller.searchCcam.inputSearchLastGet() (.ui-autocomplete click) : " + controller.searchCcam.inputSearchLastGet());
				controller.searchCcamF(controller, false);
			}
		});
		
		// Bouton qui affiche plus de résultats.
		$("#result-button-more").click(function() {
			if (searchCcam.resultsButtonMoreActiveGet() == false) {
				searchCcam.resultsButtonMoreActiveSet(true);
				searchCcam.resultsMoreLoading();
				urlStart = searchCcam.resultsElementsUrlStartGet();
				var urlMoreElement = searchCcam.resultsElementsUrlPageNextGet();
				console.log("urlStart : " + urlStart);
				console.log("urlMoreElement : " + urlMoreElement);
				var htmlResultsReset = false;
				clientRhapi.serverDataGet(controller, urlStart, urlMoreElement, htmlResultsReset, controller.searchResults)
			} else {
				console.log("command inactive !");
			}
		});
		
		// ####################
		// Page "Acte médical"
		// ####################
		
		$("#medical-act-back").click(function() {
			medicalAct.pauseOn();
			searchCcam.resumeOn();
		});
		
		$("#medical-act-conventions-ps").change(function() {
			controller.medicalActUpdate(controller);
		});
		$("#medical-act-dom").change(function() {
			controller.medicalActUpdate(controller);
		});
	}
	
	// [2/3] Autocomplétion lors de la frappe dans le champ de recherche d'un acte.
	autocomplete (controller) {
		console.log("== autocomplete ==");
		var reply = controller.searchCcam.inputSearchAutocompleteReplyGet();
		controller.searchCcam.inputSearchLoading(true);
		controller.clientRhapi.serverDataKeywordsGet2(function (datas) {
			controller.autocomplete2(controller, reply, datas);
		});
		console.log("== End of autocomplete ==");
	}
	
	// [3/3] Autocomplétion lors de la frappe dans le champ de recherche d'un acte.
	autocomplete2 (controller, reply, datas) {
		console.log("== autocomplete2 ==");
		controller.searchCcam.inputSearchLoading(false);
		if (controller.searchCcam.inputSearchGetKeywordLength() >= 3) {
			reply($.map(datas.slice(0, 4), function(object){
				console.log("reply keyword");
				return object;
			}));
		}
		console.log("== End of autocomplete2 ==");
	}
	
	// [1/3] La recherche d'un acte par mot-clé est lancée.
	searchCcamF (controller, startForce) {
		controller.searchCcam.inputSearchLastSet(controller.searchCcam.inputSearchGetKeyword());
		if (controller.searchCcam.inputSearchGetKeywordLength() >= 3) {
			controller.searchCcamF2(controller);
		} else {
			controller.searchCcam.inputSearchReady(false);
			//searchCcam.autocompleteBoxShow(false);
		}
	}
	
	// [2/3] La recherche d'un acte par mot-clé est lancée.
	searchCcamF2 (controller) {
		if (controller.searchCcam.inputSearchCurrentGet() === "") {
			controller.searchCcam.inputSearchCurrentSet(controller.searchCcam.inputSearchNextGet());
			controller.searchCcam.inputSearchNextSet("");
		} else {
			return;
		}
		controller.searchCcam.resultsContentLoading();
		controller.searchCcam.inputSearchReady(true);
		var inputVal = controller.searchCcam.inputSearchGetKeyword();
		var htmlResultsReset = true;
		var dataUrl = controller.clientRhapi.serverDataUrlPrepare(inputVal, null, null, null);
		controller.clientRhapi.serverDataGet(controller, dataUrl["urlStart"], dataUrl["urlKeyword"], htmlResultsReset, controller.searchResults);
	}
	
	// [3/3] La recherche d'un acte par mot-clé est lancée.
	searchResults (controller, urlStart, urlComplete, datas, htmlResultsReset) {
		//console.log("== searchResults ==");
		//codes = [];
		//codes[0] = "azerty1";
		//codes[1] = "azerty2";
		//codes[2] = "azerty3";
		//codes[3] = "azerty4";
		var informations = datas.informations;
		var codes = datas.results;
		var linksNext = null;
		
		//console.log("controller.searchCcam.inputSearchNextGet() : " + controller.searchCcam.inputSearchNextGet());
		//console.log("controller.searchCcam.inputSearchCurrentGet() : " + controller.searchCcam.inputSearchCurrentGet());
		
		controller.clientRhapi.serverDataKeywordsSet(datas.keywords);
		//console.log("controller.clientRhapi.serverDataKeywordsGet() : " + controller.clientRhapi.serverDataKeywordsGet());
		controller.autocomplete(controller);
		
		if (controller.searchCcam.inputSearchNextGet() != "" && controller.searchCcam.inputSearchNextGet() != controller.searchCcam.inputSearchCurrentGet()) {
			console.log("controller.searchCcam.inputSearchCurrentGet() != controller.searchCcam.inputSearchNextGet()");
			//console.log("urlComplete : " + urlComplete);
			controller.searchCcam.inputSearchCurrentSet("");
			
			// Relance de la recherche d'un acte à partir de la méthode "searchCcamF2".
			controller.searchCcamF2(controller);
			//controller.clientRhapi.serverDataGet(controller, urlStart, urlComplete, htmlResultsReset, controller.searchResults);
		} else {
			console.log("controller.searchCcam.inputSearchCurrentGet() == controller.searchCcam.inputSearchNextGet()");
			// La requête vers la BDD est terminée et le contenu du champ de recherche n'a pas changé depuis que la requête vers la BDD a commencée, donc la recherche est terminée.
			controller.searchCcam.resultsButtonMoreActiveSet(false);
			controller.searchCcam.inputSearchCurrentSet("");
			controller.searchCcam.inputSearchNextSet("");
			if (controller.searchCcam.inputSearchGetKeywordLength() >= 3) {
				// La page de recherche a fini de charger.
				controller.searchCcam.resultsContentLoaded(htmlResultsReset);
				controller.searchCcam.resultsMoreLoaded();
				controller.searchCcam.resumeOn();
				
				// Création de la liste des résultats de recherche.
				controller.searchCcam.tableCreateTitles(informations);
				var f = controller.searchCcam.resultsElementsIndexGet();
				codes.forEach(function(code){
					controller.searchCcam.tableCreate(controller, informations, code, f);
					//console.log("f : " + f);
					f++;
				});
				
				// la var "f" représente le numéro de la ligne du tableau des résultats de recherche. Quand le tableau est fini d'être créé, on stocke le numéro + 1 de la dernière ligne dans une var car quand une nouvelle recherche a lieue "f" ne reprend pas de zero.
				controller.searchCcam.resultsElementsIndexSet(f);
				
				// Le tableau des résultats de recherche a fini d'être créé.
				controller.searchCcam.tableCreated();
				
				linksNext = informations.links.next;
				if (linksNext != null) {
					// Si plus de résultats peuvent être téléchargés.
					controller.searchCcam.resultsMoreExists(true);
					controller.searchCcam.resultsElementsUrlStartSet(urlStart);
					//console.log("urlStart + linksNext : " + urlStart + linksNext);
					controller.searchCcam.resultsElementsUrlPageNextSet(urlStart + linksNext);
				} else {
					controller.searchCcam.resultsMoreExists(false);
				}
			} else {
				controller.searchCcam.inputSearchReady(false);
			}
		}
		
		//console.log("== End of searchResults ==");
	}
	
	// Ouverture d'un acte médical (fiche avec les tarifs).
	medicalActF(controller, medicalActNotes, medicalActCode) {
		//console.log("==* MedicalAct *==");
		controller.searchCcam.pauseOn();
		controller.medicalAct.selectionReset();
		controller.medicalAct.resultsContentLoading(medicalActCode);
		controller.medicalAct.priceLoading();
		controller.medicalAct.actCodeSet(medicalActCode);
		var searchDateConverted = controller.medicalAct.inputSearchDateConvert(controller.searchCcam.inputSearchDateGet());
		console.log("searchDateConverted : " + searchDateConverted);
		if (controller.clientRhapi.CONVENTION_PS_SECTORS_DATE_Get() < searchDateConverted) {
			var actGridCodeDefault = 1;
		} else {
			var actGridCodeDefault = 0;
		}
		console.log("actGridCodeDefault : " + actGridCodeDefault);
		controller.medicalAct.actGridCodeSet(actGridCodeDefault);
		controller.medicalAct.actDomCodeSet(0);
		var medicalActGridCode = null;
		var medicalActDomCode = null;
		controller.medicalActUpdate2(controller, medicalActCode, medicalActGridCode, medicalActDomCode);
		//console.log("==* End of MedicalAct *==");
	}
	
	// [1/4] Mise à jour des données (notes, tarif...) d'un acte médical.
	medicalActUpdate(controller) {
		//console.log("-- medicalActUpdate --");
		var medicalActSelectionResults = controller.medicalAct.selectionGet();
		console.log("medicalActSelectionResults[medicalActGridCode] : " + medicalActSelectionResults["medicalActGridCode"]);
		console.log("medicalActSelectionResults[medicalActDomCode] : " + medicalActSelectionResults["medicalActDomCode"]);
		controller.medicalAct.actGridCodeSet(medicalActSelectionResults["medicalActGridCode"]);
		controller.medicalAct.actDomCodeSet(medicalActSelectionResults["medicalActDomCode"]);
		controller.medicalActUpdate2(controller, controller.medicalAct.actCodeGet(), medicalActSelectionResults["medicalActGridCode"], medicalActSelectionResults["medicalActDomCode"]);
		//console.log("-- End of medicalActUpdate --");
	}
	
	// [2/4] Mise à jour des données (notes, tarif...) d'un acte médical.
	medicalActUpdate2(controller, medicalActCode, medicalActGridCode, medicalActDomCode) {
		//console.log("-- medicalActUpdate2 --");
		controller.medicalAct.priceLoading();
		var inputVal = controller.searchCcam.inputSearchGetKeyword();
		var dataUrl = controller.clientRhapi.serverDataUrlPrepare(inputVal, medicalActCode, medicalActGridCode, medicalActDomCode);
		var urlStart = dataUrl["urlStart"];
		var urlMedicalAct = dataUrl["urlMedicalAct"];
		
		var htmlResultsReset = false;
		// Le cinquième paramètre est la fonction callback
		controller.clientRhapi.serverDataGet(controller, urlStart, urlMedicalAct, htmlResultsReset, controller.medicalActUpdateResults);
		//console.log("-- End of medicalActUpdate2 --");
	}
	
	// [3/4] Mise à jour des données (notes, tarif...) d'un acte médical.
	medicalActUpdateResults(controller, urlStart, urlComplete, datas, htmlResultsReset) {
		//console.log("== medicalActUpdateResults ==");
		controller.medicalAct.resultsContentLoaded();
		controller.medicalAct.resumeOn();
		var medicalActCode = controller.medicalAct.actCodeGet();
		var medicalActGridCode = controller.medicalAct.actGridCodeGet();
		var medicalActDomCode = controller.medicalAct.actDomCodeGet();
		var option, f = 0;
		var objectDate;
		var serverDataContext = controller.clientRhapi.serverDataContextGet();
		serverDataContext.tb23.forEach(function(object){
			objectDate = controller.medicalAct.inputSearchDateConvert(controller.searchCcam.inputSearchDateGet());
			controller.medicalAct.conventionPsCreate(medicalActGridCode, controller.clientRhapi.CONVENTION_PS_SECTORS_DATE_Get(), datas, object, objectDate, f);
			f++;
		});
		controller.medicalAct.domReset();
		controller.medicalAct.domCreate(medicalActDomCode, 0, "MÉTROPOLE", 0);
		f = 1;
		serverDataContext.dom.forEach(function(object){
			controller.medicalAct.domCreate(medicalActDomCode, object.codDom, object.libelle, f);
			f++;
		});
		var inputVal = controller.searchCcam.inputSearchGetKeyword();
		var htmlResultsReset = true;
		var dataUrl = controller.clientRhapi.serverDataUrlPrepare(inputVal, medicalActCode, controller.medicalAct.actGridCodeGet(), controller.medicalAct.actDomCodeGet());
		controller.clientRhapi.serverDataGet(controller, dataUrl["urlStart"], dataUrl["urlPrice"], htmlResultsReset, controller.medicalActUpdatePrice);
		controller.medicalAct.subtitleSet(datas.nomLong);
		controller.medicalAct.actNotesReset();
		f = 0;
		datas.notes.forEach(function(object){
			controller.medicalAct.actNotesSet(object, f);
			f++;
		});
		//console.log("== End of medicalActUpdateResults ==");
	}
	
	// [4/4] Mise à jour des données (notes, tarif...) d'un acte médical.
	medicalActUpdatePrice (controller, urlStart, urlComplete, datas, htmlResultsReset) {
		//console.log("== medicalActUpdatePrice ==");
		controller.medicalAct.priceLoaded();
		controller.medicalAct.priceSet(datas.pu);
		//console.log("== End of medicalActUpdatePrice ==");
	}
}

$(document).ready(function() {
	var controller = new Controller();
	//controller.control(null, null, null, null);
	controller.controlContext();
});