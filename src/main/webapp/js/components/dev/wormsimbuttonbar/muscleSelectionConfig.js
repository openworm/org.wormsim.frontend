{
    "Muscle selection": {
        "default": {
            "muscle03Btn": {
                "actions": [
                    "if(plotW !== undefined){plotW.destroy()}",
                    "G.unSelectAll();",
                    "var plotW = G.addWidget(Widgets.PLOT);",
					"plotW.setName('C. elegans muscle DR4 activation signal');",
					"options = {yaxis:{min:-.1,max:1.1},xaxis:{min:0,max:400,show:false}};",
					"plotW.setOptions(options);",
					"plotW.setPosition(115, 85);",
					"plotW.setSize(220,370);",
					"plotW.plotData(wormsim.muscle_3.mechanical.SimulationTree.activation);",
					"wormsim.hide(false); wormsim.muscle_3.select();"
                ],
                "icon": "gpt-ion-channel",
                "label": "DR4",
                "tooltip": "Show muscle DR4"
            },
            "muscle15Btn": {
                "actions": [
                    "if(plotW !== undefined){plotW.destroy()}",
                    "G.unSelectAll();",
                    "var plotW = G.addWidget(Widgets.PLOT);",
					"plotW.setName('C. elegans muscle DR16 activation signal');",
					"options = {yaxis:{min:-.1,max:1.1},xaxis:{min:0,max:400,show:false}};",
					"plotW.setOptions(options);",
					"plotW.setPosition(115, 85);",
					"plotW.setSize(220,370);",
					"plotW.plotData(wormsim.muscle_15.mechanical.SimulationTree.activation);",
					"wormsim.hide(false); wormsim.muscle_15.select();"
                ],
                "icon": "gpt-ion-channel",
                "label": "DR16",
                "tooltip": "Show muscle DR16"
            },
            "muscle35Btn": {
                "actions": [
                    "if(plotW !== undefined){plotW.destroy()}",
                    "G.unSelectAll();",
                    "var plotW = G.addWidget(Widgets.PLOT);",
					"plotW.setName('C. elegans muscle VR12 activation signal');",
					"options = {yaxis:{min:-.1,max:1.1},xaxis:{min:0,max:400,show:false}};",
					"plotW.setOptions(options);",
					"plotW.setPosition(115, 85);",
					"plotW.setSize(220,370);",
					"plotW.plotData(wormsim.muscle_35.mechanical.SimulationTree.activation);",
					"wormsim.hide(false); wormsim.muscle_35.select();"
                ],
                "icon": "gpt-ion-channel",
                "label": "VR12",
                "tooltip": "Show muscle VR12"
            },
            "muscle43Btn": {
                "actions": [
                    "if(plotW !== undefined){plotW.destroy()}",
                    "G.unSelectAll();",
                    "var plotW = G.addWidget(Widgets.PLOT);",
					"plotW.setName('C. elegans muscle VR20 activation signal');",
					"options = {yaxis:{min:-.1,max:1.1},xaxis:{min:0,max:400,show:false}};",
					"plotW.setOptions(options);",
					"plotW.setPosition(115, 85);",
					"plotW.setSize(220,370);",
					"plotW.plotData(wormsim.muscle_43.mechanical.SimulationTree.activation);",
					"wormsim.hide(false); wormsim.muscle_43.select();"
                ],
                "icon": "gpt-ion-channel",
                "label": "VR20",
                "tooltip": "Show muscle VR20"
            }
        }
    }
}