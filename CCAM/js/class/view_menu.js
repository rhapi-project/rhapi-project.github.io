class ViewMenu {
    constructor () {
        this.version = null;
    }
    
    versionGet() {
        return this.version;
    }
    
    versionSet(valNew) {
        this.version = valNew;
    }
    
    versionUpdate (ver) {
        $("#menu-app-version").text(ver);
    }
}