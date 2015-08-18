var currentIncrememt = 0;

var skinVisible = true, musclesVisible = true, neuronsVisible = true;
var tutorialLoaded = "false";
var slidesCounter = 0;
var tutorialList = new Array();
var tutorialIndex = 0;

tutorialList[0] = "Now, before we move on, let me tell you something about myself...";
tutorialList[1] = "The first scientist that tried to look inside me was the biologist Sydney Brenner. He and his colleagues, Robert Horvitz and John Sulston, shared the Nobel prize in 2002.";
tutorialList[2] = "They were trying to understand how my genes work, and in his acceptance speech Brenner referred to me, the C. elegans, as nature's gift to science.";
tutorialList[3] = "I earned this praise because I am a relatively simple animal that can be very well studied in the laboratory.";
tutorialList[4] = "For example, I am the only animal for which scientists know the entire connectome. That is, which neurons are connected to which in my brain.";
tutorialList[5] = "The OpenWorm team is dedicated to creating a virtual equivalent of a real C. elegans - a daunting but exciting task.";
tutorialList[6] = "You can explore my anatomy using the virtual petri dish on the left - you can click and drag in order to rotate me around and don't be shy with the zoom, I don't mind!";
tutorialList[7] = "I, the WormSim, am the first step on the long road towards a virtual worm that behaves just like the real one.";
tutorialList[8] = "Building a computer model of any animal is a very difficult task due to the complex interactions in around and between cells.";
tutorialList[9] = "To simulate me, the OpenWorm folks are focusing on what is essential to the worm's crawling behavior: muscles and a nervous system!";
tutorialList[10] = "At the end of our chat, buttons will appear right below that will let you explore how my muscles make me crawl and how my brain cells are connected.";
tutorialList[11] = "New buttons will appear below when new simulations of worm models are released by the OpenWorm team.";
tutorialList[12] = "Alright that's it, let's go have a closer look at my insides!";

var hintList = new Array();
var hintIndex = 0;
hintList[0] = "Did you know? C. elegans is made up of only 1000 cells... 959 to be precise!";
hintList[1] = "Did you know? C. elegans only has 302 neurons.";
hintList[2] = "Did you know? Many human diseases can be modeled and studied in C. elegans.";
hintList[3] = "Did you know? 3 Nobel prizes were awarded for work on C. elegans.";
hintList[4] = "Did you know? There are more than 900 labs that study C. elegans around the world!";
hintList[5] = "Did you know? The OpenWorm project started in January 2011... with a tweet!";
hintList[6] = "Did you know? The OpenWorm project has more than 100 contributors from 13 different countries!";
hintList[7] = "Did you know? The OpenWorm project was recently featured on Through the Wormhole narrated by Morgan Freeman!";
hintList[8] = "Did you know? The majority of C. elegans are hermaphrodite, but males also exist.";
hintList[9] = "Did you know? C. elegans is probably the most studied and best understood organism in all of biology.";
hintList[10] = "Did you know? C. elegans is only about 1 millimeter long.";
hintList[11] = "Did you know? C. elegans was the first multicellular organism to have its whole genome sequenced."
hintList[12] = "Did you know? C. elegans is the first and only animal whose brain wiring diagram (connectome) is fully known."
hintList[13] = "Did you know? New buttons will appear below when new simulation of worm models are released by OpenWorm."
hintList[14] = "Did you know? The first scientist that tried to look inside me was the biologist Sydney Brenner."
hintList[15] = "Did you know? Brenner, Horvitz and Sulston won a Nobel prize in 2002 for their work on C. elegans."
hintList[16] = "Did you know? You can follow the recent progress of the OpenWorm project on its Twitter account @OpenWorm."
hintList[17] = "Did you know? The code for the OpenWorm project consists of more than 45 repositories on GitHub!"
hintList[18] = "Did you know? Even though C. elegans has a thoroughly studied brain, scientists still don't know how it crawls!"
hintList[19] = "Did you know? To do genetic experiments on C. elegans, you can feed it bacteria with the new genes you want to give it!"
hintList[20] = "Did you know? The C. elegans has transparent skin - all the better to see you with, my dear!"
hintList[21] = "Did you know? The C. elegans can be infused with fluorescent molecules from jellyfish to make its insides glow!"
hintList[22] = "Did you know? C. elegans neurons can be made sensitive to laser light, enabling scientists to remotely control its brain!"
hintList[23] = "Did you know? Scientists have been able to watch all of C. elegans' neurons glowing with activity in the living, moving animal!"

getTutorialState();

function startHintsOrTutorial() {
	if(tutorialLoaded != "true"){
		startTutorial();
	}
	else {
		startHints();
	}
}

function tutorialFinished() {
	tutorialLoaded = "true";
	showSimulationButtons();
	startHints();
	notifyServerTutorialFinished("true");
}

function startHints() {
	console.log("start hints");
	$('#prevArrow').css('display' , 'none');
	$('.buttons-container').css('display' , 'block');
	changeTextSnippet(0);
}

function startTutorial() {
	console.log("start tutorial");
	$('.buttons-container').css('display' , 'none');
	$('#prevArrow').css('display' , 'block');
	changeTextSnippet(0);
}

