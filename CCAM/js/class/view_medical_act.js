class ViewMedicalAct{
    constructor () {
        this.backResultAnchor = null;
        this.code = null;
        this.gridCode = null;
        this.activiteCode = null;
        this.phaseCode = null;
        this.domCode = null;
        this.ACTIVITE_LABEL_DEFAULT = "Activité par défaut";
        this.PHASE_LABEL_DEFAULT = "Phase";
        this.DOM_LABEL_DEFAULT = "MÉTROPOLE";
        this.modificatorsCodes = new Array();
        this.modificatorsCodesIndex = 0;
    }
    
    backResultAnchorGet () {
        return this.backResultAnchor;
    }
    
    codeGet () {
        return this.code;
    }
    
    gridCodeGet () {
        return this.gridCode;
    }
    
    activiteCodeGet () {
        return this.activiteCode;
    }
    
    phaseCodeGet () {
        return this.phaseCode;
    }
    
    domCodeGet () {
        return this.domCode;
    }
    
    ACTIVITE_LABEL_DEFAULT_Get () {
        return this.ACTIVITE_LABEL_DEFAULT;
    }
    
    PHASE_LABEL_DEFAULT_Get () {
        return this.PHASE_LABEL_DEFAULT;
    }
    
    DOM_LABEL_DEFAULT_Get () {
        return this.DOM_LABEL_DEFAULT;
    }
    
    modificatorsCodesGet () {
        return this.modificatorsCodes;
    }
    
    modificatorsCodesIndexGet () {
        return this.modificatorsCodesIndex;
    }
    
    backResultAnchorSet (valNew) {
        this.backResultAnchor = valNew;
    }
    
    codeSet (valNew) {
        this.code = valNew;
    }
    
    gridCodeSet (valNew) {
        this.gridCode = valNew;
    }
    
    activiteCodeSet (valNew) {
        this.activiteCode = valNew;
    }
    
    phaseCodeSet (valNew) {
        this.phaseCode = valNew;
    }
    
    domCodeSet (valNew) {
        this.domCode = valNew;
    }
    
    modificatorsCodesSet (valNew) {
        this.modificatorsCodes = valNew;
    }
    
    modificatorsCodesIndexSet (valNew) {
        this.modificatorsCodesIndex = valNew;
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
    conventionPsCreate (medicalActGridCode, CONVENTION_PS_SECTORS_DATE, object, objectDate, f) {
        var option = document.createElement("option");
        option.setAttribute("id", "option-conventions-ps-" + f);
        option.setAttribute("value", object.codGrille);
        if (CONVENTION_PS_SECTORS_DATE > objectDate && f == 0 || CONVENTION_PS_SECTORS_DATE <= objectDate && f >= 1) {
            $("#medical-act-conventions-ps").append(option);
            $("#option-conventions-ps-" + f).append(document.createTextNode(object.libelle));
        }
        if (medicalActGridCode == object.codGrille) {
            $("#medical-act-conventions-ps").val(object.codGrille);
            $("#medical-act-conventions-ps-notes").text(object.definition);
        }
    }
    
    activiteReset () {
        $("#medical-act-activite").html("");
    }
    
    // Création des options du champ de sélection de l'activité.
    activiteCreate (medicalActiviteCode, codeActivite, libelle, f) {
        var option = document.createElement("option");
        option.setAttribute("id", "option-activite-" + f);
        option.setAttribute("value", codeActivite);
        $("#medical-act-activite").append(option);
        $("#option-activite-" + f).append(document.createTextNode(libelle));
        if (medicalActiviteCode == codeActivite) {
            $("#medical-act-activite").val(codeActivite);
        }
    }
    
    phaseReset () {
        $("#medical-act-phase").html("");
    }
    
    // Création des options du champ de sélection de la phase.
    phaseCreate (medicalPhaseCode, codePhase, libelle, f) {
        var option = document.createElement("option");
        option.setAttribute("id", "option-phase-" + f);
        option.setAttribute("value", codePhase);
        $("#medical-act-phase").append(option);
        $("#option-phase-" + f).append(document.createTextNode(libelle));
        if (medicalPhaseCode == codePhase) {
            $("#medical-act-phase").val(codePhase);
        }
    }
    
    domReset () {
        $("#medical-act-dom").html("");
    }
    
    // Création des options du champ de sélection des DOM-TOM.
    domCreate (medicaldomCode, codeDom, libelle, f) {
        var option = document.createElement("option");
        option.setAttribute("id", "option-dom-" + f);
        option.setAttribute("value", codeDom);
        $("#medical-act-dom").append(option);
        $("#option-dom-" + f).append(document.createTextNode(libelle));
        if (medicaldomCode == codeDom) {
            $("#medical-act-dom").val(codeDom);
        }
    }
    
    modificatorShow (show) {
        if (show) {
            $("#medical-act-modificators-select-area").fadeOut(250, function () {
                $("#medical-act-modificators").slideDown("slow");
            });
        } else {
            $("#medical-act-modificators").hide();
            $("#medical-act-modificators-select-area").show();
        }
    }
    
    modificatorReset () {
        $("#medical-act-modificators-2").html("");
    }
    
    modificatorOptionSelect (tag, modificatorIndex) {
        $("#medical-act-modificator-reset-checkbox").attr("src", "img/checkbox.png");
        $("#medical-act-modificator-reset").attr("class", "medical-act-modificator-reset");
        var select = false;
        if ($(tag).attr("class") == "medical-act-modificator") {
            var tagCheckbox = $(tag);
        } else {
            var tagCheckbox = $(tag).prev();
        }
        
        if ($(tag).children("img").attr("src") == "img/checkbox.png") {
            $(tag).children("img").attr("src", "img/checkbox_checked.png");
            $(tag).attr("class", "medical-act-modificator medical-act-modificator-selected");
            $("#option-modificator-value-checked-" + modificatorIndex).attr("value", true);
        } else {
            $(tag).children("img").attr("src", "img/checkbox.png");
            $(tag).attr("class", "medical-act-modificator medical-act-modificator");
            $("#option-modificator-value-checked-" + modificatorIndex).attr("value", false);
        }
    }
    
    modificatorOptionsReset () {
        var checked = false;
        if ($("#medical-act-modificator-reset").attr("class") == "medical-act-modificator-reset") {
            checked = true;
            $("#medical-act-modificator-reset-checkbox").attr("src", "img/checkbox_checked.png");
            $("#medical-act-modificator-reset").attr("class", "medical-act-modificator-reset medical-act-modificator-reset-selected");
        }
        this.modificatorsCodes = new Array();
        $(".medical-act-modificator-selected").attr("class", "medical-act-modificator");
        $(".medical-act-modificator img").attr("src", "img/checkbox.png");
        $(".option-modificator-value-checked").val(null);
        return checked;
    }
    
    // Création des options du champ de sélection des modificateurs.
    modificatorCreate (controller, medicalActModificatorsCodes, modificator, medicalActGridCode, dateSelected, f) {
        if (modificator.grilleCod == medicalActGridCode) {
            if (modificator.dtFin != null && dateSelected > modificator.dtDebut && dateSelected < modificator.dtFin
            || modificator.dtFin == null && dateSelected > modificator.dtDebut) {
                var tagModificator = document.createElement("p");
                tagModificator.setAttribute("id", "modificator-" + f);
                tagModificator.setAttribute("class", "medical-act-modificator");
                var option = document.createElement("img");
                option.setAttribute("id", "option-modificator-" + f);
                option.setAttribute("src", "img/checkbox.png");
                var optionLabel = document.createElement("span");
                optionLabel.setAttribute("id", "option-modificator-label-" + f);
                var optionVal = document.createElement("input");
                optionVal.setAttribute("id", "option-modificator-value-" + f);
                optionVal.setAttribute("class", "option-modificator-value");
                optionVal.setAttribute("type", "hidden");
                optionVal.setAttribute("value", modificator.codModifi);
                var optionValChecked = document.createElement("input");
                optionValChecked.setAttribute("id", "option-modificator-value-checked-" + f);
                optionValChecked.setAttribute("class", "option-modificator-value-checked");
                optionValChecked.setAttribute("type", "hidden");
                optionValChecked.setAttribute("value", false);
                
                var code;
                Object.keys(medicalActModificatorsCodes).map(function(objVal, objKey) {
                    code = medicalActModificatorsCodes[objVal];
                    if (code == modificator.codModifi) {
                        tagModificator.setAttribute("class", "medical-act-modificator medical-act-modificator-selected");
                        option.setAttribute("src", "img/checkbox_checked.png");
                        optionVal.setAttribute("value", code);
                        optionValChecked.setAttribute("value", true);
                    }
                });
                
                $("#medical-act-modificators-2").append(tagModificator);
                $("#modificator-" + f).append(option);
                $("#modificator-" + f).append(optionLabel);
                $("#modificator-" + f).append(optionVal);
                $("#modificator-" + f).append(optionValChecked);
                $("#option-modificator-label-" + f).append(document.createTextNode(" " + modificator.libelle));
                
                $("#modificator-" + f).click(function() {
                    controller.viewMedicalAct.modificatorOptionSelect(this, f);
                    controller.viewMedicalActUpdate(controller);
                });
            }
        }
    }
    
    priceLoading () {
        $("#medical-act-conventions-ps").prop("disabled", true);
        $("#medical-act-conventions-ps").attr("class", "select-input select-input-loading");
        $("#medical-act-activite").prop("disabled", true);
        $("#medical-act-activite").attr("class", "select-input select-input-loading");
        $("#medical-act-phase").prop("disabled", true);
        $("#medical-act-phase").attr("class", "select-input select-input-loading");
        $("#medical-act-dom").prop("disabled", true);
        $("#medical-act-dom").attr("class", "select-input select-input-loading");
        $("#medical-act-modificators-select").prop("disabled", true);
        $("#medical-act-modificators-select").attr("class", "select-input select-input-loading");
        $("#medical-act-modificators-loading").show();
        $("#medical-act-modificators-2-top").attr("class", "select-input select-input-loading");
        $("#medical-act-modificators-2").attr("class", "select-input select-input-loading");
        $("#medical-act-modificator-submit").prop("disabled", true);
        $("#medical-act-modificator-submit").attr("class", "btn-block btn-sm btn-default medical-act-modificator-buttons-loading");
        $("#medical-act-price").hide();
        $("#medical-act-price-loading").show();
    }
    
    priceLoaded () {
        $("#medical-act-conventions-ps").prop("disabled", false);
        $("#medical-act-conventions-ps").attr("class", "select-input");
        $("#medical-act-activite").prop("disabled", false);
        $("#medical-act-activite").attr("class", "select-input");
        $("#medical-act-phase").prop("disabled", false);
        $("#medical-act-phase").attr("class", "select-input");
        $("#medical-act-dom").prop("disabled", false);
        $("#medical-act-dom").attr("class", "select-input");
        $("#medical-act-modificators-select").prop("disabled", false);
        $("#medical-act-modificators-select").attr("class", "select-input");
        $("#medical-act-modificators-loading").hide();
        $("#medical-act-modificators-2-top").attr("class", "select-input");
        $("#medical-act-modificators-2").attr("class", "select-input");
        $("#medical-act-modificator-submit").prop("disabled", false);
        $("#medical-act-modificator-submit").attr("class", "btn-block btn-sm btn-default");
        $("#medical-act-price-loading").hide();
        $("#medical-act-price").show();
    }
    
    // Définition du sous-titre de la fiche de l'acte.
    subtitleSet (subtitle) {
        $("#medical-act-subtitle").text(subtitle);
    }
    
    notesReset () {
        $("#medical-act-notes").html("");
        $("#medical-act-conventions-ps-notes").text("");
    }
    
    // Définition des notes de la fiche de l'acte.
    notesSet (medicalActs, medicalActCode, f) {
        var note = document.createElement("p");
        note.setAttribute("class", "medical-act-notes");
        note.setAttribute("id", "medical-act-notes-" + f);
        $("#medical-act-notes").append(note);
        $("#medical-act-notes-" + f).html(medicalActs[medicalActCode].notesGet().replace(/\n/g,"<br>"));
    }
    
    // Définition du prix de la fiche de l'acte.
    priceSet (price) {
        price += "";
        var priceSplit = price.split(".");
        if (typeof priceSplit[1] != "undefined") {
            if (priceSplit[1].length < 2) {
                priceSplit[1] += "0";
            } else if (priceSplit[1].length > 2) {
                priceSplit[1] = priceSplit[1].substr(0, 2);
            }
        } else {
            priceSplit[1] = "00";
        }
        price = priceSplit[0] + "," + priceSplit[1];
        $("#medical-act-price").text(price + " €");
    }
    
    // Retourne les options des champs de sélection qui sont sélectionnées.
    selectionGet () {
        var results = [];
        var viewMedicalAct = this;
        results["medicalActGridCode"] = $("#medical-act-conventions-ps").val();
        results["medicalActActiviteCode"] = $("#medical-act-activite").val();
        results["medicalActPhaseCode"] = $("#medical-act-phase").val();
        results["medicalActDomCode"] = $("#medical-act-dom").val();
        var modificatorsCodes = "";
        var f = 0, f2;
        $(".option-modificator-value").get().forEach(function (modificatorValue) {
            f2 = 0;
            $(".option-modificator-value-checked").get().forEach(function (modificatorValueChecked) {
                if (f == f2 && $(modificatorValueChecked).val() == "true") {
                    modificatorsCodes += $(modificatorValue).val();
                }
                f2++;
            });
            f++;
        });
        results["medicalActModificatorsCodes"] = modificatorsCodes;
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