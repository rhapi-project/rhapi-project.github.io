class MedicalAct {
    constructor () {
        this.dateModif = null;
        this.code = null;
        this.nameShort = null;
        this.nameLong = null;
        this.notes = null;
        this.codeActiviteDefault = null;
        this.codesActivite = new Array();
        this.codePhaseDefault = null;
        this.codesPhase = new Array();
        this.price = null;
    }
    
    dateModifGet () {
        return this.dateModif;
    }
    
    codeGet () {
        return this.code;
    }
    
    nameShortGet () {
        return this.nameShort;
    }
    
    nameLongGet () {
        return this.nameLong;
    }
    
    notesGet () {
        return this.notes;
    }
    
    codeActiviteDefaultGet () {
        return this.codeActiviteDefault;
    }
    
    codesActiviteGet () {
        return this.codesActivite;
    }
    
    codePhaseDefaultGet () {
        return this.codePhaseDefault;
    }
    
    codesPhaseGet () {
        return this.codesPhase;
    }
    
    priceGet () {
        return this.price;
    }
    
    dateModifSet (valNew) {
        this.dateModif = valNew;
    }
    
    codeSet (valNew) {
        this.code = valNew;
    }
    
    nameShortSet (valNew) {
        this.nameShort = valNew;
    }
    
    nameLongSet (valNew) {
        this.nameLong = valNew;
    }
    
    notesSet (valNew) {
        this.notes = valNew;
    }
    
    codeActiviteDefaultSet (valNew) {
        this.codeActiviteDefault = valNew;
    }
    
    codesActiviteSet (valNew) {
        this.codesActivite = valNew;
    }
    
    codePhaseDefaultSet (valNew) {
        this.codePhaseDefault = valNew;
    }
    
    codesPhaseSet (valNew) {
        this.codesPhase = valNew;
    }
    
    priceSet (valNew) {
        this.price = valNew;
    }
    
    // -----
    
    codesActiviteAdd (code) {
        this.codesActivite.push(code);
    }
    
    codesPhaseAdd (code) {
        this.codesPhase.push(code);
    }
}