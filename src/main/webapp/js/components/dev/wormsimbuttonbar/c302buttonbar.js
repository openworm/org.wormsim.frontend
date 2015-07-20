{
    "": {
        "default": {
            "showConnectivityBtn": {
                "actions": [
                    "var connW = G.addWidget(6);",
                    "connW.setName('Connectivity matrix');",
                    "connW.setData(c302,{linkType:function(c){return c.getSubNodesOfDomainType('Synapse')[0].id}});",
                    "connW.setPosition(611,190);",
                    "connW.setSize(495,666);"
                ],
                "icon": "gpt-make-group",
                "label": "Connectivity matrix",
                "tooltip": "Show connectivity matrix"
            }
        }
    }
}