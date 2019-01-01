# CCAM
Recherche dans la Classification Commune des Actes Médicaux

La CCAM est une fonctionnalité du projet RHAPI.

Support et hébergement RHAPI auprès de [Lambdasoft](https://lambdasoft.fr).

## Pour tester
- Télécharger l'archive, l'ouvrir et cliquer sur index.html.
- Aller sur le site démonstration [CCAM en ligne](https://rhapi-project.github.io/CCAM?texte=trijumeau).

## Présentation rapide
**RHAPI** est une API RESTful qui s'inscrit totalement dans l'émergence actuelle d'applications Web *full Front-End*, écrites uniquement en JavaScript.

**RHAPI** fournit l'ensemble de l'architecture *Back-End* ainsi que les logiques *Métiers*, pour des applications à destination des professionels de santé dont il ne restera qu'à développer l'interface utilisateur.

Les requêtes se font depuis *client_rhapi.js* via la méthode *ajax* de *jQuery* (*fetch* pourrait également être utilisé). Le résultat (un objet JSON) est traité par *controller_rhapi.js* via des méthodes en callback.

## Module CCAM RHAPI
Comme la plupart des API RESTful, RHAPI est explorable directement depuis un navigateur ou une application telle que `curl`.

Pour retrouver les mots clefs et les codes des actes associés à un terme médical comme *trijumeau*, on peut ainsi faire une simple requête `GET` sur le serveur de démonstration RHAPI qui retournera la réponse sous forme d'un objet *JSON*.
  - [https://demo.rhapi.net/demo01/CCAM?texte=trijumeau](https://demo.rhapi.net/demo01/CCAM?texte=trijumeau)
  - `curl https://demo.rhapi.net/demo01/CCAM?texte=trijumeau`

Pour obtenir les données complètes d'un acte à partir de son code CCAM.

  - [https://demo.rhapi.net/demo01/CCAM/ADLB001](https://demo.rhapi.net/demo01/CCAM/ADLB001)
  - `curl https://demo.rhapi.net/demo01/CCAM/ADLB001`

Pour obtenir le tarif d'un acte à partir de son code CCAM.

- [https://demo.rhapi.net/demo01/CCAM/ADLB001/tarif](https://demo.rhapi.net/demo01/CCAM/ADLB001/tarif)
- `curl https://demo.rhapi.net/demo01/CCAM/ADLB001/tarif`
    
Pour de plus amples informations se référer à [la documentation complète RHAPI](https://demo.rhapi.net/apidoc01/).

