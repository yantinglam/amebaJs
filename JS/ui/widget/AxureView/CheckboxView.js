var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "../../AbstractView"], function (require, exports, AbstractView_1) {
    "use strict";
    var CheckboxView = (function (_super) {
        __extends(CheckboxView, _super);
        function CheckboxView(id, host, thisNode) {
            _super.call(this, id, host, null, thisNode);
        }
        CheckboxView.prototype.bindEvent = function (actionName, action) {
            var view = this;
            if (actionName === "onSelected") {
                this.$thisNode.on("selected", function () {
                    console.log("onSelected");
                    if (action.cases.length > 1) {
                        throw "同一事件只能有一个case";
                    }
                    else {
                        var actions = action.cases[0].actions;
                        for (var i = 0; i < actions.length; i++) {
                            view.getHost().queueTaskPack(view.getMission(actions[i].action, actions[i]));
                        }
                    }
                });
            }
            else if (actionName === "onUnselected") {
                this.$thisNode.on("unselected", function () {
                    if (action.cases.length > 1) {
                        throw "同一事件只能有一个case";
                    }
                    else {
                        var actions = action.cases[0].actions;
                        for (var i = 0; i < actions.length; i++) {
                            view.getHost().queueTaskPack(view.getMission(actions[i].action, actions[i]));
                        }
                    }
                });
            }
        };
        CheckboxView.prototype.setSize = function (size) {
            this.size = size;
        };
        CheckboxView.prototype.setLocation = function (location) {
            this.location = location;
        };
        CheckboxView.prototype.SetCheckState = function (check) {
            if (check) {
                this.$thisNode.find("input[type='checkbox']").attr("checked", "true");
            }
            else {
                this.$thisNode.find("input[type='checkbox']").removeAttr("checked");
            }
        };
        CheckboxView.prototype.layout = function (objs, objPaths) {
            var dom = $("#" + this.id);
            dom.css("position", "absolute");
            dom.css("width", this.size.width);
            dom.css("height", this.size.height);
            dom.css("left", this.location.x);
            dom.css("top", this.location.y);
            var objects = objs.objects;
            if (objects != undefined) {
                for (var i = 0; i < objects.length; i++) {
                    var idMap = objects[i].id;
                    var id = objPaths[idMap].scriptId;
                    var childDom = $("#" + id);
                    var size = objects[i].style.size;
                    var location = objects[i].style.location;
                    childDom.css("position", "absolute");
                    if (size != undefined) {
                        childDom.css("width", size.width);
                        childDom.css("height", size.height);
                    }
                    if (location != undefined) {
                        childDom.css("top", location.y - this.location.y);
                        childDom.css("left", location.x - this.location.x);
                    }
                }
            }
        };
        return CheckboxView;
    }(AbstractView_1.AbstractView));
    exports.CheckboxView = CheckboxView;
});
//# sourceMappingURL=CheckboxView.js.map