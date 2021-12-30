function googleapi(word){

    var search = word;
    var count = 0;
    const sources = ['www.youtube.com', 'www.khanacademy.org'];
    const link = ['#youtube', '#khanacademy'];

    while (count < 2) {
        var fullSrc = "https://www.googleapis.com/customsearch/v1?siteSearch=" +sources[count]+ "&siteSearchFilter=i&key=AIzaSyDb54oEYNtY2zKGeyC7cqJGBP7t1VBCrk4&cx=6adbb15b85973bdf7&q=" +search+ "&callback=hndlr&num=2"
        $(link[count]).attr("src", fullSrc);
        count += 1;
    }
}


function hndlr(response) {
    //console.log("hndlr start");
    //console.log(id)
    for (var i = 0; i < response.items.length; i++) {
        var item = response.items[i];
            document.getElementById("content").innerHTML += "<b>" + item.title + "</b>" + "<br>";
            document.getElementById("content").innerHTML += item.snippet + "<br>";
            document.getElementById("content").innerHTML += "<a href=" + item.link + "> " + item.link + " </a>" + "<br><br>";  
            //console.log("hndlr")
            //console.log(id)
            hndlr2(item.title, item.snippet, item.link);   
    }
}

async function hndlr2(title, snippet, link, id) {
    const things = title + snippet + link;
    let res = await sendData(["3", things]);
    console.log(res);
}
