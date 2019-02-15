/* Un objet singleton utilisé comme namespace ou 'package' */
var MediaWiki = {};

/* fonction qui renvoie une promesse, qui envoie requete http à url avec la méthode method
    si la requete échoue on renvoie le statut de l'erreur et le texte renvoyé
    si la requete réussie on renvoie son résultat et 
*/
MediaWiki.ajax = function (method, url) {

    return new Promise ((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange",  function () {

            if (this.readyState == 4) {
                if (this.status == 200)
                    resolve(this.responseText);
                else
                    reject(this.status + " : " + this.responseText);
            }
        });

        xhr.open(method, url);

        xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8"); // type de retour
        xhr.setRequestHeader( 'Api-User-Agent', 'M1Info/1.0' ); //spécifique à Wikimedia

         xhr.send();
    })
};

/* fonction qui envoie une requête AJAX à l'API Wikimedia. Le resultat est récupéré au format JSON
   et passé en argument à la fonction 'success' en cas de succès ou 'fail' en cas d'erreur.
*/

MediaWiki.query = async function (params) {
    let paramString = "";

    for (let p in params) {
        /* on itère sur toutes les clés de 'params' (qui ne sont pas dans son prototype)
           pour construire la requête
        */
        if (params.hasOwnProperty (p)) {


            paramString += "&" + p + "=" + encodeURIComponent(params[p]);
        };

    };
    let url = "https://www.mediawiki.org/w/api.php?origin=*&format=json&formatversion=2"
        + paramString;


    /*** A COMPLÉTER ****/
    /* RENVOYER UNE PROMESSE QUI SE RÉSOUT SUR L'OBJET JSON CORRESPONDANT À L'URL CI-DESSUS,
       DÉCODÉ */

    /*return new Promise( (resolve, reject) => {
        try {
            let result = this.ajax("POST", url);
            resolve(result);
        }
        catch (e){
            reject(e);
        }
    });*/
    let result = await this.ajax("POST", url);
    return JSON.parse(result);
};

//Renvoie les tableaux d'objet JSON, avec un champ contenant l'url
// récupérer l'url dans cette fonction ou **
MediaWiki.getImageURL = function (title) {
    let params = {titles : title, action : "query", prop : "imageinfo", iiprop : "url" };
    return this.query(params);
};

/* Effectue une requête pour récupérer toutes les pages d'image ayant
 * un rapport avec la chaîne donnée.
*/

MediaWiki.searchImages = async function (str) {
    let params = {srsearch : str, action : "query", srnamespace : "6", list : "search",
                    utf8 : "1", srlimit : "20" };
    let result = await this.query(params);
    //return result;
    //let obj_js = JSON.parse(result);
    let tab_res = Promise.all(result.query.search.map((element) =>  this.getImageURL(element.title) ) )
    // ** bidouiller le tableau ici pour récupérer les url
    return tab_res;
};
