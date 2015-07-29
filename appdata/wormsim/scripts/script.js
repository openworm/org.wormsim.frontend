G.setBackgroundColour("#222222")

G.addWidget(1);
Popup1.setPosition(755,85);
Popup1.setSize(150,400);
Popup1.setName("Description");
Popup1.setMessage(Project.getActiveExperiment().getDescription());

G.addWidget(Widgets.BUTTONBAR).fromJSON('/org.geppetto.frontend/geppetto/js/components/dev/wormsimbuttonbar/buttonBarConfig.js');
ButtonBar1.setPosition(615,0);
G.addWidget(Widgets.BUTTONBAR).fromJSON('/org.geppetto.frontend/geppetto/js/components/dev/wormsimbuttonbar/muscleSelectionConfig.js');
ButtonBar2.setPosition(270,0);

G.addVisualTransformListener(wormsim.mechanical, wormsim.mechanical.VisualizationTree.transformation);

G.setPlayTimerStep(15);
G.setPlayLoop(true);

wormsim.show(false);
GEPPETTO.getVARS().pickingEnabled = false;

Project.getActiveExperiment().play({step:1});
