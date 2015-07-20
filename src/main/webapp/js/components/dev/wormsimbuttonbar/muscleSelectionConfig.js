{
    "Muscle selection": {
        "default": {
            "muscle03Btn": {
                "actions": [
                    "if(plotW !== undefined){plotW.destroy()}",
                    "wormsim.muscle_15.unselect(); wormsim.muscle_35.unselect();",
                    "var plotW = G.addWidget(Widgets.PLOT);",
					"plotW.setName('C. elegans muscle 03 activation signal');",
					"options = {yaxis:{min:-.1,max:1.1},xaxis:{min:0,max:400,show:false}};",
					"plotW.setOptions(options);",
					"plotW.setPosition(115, 85);",
					"plotW.setSize(220,370);",
					"plotW.plotData(wormsim.muscle_3.mechanical.SimulationTree.activation);",
					"wormsim.hide(false); wormsim.muscle_3.select();"
                ],
                "icon": "gpt-ion-channel",
                "label": "Muscle 03",
                "tooltip": "Show muscle 03"
            },
            "muscle15Btn": {
                "actions": [
                    "if(plotW !== undefined){plotW.destroy()}",
                    "wormsim.muscle_3.unselect(); wormsim.muscle_35.unselect();",
                    "var plotW = G.addWidget(Widgets.PLOT);",
					"plotW.setName('C. elegans muscle 15 activation signal');",
					"options = {yaxis:{min:-.1,max:1.1},xaxis:{min:0,max:400,show:false}};",
					"plotW.setOptions(options);",
					"plotW.setPosition(115, 85);",
					"plotW.setSize(220,370);",
					"plotW.plotData(wormsim.muscle_15.mechanical.SimulationTree.activation);",
					"wormsim.hide(false); wormsim.muscle_15.select();"
                ],
                "icon": "gpt-ion-channel",
                "label": "Muscle 15",
                "tooltip": "Show muscle 15"
            },
            "muscle35Btn": {
                "actions": [
                    "if(plotW !== undefined){plotW.destroy()}",
                    "wormsim.muscle_3.unselect(); wormsim.muscle_15.unselect();",
                    "var plotW = G.addWidget(Widgets.PLOT);",
					"plotW.setName('C. elegans muscle 35 activation signal');",
					"options = {yaxis:{min:-.1,max:1.1},xaxis:{min:0,max:400,show:false}};",
					"plotW.setOptions(options);",
					"plotW.setPosition(115, 85);",
					"plotW.setSize(220,370);",
					"plotW.plotData(wormsim.muscle_35.mechanical.SimulationTree.activation);",
					"wormsim.hide(false); wormsim.muscle_35.select();"
                ],
                "icon": "gpt-ion-channel",
                "label": "Muscle 35",
                "tooltip": "Show muscle 35"
            }
        }
    }
}
  