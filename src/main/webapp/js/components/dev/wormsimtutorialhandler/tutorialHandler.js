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

    sphTutorialMessages.push("Even as simple as the forward locomotion looks though, there are still a great number of open questions about how my brain generates even this movement.  Scientists still haven't completely figured  out how my cells do this!  Isn't that strange?");
    sphTutorialActions.push('');

    sphTutorialMessages.push("The OpenWorm community talked about this mystery in <a href='https://www.youtube.com/watch?v=puB8R9PW3BI&index=10&list=PL8ACJC0fGE7D-EkkR7EFgQESpHONC_kcI' target='_blank'>one of our OpenWorm journal clubs.</a>  Part of the mystery deals with my muscles...");
    sphTutorialActions.push('');

    sphTutorialMessages.push("Under my skin, I have 95 muscles along my body, which are the primary drivers of my forward locomotion.  The current model that you can see has my correct anatomy.  Feel free to use your mouse to rotate me around!");
    sphTutorialActions.push('wormsim.changeOpacity(0.3,false);wormsim.show(true);');

    sphTutorialMessages.push("The motion of each muscle you see here is the result of a complex physics simulation we call Sibernetic.  My friends at OpenWorm worked really hard on it!  You can  <a href='http://www.sibernetic.org' target='_blank'>learn more about Sibernetic online</a>.");
    sphTutorialActions.push('');

    sphTutorialMessages.push("Each of my muscle cells are pulling on my body making up the forward locomotion behavior.  So far, my cells are only loosely based on real data, but are ‘tuned’ to get the job done. ");
    sphTutorialActions.push('');

    sphTutorialMessages.push("Ever seen a proud body builder flexing at the gym?  Well check out this graph of one of MY muscles flexing!  When the line is up at the top, my muscle is the most flexed; when it drops to the bottom it is the most loose.");
    sphTutorialActions.push("if(plotW !== undefined){plotW.destroy();};G.unSelectAll();var plotW = G.addWidget(Widgets.PLOT);plotW.setName(G.getCookie('WSNC')+' muscle VR12 activation signal');options = {yaxis:{min:-.1,max:1.1},xaxis:{min:0,max:400,show:false}, colors: [G.getCookie('WSCC')]};plotW.setOptions(options);plotW.setPosition(319,499);plotW.setSize(209.80000019073486,805.8000001907349);plotW.plotData(wormsim.muscle_35.mechanical.SimulationTree.activation);wormsim.changeOpacity(0.3,false);wormsim.show(true);wormsim.muscle_35.select();");

    sphTutorialMessages.push("Can you rotate me around so you can find the one yellow highlighted muscle that's generating this graph?  Feel free to zoom up close to see it.  That's the one I call 'VR12' :) ");
    sphTutorialActions.push('');

    sphTutorialMessages.push("Check it out; you can FREEZE me IN PLACE!  See those play / pause / stop buttons in the upper right corner?  You can use them to get me moving again and freeze me whenever you like.");
    sphTutorialActions.push('Project.getActiveExperiment().pause();');

    sphTutorialMessages.push("One of the next major steps for the OpenWorm project is to incorporate more data about the muscular activity of worm.  We've got a <a href='https://github.com/openworm/muscle_model/blob/addb61f370bab4e510a7610691524df172f03eba/README.md#introduction' target='_blank'>whole project</a> dedicated to getting the muscles as accurate as possible.");
    sphTutorialActions.push('Project.getActiveExperiment().play({step:2});');

    sphTutorialMessages.push("After you are done checking out my SWEET muscles (ha ha), you should go check out my brain cells over at the nervous system simulation.  See you over there!");
    sphTutorialActions.push('');

    sphTutorialMessages.push("The guided tour is over, hope you had a good time!<br /><br />You can keep playing with my muscles or click \'next\' to restart the tutorial!");
  	sphTutorialActions.push('');

    /* c302 tutorial */
	var c302TutorialMessages = [];
	var c302TutorialActions = [];

	c302TutorialMessages.push("This is a visualization of my neurons! Each sphere represents one of them. <a href='https://en.wikipedia.org/wiki/Neuron' target='_blank' >Neurons</a> are cells that make up the <a href='https://en.wikipedia.org/wiki/Nervous_system' target='_blank'>nervous system</a>. They communicate with each other with chemical and electrical signals.");
	c302TutorialActions.push('');

	c302TutorialMessages.push("The lines connecting neurons represent the connections between my neurons, sometimes called axons and dendrites.  You might want to click on my cells to see how they are connected to each other!");
	c302TutorialActions.push('G.unSelectAll(); c302.NSML_0.electrical.select();');

	c302TutorialMessages.push("When you select one of my cells, it is higlighted in yellow. Input cells are shown in white and output cells in orange.  Cells that are both themselves input cells and also provide input to the one you have selected selected (yes, it's possible!) are shown in green. Click <a href='http://docs.geppetto.org/en/latest/connections.html' target='_blank'>here</a> for a handy reference.");
	c302TutorialActions.push('');

	c302TutorialMessages.push("But what does it mean for a neuron to be an input to another neuron?  It simply means that the neuron in yellow receives signals from the one in white!");
	c302TutorialActions.push('');

	c302TutorialMessages.push("Similarly, the output neurons in orange receive signals from the yellow one. See? You're flying through this neuroscience stuff!");
	c302TutorialActions.push('');

	c302TutorialMessages.push("You are looking at an area in my head where there are lots of neurons next to each other. Technically it is not a brain.  Scientist call it the \'nerve ring\', but in essence it plays the same role.");
	c302TutorialActions.push("G.incrementCameraZoom(+0.05);");

	c302TutorialMessages.push("Further down my body, you can also clearly see neurons. These are connected to my muscle cells that give rise to my movement like what you can see over in the muscle system simulation.");
	c302TutorialActions.push("G.incrementCameraRotate(0.05, 0, 0); G.incrementCameraPan(0, 0); G.incrementCameraPan(0, -0.2); G.incrementCameraPan(0, 0); G.incrementCameraPan(-0.23, 0);");

	c302TutorialMessages.push("Go ahead - you can drag me around, rotate me and zoom in as much as you want with your mouse or with the camera controls in the top left!");
	c302TutorialActions.push('');

	c302TutorialMessages.push("Now, the diagram that you see here is called a connectivity matrix.  It is a representation at a glance of my <a href='https://en.wikipedia.org/wiki/Connectome' target='_blank'>\'connectome\'</a>, and simply shows which neuron is connected to which other neuron. Each square represents a connection.");
	c302TutorialActions.push("var connW = G.addWidget(6); connW.setName(G.getCookie('WSNC')+ ' Connectivity matrix'); connW.setData(c302,{linkType:function(c){return c.getSubNodesOfDomainType('Synapse')[0].id}}); connW.setPosition(611,190); connW.setSize(495,666);");

	c302TutorialMessages.push("It is kind of mind-boggling isn't it?  It's like looking at the blueprint of the architecture of a building... but it's for my brain! It's hard to interpret this picture, but looking at pictures like this helps scientists compare neuronal networks - brains! - to each other.");
	c302TutorialActions.push("");

	c302TutorialMessages.push("My species is the only one for which this wiring has been completely mapped out!  The availability of this data is a big part of why OpenWorm has decided to make a model of me instead of some other animal.  Lucky me!");
	c302TutorialActions.push("");

	c302TutorialMessages.push("The guided tour is over, hope you enjoyed it!<br /><br />You can keep exploring my nervous system or click \'next\' to restart the tutorial!");
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
