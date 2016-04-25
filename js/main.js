function setLanguage(){
    console.log('set language');
    if(localStorage.language == undefined){
       localStorage.language = 'english'; 
       setButtonsForEnglish();
    }else{
        if(localStorage.language == 'english'){
           setButtonsForEnglish();
        }else{
           setButtonsForPunjabi();
        }
    }
}
function changeLanguage() {
    console.log('change language');
    if(localStorage.language == 'english'){
       localStorage.language = 'punjabi'; 
       setButtonsForPunjabi();
    }else{
       localStorage.language = 'english'; 
       setButtonsForEnglish();
    }
}

function setButtonsForEnglish(){

    $('#changeLanguageButton').text('pµjwbI');
    $('#changeLanguageButton').attr('class', 'customfont');

    $('#japjisahib').text('Japji Sahib');
    $('#jaapsahib').text('Jaap Sahib');
    $('#tavparsadsavaiye').text('Tav Parsad Savaiye');
    $('#chaupaisahib').text('Chaupai Sahib');
    $('#anandsahib').text('Anand Sahib');
    $('#rehraassahib').text('Rehraas Sahib');
    $('#kirtansohaila').text('Kirtan Sohaila');

    $('#japjisahib').attr('class', 'btn-large waves-effect waves-light orange');
    $('#jaapsahib').attr('class', 'btn-large waves-effect waves-light orange');
    $('#tavparsadsavaiye').attr('class', 'btn-large waves-effect waves-light orange');
    $('#chaupaisahib').attr('class', 'btn-large waves-effect waves-light orange');
    $('#anandsahib').attr('class', 'btn-large waves-effect waves-light orange');
    $('#rehraassahib').attr('class', 'btn-large waves-effect waves-light orange');
    $('#kirtansohaila').attr('class', 'btn-large waves-effect waves-light orange');
}
function setButtonsForPunjabi() {
    
    $('#changeLanguageButton').text('English');
    $('#changeLanguageButton').attr('class', '');
    
    $('#japjisahib').text('jpujI swihb');
    $('#jaapsahib').text('jwpu swihb');
    $('#tavparsadsavaiye').text('qÍ pRswid sv`Xy');
    $('#chaupaisahib').text('cOpeI swihb');
    $('#anandsahib').text('Anµdu swihb');
    $('#rehraassahib').text('rhrwis swihb');
    $('#kirtansohaila').text('kIrqn soihlw');

    $('#japjisahib').attr('class', 'customfont btn-large waves-effect waves-light orange');
    $('#jaapsahib').attr('class', 'customfont btn-large waves-effect waves-light orange');
    $('#tavparsadsavaiye').attr('class', 'customfont btn-large waves-effect waves-light orange');
    $('#chaupaisahib').attr('class', 'customfont btn-large waves-effect waves-light orange');
    $('#anandsahib').attr('class', 'customfont btn-large waves-effect waves-light orange');
    $('#rehraassahib').attr('class', 'customfont btn-large waves-effect waves-light orange');
    $('#kirtansohaila').attr('class', 'customfont btn-large waves-effect waves-light orange');
}

setLanguage();

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
if(getUrlParameter('name') != undefined){
	if(localStorage.language == 'english'){
		$('#paathname').text(getUrlParameter('name'));
	}else{
		$('#paathname').text(getUrlParameter('gname'));
    	$('#paathname').attr('class', 'customfont breadcrumb');
	}
}

var currentlyPlaying = false;
var counter = 0;
function start(){
    if(currentlyPlaying == false){
        audioElement.play();
        currentlyPlaying = true;
        $('#startbutton').text('pause');
        //set first 3 values to be zero
        if(counter == 0){
            counter = 2;
        }
    }else{
        audioElement.pause();
        currentlyPlaying = false;
        $('#startbutton').text('play_arrow');
    }
}

function getTime() {
    // console.log(Math.floor(audioElement.currentTime));
    counter++;
    var currentTimeValue = Math.floor(audioElement.currentTime);
    lines[counter][2] = currentTimeValue;
    $('#div' + counter).text(currentTimeValue);
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
    audioElement.setAttribute('src', 'learn/audio/' + filename +'.mp3');

    audioElement.ontimeupdate = function() {ontimeupdateFunction()};

	function ontimeupdateFunction() {

		var divToUpdate = 'td' + Math.floor(audioElement.currentTime);
	    if($('#' + divToUpdate).length > 0){
	    	$('#' + oldDivId).attr('style','font-weight: normal');
	    	$('#' + divToUpdate).attr('style','font-weight: bold');
	    	oldDivId = divToUpdate;
		    $('html, body').animate({
	            scrollTop: $('#div' + Math.floor(audioElement.currentTime)).offset().top - 200
	        }, 1000);
		}
	}

};

var oldDivId = 'td0';
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
    	var displayLanguageText = "<td id=\"td" + lines[i][2] + "\"><center>" +
            lines[i][0];
        if(localStorage.language != 'english'){
        	displayLanguageText = "<td class=\"customfont\" id=\"td" + lines[i][2] + "\"><center>" +
            lines[i][1];
        }
        var textToAdd = "<tr id=\"tr" + i +"\">"+
            "<td>"+
                "<div id=\"div" + lines[i][2] +"\">"+
                "</div"+
            "</td>"+
            displayLanguageText+
            "</center></td>"+
            "</tr>";
        $("#tableid").append(textToAdd);
        // console.log(textToAdd)
    }



}

function setuplearning(){
    var filename = getUrlParameter('id')+'.json';
    $('#downloadlink').attr('download',filename)
}

