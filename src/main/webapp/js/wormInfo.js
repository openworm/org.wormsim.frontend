$("#logoutBtn").click(function(){
	 window.location = "/logout";
});

var userSelectedColor = "";
var userSelectedName = "Spock";
var userSurname = "John";

var currentSlide = 0;
var noOfSlides = 4;

var slidesArray = new Array();
slidesArray[0] = document.getElementById("slide-one");
slidesArray[1] = document.getElementById("slide-two");
slidesArray[2] = document.getElementById("slide-three");
slidesArray[3] = document.getElementById("slide-four");

var leftArrow = document.getElementById("left-arrow");
var rightArrow = document.getElementById("right-arrow");

var initialCameraPosition = {x: 8, y: 16, z: 25};
var initialCameraRotation={x: -0.5, y: 0, z: 0};
var afterCameraPosition = {x: 0, y: 5, z: 16};
var afterCameraRotation={x:-0.5, y: 0, z: 0};

init();

function init() {
    console.log("init running");
    makeVisibleOnlyOne(0);
    setArrowsVisibility();
}

function makeVisibleOnlyOne(visibleIndex) {
    for (var i = 0; i < slidesArray.length; i++) {
        if (i != visibleIndex)
        {
            slidesArray[i].style.zIndex = 300 + i;
            slidesArray[i].style.visibility = "hidden";
        }
        else
        {
            slidesArray[i].style.zIndex = 999;
            slidesArray[i].style.visibility = "visible";
        }
    }
}

function setArrowsVisibility() {
    if (currentSlide == 0){
        updateArrowVisibility("visible", "hidden");
    }
    else if (currentSlide == 1){
    	// pick a color
    	var colorSelected = ($(".circle-active").length > 0) ? true : false;
    	updateArrowVisibility(colorSelected ? "visible" : "hidden", "visible");
    }
    else if (currentSlide == 2){
    	// give it a name
    	updateArrowVisibility(($("#worm-name-input").val() != "type here") ? "visible" : "hidden", "visible");
    }
    else {
        updateArrowVisibility("visible", "visible");
    }
}

function updateArrowVisibility(leftArrowVisible, rightArrowVisible) {
    rightArrow.style.visibility = rightArrowVisible;
    leftArrow.style.visibility = leftArrowVisible;
}

function nextSlide() {
if (currentSlide < noOfSlides - 1) {
    notifyWormNewSlide(currentSlide, currentSlide + 1);
    currentSlide++;
    setArrowsVisibility();
    makeVisibleOnlyOne(currentSlide);
}
else if (currentSlide == noOfSlides - 1) {
    // save worm info and send to next slide
    $.ajax({
        type: 'POST',
        url: 'setWormInfo',
        data: {'color': userSelectedColor, 'name': userSelectedName}
    }).done(function (response) {
        window.location.href = "/";
    }).fail(function (data) {
        alert("fail");
        });
    }
    slideChanged();
}

    function prevSlide() {
        if (currentSlide > 0) {
            notifyWormNewSlide(currentSlide, currentSlide - 1);
            currentSlide--;
            setArrowsVisibility();
            makeVisibleOnlyOne(currentSlide);
        }
        slideChanged();
    }

	function slideChanged() {
		if(currentSlide==2) {					
			$('#worm-name-input').select();
	}
	if(currentSlide==3) {
		$('#nextSlideSymbol').text('Save');
		$('#userSurnameDisplay').text(usernameFromServer);
		$('#worm-name-confirmed').text(userSelectedName);
		$('#worm-name-confirmed-2').text(userSelectedName);
	}
	if(currentSlide!=3) {
		$('#nextSlideSymbol').text(' > ');
	}
}

var colorsArray = new Array();
colorsArray[0] = ("color1");
colorsArray[1] = ("color2");
colorsArray[2] = ("color3");
colorsArray[3] = ("color4");
colorsArray[4] = ("color5");
colorsArray[5] = ("color6");
colorsArray[6] = ("color7");

function defaultColorChange() {
    colorChange(0);
}

function unmarkAllColorBubbles() {
    for (var i = 0; i < colorsArray.length; i++) {
        $( "#"+colorsArray[i]).toggleClass( "circle-active", false);
    }
}

function colorChange(id) {
    unmarkAllColorBubbles();
    userSelectedColor = $("#"+colorsArray[id]).css("background-color");
    $("#"+colorsArray[id]).toggleClass("circle-active",true);
    document.getElementById("worm-name-input").style.color = userSelectedColor;
    document.getElementById("worm-name-confirmed").style.color = userSelectedColor;
    $.fn.setWormColor(rgb2hex(userSelectedColor));
    
    if(id!=0){
    	leftArrow.style.visibility = "visible";
    }
}

function wormNameChange(newName) {
    userSelectedName = newName;
    document.getElementById("worm-name-confirmed").innerHTML = userSelectedName;
    document.getElementById("userSurnameDisplay").innerHtml = "userSurname";
    
    if(userSelectedName != "type here" || userSelectedName != "" ){
    	leftArrow.style.visibility = "visible";
    }
}

function notifyWormNewSlide(oldSlideIndex, newSlideIndex) {
    console.log("moving from slide " + oldSlideIndex + " to " + newSlideIndex);
    if (oldSlideIndex == 0 && newSlideIndex == 1) {
        moveCameraToPosition(afterCameraPosition,afterCameraRotation);
    }

    if (oldSlideIndex == 1 && newSlideIndex == 0) {
        moveCameraToPosition(initialCameraPosition,initialCameraRotation);
    }
}

var hexDigits = new Array
        ("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f");

//Function to convert hex format to a rgb color
function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function hex(x) {
    console.log(x);
    return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
}

$("#worm-name-input").on('input propertychange paste', function (event){
	wormNameChange($(this).val());
});