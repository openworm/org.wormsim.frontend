define(function(require) {
    var GEPPETTO = require('geppetto');
    
    window.WORMSIM_VARS = {};
    window.WORMSIM_VARS.tutorialIndex = -1;
    
    /* SPH tutorial */
    var sphTutorialMessages = [];
    var sphTutorialActions = [];
    
    sphTutorialMessages.push("The simulation is now paused.");
    sphTutorialActions.push('Project.getActiveExperiment().pause();');
    
    sphTutorialMessages.push("The simulation is now playing.");
    sphTutorialActions.push('Project.getActiveExperiment().play({step:2});');
    
    sphTutorialMessages.push("The simulation is now paused.");
    sphTutorialActions.push('Project.getActiveExperiment().pause();');
    
    sphTutorialMessages.push("Fun times, the simulation is now stopped.");
    sphTutorialActions.push('Project.getActiveExperiment().stop();');
    
    sphTutorialMessages.push("And... playing again.<br />Click next to restart the tutorial!");
    sphTutorialActions.push('Project.getActiveExperiment().play({step:2});');

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