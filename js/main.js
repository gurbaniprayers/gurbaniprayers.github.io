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

function refreshPage() {
    location.reload();
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
    $('#sukhmanisahib').text('Sukhmani Sahib');

    $('#japjisahib').attr('class', 'btn-large waves-effect waves-light orange smallsize');
    $('#jaapsahib').attr('class', 'btn-large waves-effect waves-light orange smallsize');
    $('#tavparsadsavaiye').attr('class', 'btn-large waves-effect waves-light orange smallsize');
    $('#chaupaisahib').attr('class', 'btn-large waves-effect waves-light orange smallsize');
    $('#anandsahib').attr('class', 'btn-large waves-effect waves-light orange smallsize');
    $('#rehraassahib').attr('class', 'btn-large waves-effect waves-light orange smallsize');
    $('#kirtansohaila').attr('class', 'btn-large waves-effect waves-light orange smallsize');
    $('#sukhmanisahib').attr('class', 'btn-large waves-effect waves-light orange smallsize');
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
    $('#sukhmanisahib').text('suKmnI swihb');

    $('#japjisahib').attr('class', 'customfont btn-large waves-effect waves-light orange smallsize');
    $('#jaapsahib').attr('class', 'customfont btn-large waves-effect waves-light orange smallsize');
    $('#tavparsadsavaiye').attr('class', 'customfont btn-large waves-effect waves-light orange smallsize');
    $('#chaupaisahib').attr('class', 'customfont btn-large waves-effect waves-light orange smallsize');
    $('#anandsahib').attr('class', 'customfont btn-large waves-effect waves-light orange smallsize');
    $('#rehraassahib').attr('class', 'customfont btn-large waves-effect waves-light orange smallsize');
    $('#kirtansohaila').attr('class', 'customfont btn-large waves-effect waves-light orange smallsize');
    $('#sukhmanisahib').attr('class', 'customfont btn-large waves-effect waves-light orange smallsize');
}

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
        // console.log(screen.height/4)
        if(isItScrolling == false){
  		    $('html, body').animate({
  	            scrollTop: $('#div' + Math.floor(audioElement.currentTime)).offset().top - (screen.height/4)
  	        }, 500);
        }
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
    if(window.screen.availWidth < 360){
      $('#maintitle').html('<i class="material-icons">keyboard_arrow_left</i>')
    }else{
      $('#maintitle').html('<i class="material-icons">keyboard_arrow_left</i> Gurbani Prayers')
    }
    var filename = getUrlParameter('id')+'.json';
    $('#downloadlink').attr('download',filename)
}

//id=japjisahib

function createMainButtons(id, englishName, gurmukhiName){
    var value =
                '<div style="display: none;" class="col s12 m3" >'+
                  '<div class="card">'+
                    '<center><div class="card-image waves-effect waves-block waves-light">'+
                    '<a englishName="'+
                    englishName+
                    '" gurmukhiName="'+
                    gurmukhiName+
                    '" href="learn.html?id='+id+'&name='+englishName+'&gname='+gurmukhiName+'">'+
                      '<img class="activator" src="image/'+id+'.png" style="max-width:100%; max-height:100%" >'+
                      '</a>'+
                    '</div></center>'+
                  //   '<div class="card-content" style="text-align: center;">'+
                  //       '<span class="card-title activator grey-text text-darken-4">'+
                  //       '</span>'+
                  //   '</div>'+
                  // '</div>'+
                '</div>';
                var value2 = $(value);
                $('#mainRow').append(value2);
                value2.slideDown();

}
createMainButtons('japjisahib', 'Japji Sahib', 'jpujI swihb');
createMainButtons('jaapsahib', 'Jaap Sahib', 'jwpu swihb');
createMainButtons('tavparsadsavaiye', 'Tav Parsad Savaiye', 'qÍ pRswid sv`Xy');
createMainButtons('chaupaisahib', 'Chaupai Sahib', 'cOpeI swihb');
createMainButtons('anandsahib', 'Anand Sahib', 'Anµdu swihb');
createMainButtons('rehraassahib', 'Rehraas Sahib', 'rhrwis swihb');
createMainButtons('kirtansohaila', 'Kirtan Sohaila', 'kIrqn soihlw');
createMainButtons('sukhmanisahib', 'Sukhmani Sahib', 'suKmnI swihb');

$("a").hover(function(){
  var englishName = $(this).attr("englishName");
  var gurmukhiName = $(this).attr("gurmukhiName");
  if(englishName != undefined){
    if(localStorage.language == 'english'){
      $('#maintitle').removeClass("customfont");
      $('#maintitle').text(englishName);
    }else {
      $('#maintitle').addClass("customfont");
      $('#maintitle').text(gurmukhiName);
    }
  }
});

setLanguage();

function getSupportInfo(){
  $('#importDataHere').append(getCard('Buy T Shirt', 'https://images-na.ssl-images-amazon.com/images/I/3190RU-sb6L.jpg', 'https://www.amazon.com/dp/B016LPLKMY'));
}

function getCreditInfo(){
  $('#importDataHere').append(getCard('Amanpreet Gill', 'http://graph.facebook.com/100001409270481/picture?type=large', 'https://www.facebook.com/amanpreet.gill.7777?fref=ts'));
  $('#importDataHere').append(getCard('Amrit', 'http://graph.facebook.com/100005088193860/picture?type=large', 'https://www.facebook.com/amritdaurl?fref=ts'));
  $('#importDataHere').append(getCard('Jas Simrat Kaur', 'http://graph.facebook.com/100000690897889/picture?type=large', 'https://www.facebook.com/jas.s.kaur.3551?fref=ts'));
}

function getCard(name, photo, url){
  var value = '<div class="col s12 m4">'+
    '<div class="card">'+
      '<div class="card-image waves-effect waves-block waves-light">'+
        '<img class="activator" src="'+
        photo+
        '">'+
      '</div>'+
      '<div class="card-content" style="text-align: center;">'+
        '<span class="card-title activator grey-text text-darken-4">'+
          '<a href="'+
          url+
          '">'+
          name+
          '</a>'+
        '</span>'+
        '</div>'+
    '</div>'+
  '</div>';
  return value;
}

var timer = null;
var isItScrolling = false;
console.log('false')
$(window)[0].addEventListener('scroll', function() {
    isItScrolling = true;
    if(timer !== null) {
        clearTimeout(timer);
    }
    timer = setTimeout(function() {
          // do something
          isItScrolling = false;
    }, 750);
}, false);
