window.addEventListener("load", function () {
    let search = document.getElementById("search");
    let searchButton = document.getElementById("searchButton");
    let searchResult = document.getElementById("searchResults");
    
    searchButton.addEventListener("click", function(){
        console.log("EventListener");
        let res = MediaWiki.searchImages(search.textContent);
        for (elem in res) {
            let img = elem.query.pages.title;
            searchResult.innerHTML += "'<img src = " + img + "/>'";
        }
    })
});