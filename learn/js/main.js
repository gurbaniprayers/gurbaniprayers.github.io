var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};
$('#paathname').text(getUrlParameter('name'));

var currentlyPlaying = false;
var counter = 0;
function start(){
    if(currentlyPlaying == false){
        audioElement.play();
        currentlyPlaying = true;
        $('#startbutton').text('STOP');
        //set first 3 values to be zero
        $('#div0').text('0');
        $('#div1').text('0');
        $('#div2').text('0');
        counter = 2;
    }
}

function getTime() {
    // console.log(Math.floor(audioElement.currentTime));
    counter++
    $('#div' + counter).text(Math.floor(audioElement.currentTime));
    $('html, body').animate({
                scrollTop: $('#div' + counter).offset().top - 200
            }, 1000);
}

getData(getUrlParameter('id'));
var audioElement;
function getData(filename) {
    $.ajax({
        type: "GET",
        url: "data/" + filename + ".csv",
        dataType: "text",
        success: function(data) {processData(data);}
     });

    audioElement = document.createElement('audio');
    audioElement.setAttribute('src', 'audio/' + filename +'.mp3');
};

var lines = [];

function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {

            var tarr = [];
            for (var j=0; j<headers.length; j++) {
                tarr.push(data[j]);
                // tarr.push(headers[j]+":"+data[j]);
            }
            lines.push(tarr);

        }
    }
    // console.log(lines);

    //append to table

    for (var i=0; i<lines.length; i++) {
        var textToAdd = "<tr id=\"tr" + i +"\">"+
            "<td>"+
                "<div id=\"div" + i +"\">"+
                "</div"+
            "</td>"+
            "<td >"+
            lines[i][0]+
            "</td>"+
            "<td class=\"customfont\">"+
            lines[i][1]+
            "</td>"+
            "</tr>";
        $("#tableid").append(textToAdd);
        // console.log(textToAdd)
    }



}


