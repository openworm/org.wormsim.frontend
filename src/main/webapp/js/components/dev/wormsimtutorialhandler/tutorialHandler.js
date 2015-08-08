define(function(require) {
    var GEPPETTO = require('geppetto');

    window.WORMSIM_VARS = {};
    window.WORMSIM_VARS.tutorialIndex = -1;

    /* SPH tutorial */
    var sphTutorialMessages = [];
    var sphTutorialActions = [];



    sphTutorialMessages.push("What you can see here is a typical behaviour: forward locomotion.");
    sphTutorialActions.push('');

    sphTutorialMessages.push("As simple as the worm seems, there is still a great number of open questions about how the worm’s brain is generating it’s typical crawling motion.");
    sphTutorialActions.push('');

    sphTutorialMessages.push("Although it is a very stereotypical movement scientists still argue over a number of possibilities how does the worm achieves this.");
    sphTutorialActions.push('');

    sphTutorialMessages.push("C. elegans have 95 body wall muscles along its body, that help to navigate the worm in its world.");
    sphTutorialActions.push('wormsim.changeOpacity(0.3,false);wormsim.show(true);');

    sphTutorialMessages.push("The current model that you can see has correct anatomy, but the cells are not based on real data.  They are ‘tuned’ to get the job done. ");
    sphTutorialActions.push('');

    sphTutorialMessages.push("One of the next major step for the OpenWorm project is to accommodate more data about the muscular activity of worm.");
    sphTutorialActions.push('');

    sphTutorialMessages.push("OpenWorm wants to further understanding by providing an integrated simulation where both the worm’s biology and the physics of the surrounding environment is simulated.");
    sphTutorialActions.push('');

    sphTutorialMessages.push("Other than straight runs, the worm also engages in turns, reverses and other behaviours.");
    sphTutorialActions.push('');

    sphTutorialMessages.push("If you are interested in the behaviour of real worms check out <a href='https://www.youtube.com/user/wormbehavior' target='_blank'>these videos</a> by the <a href='http://www.google.com/url?q=http%3A%2F%2Fwormbehavior.mrc-lmb.cam.ac.uk%2F&sa=D&sntz=1&usg=AFQjCNGYmP8hCUFsrU0ofv_6SGv1Cm-p7A' target='_blank'>C. elegans behavioural database.</a>");
    sphTutorialActions.push('');

    sphTutorialMessages.push("We are currently in the process of setting up collaborations with laboratories around the world to fill this gap.");
    sphTutorialActions.push('');
//  sphTutorialActions.push('Project.getActiveExperiment().pause();');

//    sphTutorialMessages.push("The simulation is now playing.");
//    sphTutorialActions.push('Project.getActiveExperiment().play({step:2});');

//    sphTutorialMessages.push("The simulation is now paused.");
//    sphTutorialActions.push('Project.getActiveExperiment().pause();');

//    sphTutorialMessages.push("Fun times, the simulation is now stopped.");
//    sphTutorialActions.push('Project.getActiveExperiment().stop();');

//    sphTutorialMessages.push("And... playing again.<br />Click next to restart the tutorial!");
//    sphTutorialActions.push('Project.getActiveExperiment().play({step:2});');

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
