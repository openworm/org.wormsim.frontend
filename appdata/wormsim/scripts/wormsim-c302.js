document.title="WormSim";
G.setBackgroundColour("#222222")
c302.setColor(G.getCookie("WSCC"),true);

window.WORMSIM_VARS.wormColor = G.getCookie("WSCC");
window.WORMSIM_VARS.wormName = G.getCookie("WSNC");
window.WORMSIM_VARS.backerName = G.getCookie("WSIDUS");
window.WORMSIM_VARS.projectName = "c302";

G.addWidget(1);
Popup1.setMessage(Project.getActiveExperiment().getDescription());
Popup1.setName(window.WORMSIM_VARS.wormName + " / C. elegans connectome");
Popup1.setPosition(600,65);
Popup1.setSize(110,500);

G.addBrightnessFunction(c302.ADAL_0.electrical, c302.ADAL_0.electrical.SimulationTree.generic_iaf_cell.v, function(x){return (x+0.06)/0.01;});
G.addBrightnessFunction(c302.ADAR_0.electrical, c302.ADAR_0.electrical.SimulationTree.generic_iaf_cell.v, function(x){return (x+0.06)/0.01;});
G.addBrightnessFunction(c302.BDUR_0.electrical, c302.BDUR_0.electrical.SimulationTree.generic_iaf_cell.v, function(x){return (x+0.06)/0.01;});
G.addBrightnessFunction(c302.I1R_0.electrical, c302.I1R_0.electrical.SimulationTree.generic_iaf_cell.v, function(x){return (x+0.06)/0.01;});
G.addBrightnessFunction(c302.I2L_0.electrical, c302.I2L_0.electrical.SimulationTree.generic_iaf_cell.v, function(x){return (x+0.06)/0.01;});
G.addBrightnessFunction(c302.PVDR_0.electrical, c302.PVDR_0.electrical.SimulationTree.generic_iaf_cell.v, function(x){return (x+0.06)/0.01;});

G.incrementCameraZoom(-0.3);
G.incrementCameraPan(0.65, 0);

G.addWidget(Widgets.BUTTONBAR).fromJSON('/org.geppetto.frontend/geppetto/js/components/dev/wormsimbuttonbar/c302buttonbar.js');
ButtonBar1.setPosition(600,0);

// tutorial
var tutorialPopup = G.addWidget(1);
tutorialPopup.setPosition(20,360);
tutorialPopup.setSize(150,300);
tutorialPopup.setName("Guided tour");
tutorialPopup.setMessage("Hi " + window.WORMSIM_VARS.backerName + "!  Welcome to the nervous system model of WormSim! Hit next below to start the guided tour!");
tutorialPopup.setResizable(false);
tutorialPopup.showCloseButton(false);
tutorialPopup.setDraggable(false);

G.addWidget(Widgets.BUTTONBAR).fromJSON('/org.geppetto.frontend/geppetto/js/components/dev/wormsimbuttonbar/tutorialButtonBar.js');
ButtonBar2.setPosition(20,509);
ButtonBar2.setSize(60,300);
ButtonBar2.showCloseButton(false);
ButtonBar2.showTitleBar(false);
ButtonBar2.setClass('centerContent noStyleDisableDrag');

c302.I3_0.electrical.select();
