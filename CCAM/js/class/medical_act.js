class MedicalAct{
	constructor () {
		this.ActCode = null;
		this.ActGridCode = null;
		this.ActDomCode = null;
	}
	
	actCodeGet () {
		return this.ActCode;
	}
	
	actGridCodeGet () {
		return this.ActGridCode;
	}
	
	actDomCodeGet () {
		return this.ActDomCode;
	}
	
	actCodeSet (valNew) {
		this.ActCode = valNew;
	}
	
	actGridCodeSet (valNew) {
		this.ActGridCode = valNew;
	}
	
	actDomCodeSet (valNew) {
		this.ActDomCode = valNew;
	}
	
	resultsContentLoading(medicalActCode) {
		$("#medical-act-area-loading").show();
		$("#medical-act-title").text(medicalActCode);
	}
	
	resultsContentLoaded(medicalActLongName) {
		$("#medical-act-area-loading").hide();
		$("#medical-act-subtitle").text(medicalActLongName);
		$("#medical-act-conventions-ps").html("");
	}
	
	// Création des options du champ de sélection des conventions PS.
	conventionPsCreate (medicalActGridCode, CONVENTION_PS_SECTORS_DATE, datas, object, objectDate, f) {
		var option = document.createElement("option");
		option.setAttribute("id", "option-conventions-ps-" + f);
		option.setAttribute("value", object.codGrille);
		if (CONVENTION_PS_SECTORS_DATE > objectDate && f == 0 || CONVENTION_PS_SECTORS_DATE <= objectDate && f >= 1) {
			$("#medical-act-conventions-ps").append(option);
			$("#option-conventions-ps-" + f).append(document.createTextNode(object.libelle));
		}
		if (medicalActGridCode == object.codGrille) {
			$("#medical-act-conventions-ps").val(object.codGrille);
		}
	}
	
	domReset () {
		$("#medical-act-dom").html("");
	}
	
	// Création des options du champ de sélection des DOM-TOM.
	domCreate (medicalActDomCode, codeDom, libelle, f) {
		var option = document.createElement("option");
		option.setAttribute("id", "option-dom-" + f);
		option.setAttribute("value", codeDom);
		$("#medical-act-dom").append(option);
		$("#option-dom-" + f).append(document.createTextNode(libelle));
		if (medicalActDomCode == codeDom) {
			$("#medical-act-dom").val(codeDom);
		}
	}
	
	priceLoading() {
		$("#medical-act-conventions-ps").prop("disabled", true);
		$("#medical-act-conventions-ps").attr("class", "select-input select-input-loading");
		$("#medical-act-dom").prop("disabled", true);
		$("#medical-act-dom").attr("class", "select-input select-input-loading");
		$("#medical-act-price").hide();
		$("#medical-act-price-loading").show();
	}
	
	priceLoaded () {
		$("#medical-act-conventions-ps").prop("disabled", false);
		$("#medical-act-conventions-ps").attr("class", "select-input");
		$("#medical-act-dom").prop("disabled", false);
		$("#medical-act-dom").attr("class", "select-input");
		$("#medical-act-price-loading").hide();
		$("#medical-act-price").show();
	}
	
	// Définition du sous-titre de la fiche de l'acte.
	subtitleSet (subtitle) {
		$("#medical-act-subtitle").text(subtitle);
	}
	
	actNotesReset () {
		$("#medical-act-notes").html("");
	}
	
	// Définition des notes de la fiche de l'acte.
	actNotesSet (notes, f) {
		var note = document.createElement("p");
		note.setAttribute("class", "medical-act-notes");
		note.setAttribute("id", "medical-act-notes-" + f);
		$("#medical-act-notes").append(note);
		$("#medical-act-notes-" + f).text(notes.texteNote);
	}
	
	// Définition du prix de la fiche de l'acte.
	priceSet (price) {
		$("#medical-act-price").text(price + " €");
	}
	
	// Retourne les options des champs de sélection qui sont sélectionnées.
	selectionGet () {
		var results = [];
		results["medicalActGridCode"] = $("#medical-act-conventions-ps").val();
		results["medicalActDomCode"] = $("#medical-act-dom").val();
		return results;
	}
	
	// Remise à zero des champs de sélections (redéfinition sur l'option 1).
	selectionReset () {
		$("#medical-act-conventions-ps").val($("#option-conventions-ps-0").val());
		$("#medical-act-dom").val($("#option-dom-0").val());
	}
	
	// Conversion de la date du champ de recherche de la page de recherche vers un "format informatique" qui permet ensuite dans le controller de faire des comparaisons avec d'autres dates de même format.
	inputSearchDateConvert (dateToFormat) {
		var dateFormatDay = dateToFormat.substr(0, 2)
		var dateFormatMonth = dateToFormat.substr(3, 2)
		var dateFormatYear = dateToFormat.substr(6, 4)
		var dateFormat = dateFormatYear + "-" + dateFormatMonth + "-" + dateFormatDay;
		return dateFormat;
	}
	
	// La balise HTML qui contient la page d'un acte médical passe en arrière plan suite à une action de l'utilisateur, il est par exemple retourné à la page qui liste les résultats de recherche.
	pauseOn () {
		$("#medical-act-area").hide();
		$("#medical-act-area-loading").hide();
	}
	
	// La balise HTML qui contient la page d'un acte médical passe en premier plan suite à une action de l'utilisateur, il a par exemple cliqué sur un acte médical dans les résultats de recherche des actes médicaux.
	resumeOn () {
		$("#medical-act-area").show();
	}
}