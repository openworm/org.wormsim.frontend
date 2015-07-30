document.title="WormSim";
G.setBackgroundColour("#222222")
c302.setColor(G.getCookie("WSCC"),true);

G.addWidget(1);
Popup1.setMessage(Project.getActiveExperiment().getDescription());
Popup1.setName("Description");
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

c302.I3_0.electrical.select();
