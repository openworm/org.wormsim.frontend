{
    "Muscle selection": {
        "default": {
            "muscle03Btn": {
                "actions": [
                    "if(plotW !== undefined){plotW.destroy();}",
                    "G.unSelectAll();",
                    "var plotW = G.addWidget(Widgets.PLOT);",
					"plotW.setName(G.getCookie('WSNC')+' muscle DR4 activation signal');",
					"options = {yaxis:{min:-.1,max:1.1},xaxis:{min:0,max:400,show:false}, colors: [G.getCookie('WSCC')]};",
					"plotW.setOptions(options);",
					"plotW.setPosition(180, 400);",
					"plotW.setSize(220,1000);",
					"plotW.plotData(wormsim.muscle_3.mechanical.SimulationTree.activation);",
					"wormsim.changeOpacity(0.3,false);",
					"wormsim.show(true);",
					"wormsim.muscle_3.select();"
                ],
                "icon": "gpt-ion-channel",
                "label": "DR4",
                "tooltip": "Show muscle DR4"
            },
            "muscle15Btn": {
                "actions": [
                    "if(plotW !== undefined){plotW.destroy();}",
                    "G.unSelectAll();",
                    "var plotW = G.addWidget(Widgets.PLOT);",
                    "plotW.setName(G.getCookie('WSNC')+' muscle DR16 activation signal');",
					"options = {yaxis:{min:-.1,max:1.1},xaxis:{min:0,max:400,show:false}, colors: [G.getCookie('WSCC')]};",
					"plotW.setOptions(options);",
					"plotW.setPosition(180, 400);",
					"plotW.setSize(220,1000);",
					"plotW.plotData(wormsim.muscle_15.mechanical.SimulationTree.activation);",
					"wormsim.changeOpacity(0.3,false);",
					"wormsim.show(true);",
					"wormsim.muscle_15.select();"
                ],
                "icon": "gpt-ion-channel",
                "label": "DR16",
                "tooltip": "Show muscle DR16"
            },
            "muscle35Btn": {
                "actions": [
                    "if(plotW !== undefined){plotW.destroy();}",
                    "G.unSelectAll();",
                    "var plotW = G.addWidget(Widgets.PLOT);",
                    "plotW.setName(G.getCookie('WSNC')+' muscle VR12 activation signal');",
					"options = {yaxis:{min:-.1,max:1.1},xaxis:{min:0,max:400,show:false}, colors: [G.getCookie('WSCC')]};",
					"plotW.setOptions(options);",
					"plotW.setPosition(180, 400);",
					"plotW.setSize(220,1000);",
					"plotW.plotData(wormsim.muscle_35.mechanical.SimulationTree.activation);",
					"wormsim.changeOpacity(0.3,false);",
					"wormsim.show(true);",
					"wormsim.muscle_35.select();"
                ],
                "icon": "gpt-ion-channel",
                "label": "VR12",
                "tooltip": "Show muscle VR12"
            },
            "muscle43Btn": {
                "actions": [
                    "if(plotW !== undefined){plotW.destroy();}",
                    "G.unSelectAll();",
                    "var plotW = G.addWidget(Widgets.PLOT);",
                    "plotW.setName(G.getCookie('WSNC')+' muscle VR20 activation signal');",
					"options = {yaxis:{min:-.1,max:1.1},xaxis:{min:0,max:400,show:false}, colors: [G.getCookie('WSCC')]};",
					"plotW.setOptions(options);",
					"plotW.setPosition(180, 400);",
					"plotW.setSize(220,1000);",
					"plotW.plotData(wormsim.muscle_43.mechanical.SimulationTree.activation);",
					"wormsim.changeOpacity(0.3,false);",
					"wormsim.show(true);",
					"wormsim.muscle_43.select();"
                ],
                "icon": "gpt-ion-channel",
                "label": "VR20",
                "tooltip": "Show muscle VR20"
            }
        }
    }
}