function notifyServerTutorialFinished(tutorialLoaded) {
	$.ajax({
            type: 'POST',
            url: 'ajaxSetTutorialFinished',
            data: {'tutorialLoaded': tutorialLoaded}
        }).done(function (response) {
        	console.log("tutorial finished set");
        }).fail(function (data) {

        });
}

function getTutorialState() {
	$.ajax({
            type: 'POST',
            url: 'ajaxGetTutorialFinished',
            data: {},
            dataType: 'text'
        }).done(function (response) {
            console.log("response:" + String(response));
            tutorialLoaded = String(response);
            startHintsOrTutorial();
        }).fail(function (data) {

        });
}

function changeTextSnippet(direction) {
	if(tutorialLoaded=="false") {
		changeTextSnippetTutorial(direction);
	} else {
		changeTextSnippetHint(direction);
	}
}

function changeTextSnippetTutorial(direction) {
	tutorialIndex = tutorialIndex + direction;

	// NOTE: this should never happen
	if(tutorialIndex < 0) {
		turorialIndex = 0;
	}

	if(tutorialIndex > 0) {
		$('#prevArrow').css('display', 'block');
	}
	else {
		$('#prevArrow').css('display', 'none');
	}

	if(tutorialIndex > tutorialList.length-1) {
		tutorialFinished();
	}

	$('#textSnippet').text(tutorialList[tutorialIndex]);
}

function changeTextSnippetHint(direction) {
	hintIndex = Math.ceil((hintList.length-1)*Math.random())
	$('#textSnippet').text(hintList[hintIndex]);
}

var nextSlide = function() {
	$('#textSnippet').addClass('animated fadeOutLeft');
	setTimeout(function(){
		changeTextSnippet(+1);
		$('#textSnippet').removeClass('animated fadeOutLeft')
		$('#textSnippet').addClass('animated fadeInRight');
	}, 500);
}

var prevSlide = function() {
	$('#textSnippet').addClass('animated fadeOutRight');
	setTimeout(function(){
		changeTextSnippet(-1);
		$('#textSnippet').removeClass('animated fadeOutRight')
		$('#textSnippet').addClass('animated fadeInLeft');
	}, 500);
}

function showSimulationButtons() {
	$('.buttons-container').css('display' , 'block');
	$('.buttons-container').addClass('animated fadeInUpBig')
}

var skinClick = function() {
	untoggleAll();
	skinVisible = true;
	toggleUntoggle();
	loadedModelMap[CUTICLE].visible = true;
	if(loadedModelMap[MUSCLES]) loadedModelMap[MUSCLES].visible = true;
	if(loadedModelMap[NEURONS]) loadedModelMap[NEURONS].visible = true;
}

var musclesClick = function() {
	untoggleAll();
	musclesVisible = true;
	toggleUntoggle();
	loadedModelMap[CUTICLE].visible = false;
	loadedModelMap[MUSCLES].visible = true;
	loadedModelMap[NEURONS].visible = true;
}

var neuronsClick = function() {
	untoggleAll();
	neuronsVisible = true;
	toggleUntoggle();
	loadedModelMap[CUTICLE].visible = false;
	loadedModelMap[MUSCLES].visible = false;
	loadedModelMap[NEURONS].visible = true;
}

function untoggleAll() {
	skinVisible = false;
	musclesVisible = false;
	neuronsVisible = false;
	toggleUntoggle();
}

function toggleUntoggle() {
	$("#skinButton").toggleClass("active-button", skinVisible);
	$("#musclesButton").toggleClass("active-button", musclesVisible);
	$("#neuronsButton").toggleClass("active-button", neuronsVisible);
}

var currentIncrememt = 0

var increaseSize = function() {
	var maxLength = parseInt($('#length-bar').css('height'), 10);
	//get current height and transform it to integer
	var currentHeight = parseInt($("#worm-length").css("height"), 10);

	//check if current height can smaller than max length
	if(currentIncrememt < $incrementSteps-1) {
		currentIncrememt++;

		var newHeight = currentHeight + progressValue;
		$("#worm-length").css("height", newHeight + "px");
		$("#worm-length").css("margin-top", "-" + (newHeight / 2) + "px");

		setNewWormZ(+1);
	}
}

var decreaseSize = function() {
	var currentHeight = parseInt($("#worm-length").css("height"), 10);
	//check if current height can smaller than max height
	if (currentIncrememt > 0) {
		currentIncrememt--;

		var newHeight = currentHeight - progressValue;
		$("#worm-length").css("height", newHeight + "px");
		$("#worm-length").css("margin-top", "-" + (newHeight / 2) + "px");

		setNewWormZ(-1);
	}
}

//wire up click events
$("#increase-size-btn").click(increaseSize);
$("#decrease-size-btn").click(decreaseSize);
$("#skinButton").click(skinClick);
$("#musclesButton").click(musclesClick);
$("#neuronsButton").click(neuronsClick);
$("#prevArrow").click(prevSlide);
$("#nextArrow").click(nextSlide);
$("#logoutBtn").click(function(){
	 window.location = "/logout";
});
