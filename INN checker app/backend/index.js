const search = document.querySelector('.search-box button');
const result = document.querySelector('.result');

search.addEventListener('click', () => {

    var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party";
    var token = "65be850a2ed72c9dd673abdd3f773fe12629414f";
    var query = document.querySelector('.search-box input').value;

    var options = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + token
        },
        body: JSON.stringify({ query: query })
    }
    const data = [];
    fetch(url, options)
        .then(response => response.json())
        // .then(result => console.log(result))
        .then(json => {
            result.innerHTML += "ИМЯ: " + json.suggestions[0].value;
            // for (let i = 0; i < json.suggestions.length; i++) {
            //     data.push(Object.values(json.suggestions[i]))
            //     // for (keys in json.suggestions[i]) {
            //     //     if (typeof json.suggestions[i][keys] != "object") {
            //     //         result.innerHTML += keys + ": " + json.suggestions[i][keys] + "</br>";
            //     //     } else {
            //     //         for (key in json.suggestions[i][keys]) {
            //     //             if (typeof json.suggestions[i][keys][key] != "object") {
            //     //                 result.innerHTML += keys + "/ " + key + ": " + json.suggestions[i][keys][key] + "</br>";
            //     //             } else {
            //     //                 for (k in json.suggestions[i][keys][key]) {
            //     //                     if (typeof json.suggestions[i][keys][key][k] != "object") {
            //     //                         result.innerHTML += keys + "/ " + key + "/ " +k + ": " + json.suggestions[i][keys][key][k] + "</br>";
            //     //                     }
            //     //                 }
            //     //             }
            //     //         }
            //     //     }
            //     // }
            // }
        })
        .catch(error => console.log("error", error));
});