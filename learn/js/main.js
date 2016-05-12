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
if(getUrlParameter('name') != undefined)
$('#paathname').text(getUrlParameter('name'));

var currentlyPlaying = false;
var counter = 0;
function start(){
    if(currentlyPlaying == false){
        audioElement.play();
        currentlyPlaying = true;
        $('#startbutton').text('Stop');
        //set first 3 values to be zero
        if(counter == 0){
            $('#div0').text('0');
            $('#divsecond0').text('0');

            // $('#div1').text('1');
            // $('#div2').text('2');
            lines[0][2] = 0;
            // lines[1][2] = 1;
            // lines[2][2] = 2;
            counter = 0;
        }
    }else{
        audioElement.pause();
        currentlyPlaying = false;
        $('#startbutton').text('Start');
    }
}

function getTime() {
    // console.log(Math.floor(audioElement.currentTime));
    counter++;
    var currentTimeValue = Math.floor(audioElement.currentTime);
    lines[counter][2] = currentTimeValue;
    $('#div' + counter).text(currentTimeValue);
    $('#divsecond' + counter).text(currentTimeValue);
    $('html, body').animate({
                scrollTop: $('#div' + counter).offset().top - 200
            }, 1000);
}

if(getUrlParameter('id') != undefined)
getData(getUrlParameter('id'));

var textFile = null,
makeTextFile = function (text) {
    var data = new Blob([text], {type: 'text/plain'});

    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);

    return textFile;
};

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

    audioElement.addEventListener("ended", function(){
        audioElement.currentTime = 0;
        console.log("ended");


        var link = document.getElementById('downloadlink');
        link.href = makeTextFile(JSON.stringify(lines));
        link.style.display = 'block';


    });

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
            "<td>"+
                "<div id=\"divsecond" + i +"\">"+
                "</div"+
            "</td>"+
            "<td class=\"customfont\">"+
            lines[i][1]+
            "</td>"+
            "</tr>";
        $("#tableid").append(textToAdd);
        // console.log(textToAdd)
    }



}

function setuplearning(){
    var filename = getUrlParameter('id')+'.json';
    $('#downloadlink').attr('download',filename)
}

