define(function(require) {
    var GEPPETTO = require('geppetto');

    window.WORMSIM_VARS = {};
    window.WORMSIM_VARS.tutorialIndex = -1;

    /* SPH tutorial */
    var sphTutorialMessages = [];
    var sphTutorialActions = [];

    sphTutorialMessages.push("What you can see here is my most obvious and common behaviour: forward locomotion.  Yes it may sound like my motion is LOCO (i.e. craaazy).  It is actually just a way to say a behaviour that gets my body moving through the world :)");
    sphTutorialActions.push('');

    sphTutorialMessages.push("Other than straight runs, I can do fancier things like engage in turns, reverses and other behaviours.  If you are interested in the behaviour of my fellow worm friends, check out <a href='https://www.youtube.com/user/wormbehavior' target='_blank'>these videos</a> by the <a href='http://www.google.com/url?q=http%3A%2F%2Fwormbehavior.mrc-lmb.cam.ac.uk%2F&sa=D&sntz=1&usg=AFQjCNGYmP8hCUFsrU0ofv_6SGv1Cm-p7A' target='_blank'>C. elegans behavioural database.</a>");
    sphTutorialActions.push('');

    sphTutorialMessages.push("Even as simple as the forward locomotion looks though, there are still a great number of open questions about how my brain generates even this movement.  Scientists trying to figure me out sure have a bunch of ideas for how my cells do this!  But they still haven't completely figured me out!  Isn't that strange?");
    sphTutorialActions.push('');

    sphTutorialMessages.push("The OpenWorm community talked about this mystery in <a href='https://www.youtube.com/watch?v=puB8R9PW3BI&index=10&list=PL8ACJC0fGE7D-EkkR7EFgQESpHONC_kcI' target='_blank'>one of our OpenWorm journal clubs.</a>  Part of the mystery deals with my muscles.");
    sphTutorialActions.push('');

    sphTutorialMessages.push("Under my skin, I have 95 muscles along my body, which are the primary drivers of my forward locomotion.  The current model that you can see has my correct anatomy.  Feel free to use your mouse to rotate me around!");
    sphTutorialActions.push('wormsim.changeOpacity(0.3,false);wormsim.show(true);');

    sphTutorialMessages.push("The motion of each muscle you see here is the result of a complex physics simulation we call Sibernetic.  My friends at OpenWorm worked really hard on it!  You can  <a href='http://www.sibernetic.org' target='_blank'>learn more about Sibernetic online</a>.");
    sphTutorialActions.push('');

    sphTutorialMessages.push("Each of my muscle cells are pulling on my body making up the forward locomotion behavior.  So far, my cells are only loosely based on real data, but are ‘tuned’ to get the job done. ");
    sphTutorialActions.push('');

    sphTutorialMessages.push("Ever seen a proud body builder flexing at the gym?  Well check out this graph of one of MY muscles flexing!  When the line is up at the top, my muscle is the most flexed; when it drops to the bottom it is the most loose.");
    sphTutorialActions.push("if(plotW !== undefined){plotW.destroy();};G.unSelectAll();var plotW = G.addWidget(Widgets.PLOT);plotW.setName(G.getCookie('WSNC')+' muscle VR12 activation signal');options = {yaxis:{min:-.1,max:1.1},xaxis:{min:0,max:400,show:false}, colors: [G.getCookie('WSCC')]};plotW.setOptions(options);plotW.setPosition(180, 400);plotW.setSize(220,1000);plotW.plotData(wormsim.muscle_35.mechanical.SimulationTree.activation);wormsim.changeOpacity(0.3,false);wormsim.show(true);wormsim.muscle_35.select();");

    sphTutorialMessages.push("Can you rotate me around so you can find the one yellow highlighted muscle that's generating this graph?  Feel free to zoom up close to see it.  That's the one I call 'VR12' :) ");
    sphTutorialActions.push('');

    sphTutorialMessages.push("Check it out; you can FREEZE me IN PLACE!  See those play / pause / stop buttons in the upper right corner?  You can use them to get me moving again and freeze me whenever you like.");
    sphTutorialActions.push('Project.getActiveExperiment().pause();');

    sphTutorialMessages.push("One of the next major steps for the OpenWorm project is to incorporate more data about the muscular activity of worm.  We've got a <a href='https://github.com/openworm/muscle_model/blob/addb61f370bab4e510a7610691524df172f03eba/README.md#introduction' target='_blank'>whole project</a> dedicated to building on what's been done to have a great model of each of these muscles that is as accurate as possible.");
    sphTutorialActions.push('Project.getActiveExperiment().play({step:2});');

    sphTutorialMessages.push("After you are done checking out my SWEET muscles (ha ha) you should go check out my brain cells over at the nervous system simulation.  See you over there!");
    sphTutorialActions.push('');


    /* c302 tutorial */
	var c302TutorialMessages = [];
	var c302TutorialActions = [];

	c302TutorialMessages.push("This is the C. elegans connectome!");
	c302TutorialActions.push('');

	c302TutorialMessages.push("You might wanna select stuff to see how cells are connected to each other!");
	c302TutorialActions.push('G.unSelectAll(); c302.NSML_0.electrical.select();');

	c302TutorialMessages.push("You might explore the connectibity matrix and be seriosuly mind blown.");
	c302TutorialActions.push("");

	c302TutorialMessages.push("Guided tour over!<br /><br />Click next to restart the  tutorial!<br /><br />Check out <a href='http://www.wormbase.org/' target='_blank'>WormBase</a> for cool worm stuff.");
	c302TutorialActions.push('');

    window.WORMSIM_VARS.showTutorial = function(){
    	var tutorialMessages = (Project.name == "WormSim") ? sphTutorialMessages : c302TutorialMessages;
    	var tutorialActions = (Project.name == "WormSim") ? sphTutorialActions : c302TutorialActions;

    	if (window.WORMSIM_VARS.tutorialIndex < 0 || window.WORMSIM_VARS.tutorialIndex >=  tutorialMessages.length){
    		// do not decrease less than zero and go back to the start at the end
    		window.WORMSIM_VARS.tutorialIndex = 0;
    	}

    	// set new text / variable name depends on the popup defined in the wormsim script
    	tutorialPopup.setMessage(tutorialMessages[window.WORMSIM_VARS.tutorialIndex]);
    	// make things happen with scripts (if any scripted action is required otherwise the script is empty)
    	GEPPETTO.Console.executeCommand(tutorialActions[window.WORMSIM_VARS.tutorialIndex]);
    };
});
