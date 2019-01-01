class ViewSearchCCAM {
    constructor () {
        this.inputSearchAutocompleteReply = null;
        this.searchCurrent = "";
        this.searchNext = "";
        this.searchLast = "";
        this.resultsElementsUrlStart = null;
        this.resultsElementsUrlPageNext = null;
        this.resultsElementsIndex = 0;
        this.resultsButtonMoreActive = false;
    }
    
    inputSearchAutocompleteReplyGet () {
        return this.inputSearchAutocompleteReply;
    }
    
    searchCurrentGet () {
        return this.searchCurrent;
    }
    
    searchNextGet () {
        return this.searchNext;
    }
    
    searchLastGet () {
        return this.searchLast;
    }
    
    resultsElementsUrlStartGet () {
        return this.resultsElementsUrlStart;
    }
    
    resultsElementsUrlPageNextGet () {
        return this.resultsElementsUrlPageNext;
    }
    
    resultsElementsIndexGet () {
        return this.resultsElementsIndex;
    }
    
    resultsButtonMoreActiveGet () {
        return this.resultsButtonMoreActive;
    }
    
    inputSearchAutocompleteReplySet (valNew) {
        this.inputSearchAutocompleteReply = valNew;
    }
    
    searchCurrentSet (valNew) {
        this.searchCurrent = valNew;
    }
    
    searchNextSet (valNew) {
        this.searchNext = valNew;
    }
    
    searchLastSet (valNew) {
        this.searchLast = valNew;
    }
    
    resultsElementsUrlStartSet (valNew) {
        this.resultsElementsUrlStart = valNew;
    }
    
    resultsElementsUrlPageNextSet (valNew) {
        this.resultsElementsUrlPageNext = valNew;
    }
    
    resultsElementsIndexSet (valNew) {
        this.resultsElementsIndex = valNew;
    }
    
    resultsButtonMoreActiveSet (valNew) {
        this.resultsButtonMoreActive = valNew;
    }
    
    inputSearchKeywordGet() {
        return encodeURIComponent($("#input-search").val());
    }
    
    inputSearchKeywordLengthGet() {
        var inputVal = encodeURIComponent($("#input-search").val());
        return inputVal.length;
    }
    
    inputSearchKeywordSet(valNew) {
        $("#input-search").val(valNew);
    }
    
    inputSearchKeywordReset() {
        $("#input-search").val("");
    }
    
    searchKeywordsReset () {
        this.searchCurrent = "";
        this.searchNext = "";
    }
    
    inputSearchDateGet () {
        return $("#input-search-date").val();
    }
    
    autocompleteBoxHide () {
        $(".ui-autocomplete").html("");
        $(".ui-autocomplete").attr("style", "");
    }
    
    // Si les conditions pour que le champ de recherche puisse faire ou non des requêtes ajax d'autocomplétion et de résultats de recherche sont réunies ou ne sont pas réunies, l'affichage de la page change. Ces conditions peuvent par exemple être suffisamment de caractères entrés dans le champ de recherche.
    inputSearchReady (state) {
        if (!state) {
            $(".ui-autocomplete").hide();
            $("#results-loading-area").hide();
            $("#results-area").hide();
            $("#result-button-more").hide();
        } else {
            $(".ui-autocomplete").show();
        }
    }
    
    inputDeleteReady (state) {
        if (!state) {
            $("#input-search-remove").hide();
        } else {
            $("#input-search-remove").show();
        }
    }
    
    // La balise HTML qui sert à afficher les résultats de recherche des actes médicaux passe en arrière plan suite à une action de l'utilisateur, il a par exemple cliqué sur un acte médical et donc quitté allé vers une nouvelle page.
    pauseOn () {
        $("#search-ccam-area").hide();
    }
    
    // La balise HTML qui sert à afficher les résultats de recherche des actes médicaux passe en premier plan suite à une action de l'utilisateur, il est par exemple revenu sur cette page depuis une autre page.
    resumeOn (resultAnchor) {
        $("#search-ccam-area").show();
        if (resultAnchor != null) {
            location.href = resultAnchor;
        }
    }
    
    resultsContentLoading() {
        $("#result-button-more").hide();
        $("#results-area-loading").show();
        $("#results-loading-area").show();
    }
    
    resultsContentLoaded (htmlResultsReset) {
        if (htmlResultsReset == true) {
            $("#results-area-2").html("");
        }
        $("#results-loading-area").hide();
        $("#results-area-loading").hide();
    }
    
    // Si plus de résultats que ceux actuellement affichés peuvent être chargés.
    resultsMoreExists (exist) {
        if (exist) {
            // Affichage du bouton qui permet de télécharger plus de résultats.
            $("#result-button-more-img").hide();
            $("#result-button-more").show();
        } else {
            // Masquage du bouton qui permet de télécharger plus de résultats.
            $("#result-button-more").hide();
        }
    }
    
    resultsMoreLoading () {
        $("#result-button-more-img").show();
        $("#results-area-loading").show();
    }
    
    resultsMoreLoaded () {
        $("#result-button-more-img").hide();
        $("#results-area-loading").hide();
    }
    
    dateSearchSet (newDate) {
        $("#input-search-date").val(newDate);
    }
    
    // Création des titres de la liste des résultats de recherche
    tableCreateTitles(informations) {
        if ($("#results-area-2").html() == "") {
            var elementTrTitles, elementTh, elementTh2;
            var totalSizeText = (informations.totalSize > 1)?"résultats":"résultat";
            
            elementTrTitles = document.createElement("tr");
            elementTrTitles.setAttribute("id", "tr-result-titles");
            elementTh = document.createElement("th");
            elementTh.setAttribute("id", "th-result");
            elementTh2 = document.createElement("th");
            elementTh2.setAttribute("id", "th-result-2");
            
            $("#results-area-title").html("");
            if ($("#tr-result-titles").html()) {
                $("#tr-result-titles").remove();
                $("#th-result").remove();
                $("#th-result-2").remove();
            }
            $("#results-area-title").text(informations.totalSize + " " + totalSizeText);
            $("#results-area-2").append(elementTrTitles);
            $("#tr-result-titles").append(elementTh);
            $("#tr-result-titles").append(elementTh2);
            $("#th-result").append(document.createTextNode("Code"));
            $("#th-result-2").append(document.createTextNode("Description"));
        }
    }
    
    // Création de la liste des résultats de recherche
    tableCreate(controller, medicalActs, medicalActCode, f) {
        var elementTr, elementTd, elementTd2, elementTdSpan, elementTdSpan2;
        
        elementTr = document.createElement("tr");
        elementTr.setAttribute("id", "tr-result-" + f);
        elementTr.setAttribute("class", "tr-results");
        
        elementTd = document.createElement("td");
        elementTd.setAttribute("id", "td-result-" + f);
        elementTd.setAttribute("class", "td-result");
        elementTd.setAttribute("style", "padding: 0;");
        elementTdSpan = document.createElement("span");
        elementTdSpan.setAttribute("id", "td-span-result-" + f);
        elementTdSpan.setAttribute("class", "td-span-result");
        
        elementTd2 = document.createElement("td");
        elementTd2.setAttribute("id", "td-result-2-" + f);
        elementTd2.setAttribute("class", "td-result");
        elementTd2.setAttribute("style", "padding: 0;");
        elementTdSpan2 = document.createElement("span");
        elementTdSpan2.setAttribute("id", "td-span-result-2-" + f);
        elementTdSpan2.setAttribute("class", "td-span-result");
        
        $("#results-area-2").append(elementTr);
        $("#tr-result-" + f).append(elementTd);
        $("#tr-result-" + f).append(elementTd2);
        $("#td-result-" + f).append(elementTdSpan);
        $("#td-result-2-" + f).append(elementTdSpan2);
        $("#td-span-result-" + f).append(document.createTextNode(medicalActs[medicalActCode].codeGet()));
        
        $("#td-span-result-" + f).click(function() {
            controller.viewMedicalActF(controller, medicalActs[medicalActCode].codeGet(), "#td-result-" + f);
        });
        
        $("#td-span-result-2-" + f).click(function() {
            controller.viewMedicalActF(controller, medicalActs[medicalActCode].codeGet(), "#td-result-" + f);
        });
        
        $("#td-span-result-2-" + f).append(document.createTextNode(medicalActs[medicalActCode].nameLongGet()));
    }
    
    tableCreated () {
        $("#results-area").show();
    }
}