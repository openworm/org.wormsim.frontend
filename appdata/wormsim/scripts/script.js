document.title="WormSim";
G.setBackgroundColour("#222222");
wormsim.setColor(G.getCookie("WSCC"),true);

window.WORMSIM_VARS.wormColor = G.getCookie("WSCC");
window.WORMSIM_VARS.wormName = G.getCookie("WSNC");
window.WORMSIM_VARS.backerName = G.getCookie("WSIDUS");
window.WORMSIM_VARS.projectName = "sph";

G.addWidget(1);
Popup1.setPosition(755,85);
Popup1.setSize(150,400);
Popup1.setName(window.WORMSIM_VARS.wormName + " / C. elegans mechanical simulation");
Popup1.setMessage(Project.getActiveExperiment().getDescription());

G.addWidget(Widgets.BUTTONBAR).fromJSON('/org.geppetto.frontend/geppetto/js/components/dev/wormsimbuttonbar/buttonBarConfig.js');
ButtonBar1.setPosition(615,0);
G.addWidget(Widgets.BUTTONBAR).fromJSON('/org.geppetto.frontend/geppetto/js/components/dev/wormsimbuttonbar/muscleSelectionConfig.js');
ButtonBar2.setPosition(270,0);

G.addVisualTransformListener(wormsim.mechanical, wormsim.mechanical.VisualizationTree.transformation);

G.setPlayTimerStep(25);
G.setPlayLoop(true);

wormsim.show(false);
GEPPETTO.getVARS().pickingEnabled = false;

// tutorial 
var tutorialPopup = G.addWidget(1);
tutorialPopup.setPosition(20,360);
tutorialPopup.setSize(150,300);
tutorialPopup.setName("Guided tour");
tutorialPopup.setMessage("Hi " + window.WORMSIM_VARS.backerName + " welcome to WormSim! Hit next below to start the guided tour!");
tutorialPopup.setResizable(false);
tutorialPopup.showCloseButton(false);
tutorialPopup.setDraggable(false);

G.addWidget(Widgets.BUTTONBAR).fromJSON('/org.geppetto.frontend/geppetto/js/components/dev/wormsimbuttonbar/tutorialButtonBar.js');
ButtonBar3.setPosition(20,509);
ButtonBar3.setSize(60,300);
ButtonBar3.showCloseButton(false);
ButtonBar3.showTitleBar(false);
ButtonBar3.setClass('centerContent noStyleDisableDrag');

Project.getActiveExperiment().play({step:2});