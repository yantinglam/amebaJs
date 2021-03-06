define(["require", "exports", "../lib/HashMap", "./commandhandlers/OpenPanel", "../const/EngineEvent", "../const/ServiceObj", "./commandhandlers/ShowMessage", "./commandhandlers/ControllerCallMethod"], function (require, exports, HashMap_1, OpenPanel_1, EngineEvent_1, ServiceObj_1, ShowMessage_1, ControllerCallMethod_1) {
    "use strict";
    var CommandHandlerExecutor = (function () {
        function CommandHandlerExecutor() {
            this.handlers = new HashMap_1.HashMap();
            this.handleEvent = function (command) {
                // let ctx : Context = data.context;
                if (command.getContext() == null) {
                    return;
                }
                var executor = command.getContext().get(ServiceObj_1.ServiceObj.CommandHandlerExecutor);
                // let command = new Command(data.msg,data);
                executor.execute(command, command.getCallback());
            };
            this.registerCommandHandler(EngineEvent_1.EngineEvent.COMMAND_OpenPanel, new OpenPanel_1.OpenPanel());
            this.registerCommandHandler(EngineEvent_1.EngineEvent.COMMAND_ShowMessage, new ShowMessage_1.ShowMessage());
            this.registerCommandHandler(EngineEvent_1.EngineEvent.COMMAND_ControllerCallMethod, new ControllerCallMethod_1.ControllerCallMethod());
        }
        CommandHandlerExecutor.prototype.registerCommandHandler = function (name, handler) {
            this.handlers.put(name, handler);
        };
        CommandHandlerExecutor.prototype.getCommandHandler = function (name) {
            return this.handlers.get(name);
        };
        CommandHandlerExecutor.prototype.execute = function (command, callback) {
            var handler = this.handlers.get(command.getName());
            handler.handleCommand(command, callback);
        };
        return CommandHandlerExecutor;
    }());
    exports.CommandHandlerExecutor = CommandHandlerExecutor;
});
//# sourceMappingURL=CommandHandlerExecutor.js.map