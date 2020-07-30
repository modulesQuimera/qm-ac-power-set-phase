module.exports = function(RED) {

    var mapeamentoNode;

    function multipleSetPhase(self, file, slot, currentMode){
        for(var t=0; t<self.qtdSetPhase; t++){
            var command_n={
                type: "AC_power_source_virtual_V1_0",
                slot: parseInt(self.slot),
                method: "set_phase",
                phase_value: parseInt(self.phase_value_n[t]),
                get_output: {},
                compare: {}
            }
            if(!(slot === "begin" || slot === "end")){
                if(currentMode == "test"){
                    file.slots[slot].jig_test.push(command_n);
                }
                else{
                    file.slots[slot].jig_error.push(command_n);
                }
            }
            else{
                if(slot === "begin"){
                    file.slots[0].jig_test.push(command_n);
                }
                else{
                    file.slots[3].jig_test.push(command_n);
                }
            }
        }
        return file;
    }

    function setPhaseNode(config) {
        RED.nodes.createNode(this, config);
        this.slot = config.slot;
        this.phase_value = config.phase_value;

        this.qtdSetPhase = config.qtdSetPhase;
        this.phase_value_n = [];
        this.phase_value_n.push(config.phase_value1);
        this.phase_value_n.push(config.phase_value2);
        this.phase_value_n.push(config.phase_value3);
        this.phase_value_n.push(config.phase_value4);
        this.phase_value_n.push(config.phase_value5);
        this.phase_value_n.push(config.phase_value6);
        this.phase_value_n.push(config.phase_value7);
        this.phase_value_n.push(config.phase_value8);
        this.phase_value_n.push(config.phase_value9);
        this.phase_value_n.push(config.phase_value10);
        this.phase_value_n.push(config.phase_value11);
        this.phase_value_n.push(config.phase_value12);
        this.phase_value_n.push(config.phase_value13);
        this.phase_value_n.push(config.phase_value14);
        this.phase_value_n.push(config.phase_value15);
        this.phase_value_n.push(config.phase_value16);
        this.phase_value_n.push(config.phase_value17);
        this.phase_value_n.push(config.phase_value18);
        this.phase_value_n.push(config.phase_value19);
        this.phase_value_n.push(config.phase_value20);
        this.phase_value_n.push(config.phase_value21);
        this.phase_value_n.push(config.phase_value22);
        this.phase_value_n.push(config.phase_value23);
        this.phase_value_n.push(config.phase_value24);

        var node = this;
        mapeamentoNode = RED.nodes.getNode(this.mapeamento);

        node.on('input', function(msg, send, done) {
            var globalContext = node.context().global;
            var exportMode = globalContext.get("exportMode");
            var currentMode = globalContext.get("currentMode");
            var command = {
                type: "AC_power_source_virtual_V1_0",
                slot: parseInt(node.slot),
                method: "set_phase",
                phase_value: parseInt(node.phase_value),
                get_output: {},
                compare: {}

            };
            var file = globalContext.get("exportFile");
            var slot = globalContext.get("slot");
            if(!(slot === "begin" || slot === "end")){
                if(currentMode == "test"){
                    file.slots[slot].jig_test.push(command);
                    file = multipleSetPhase(node, file, slot, currentMode);
                }
                else{
                    file.slots[slot].jig_error.push(command);
                    file = multipleSetPhase(node, file, slot, currentMode);
                }
            }
            else{
                if(slot === "begin"){
                    file.slots[0].jig_test.push(command);
                    file = multipleSetPhase(node, file, slot, currentMode);
                }
                else{
                    file.slots[3].jig_test.push(command);
                    file = multipleSetPhase(node, file, slot, currentMode);
                }
            }
            globalContext.set("exportFile", file);
            console.log(command);
            send(msg);
        });
    }
    RED.nodes.registerType("setPhase", setPhaseNode);
};