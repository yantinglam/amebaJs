var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./AbstractAxureView", "../../eventpub/Event"], function (require, exports, AbstractAxureView_1, Event_1) {
    "use strict";
    var TableView = (function (_super) {
        __extends(TableView, _super);
        function TableView(id, host, thisNode) {
            _super.call(this, id, host, null, thisNode);
        }
        TableView.prototype.bindEvent = function (actionName, action) {
            this.bindEventToTarget($("#" + this.eTargetId), actionName, action);
        };
        TableView.prototype.SetCheckState = function (value) {
            var targetId, target;
            if (this.eTargetId) {
                targetId = this.eTargetId;
            }
            else {
                targetId = this.id;
            }
            target = $("#" + targetId);
            if (value === "true") {
                target.addClass("selected");
                if (Event_1.AEvent.checkEventIsExsit(targetId, "onSelect")) {
                    Event_1.AEvent.fireEvent(targetId, "onSelect");
                }
            }
            else if (value === "false") {
                target.removeClass("selected");
                if (Event_1.AEvent.checkEventIsExsit(targetId, "onUnselect")) {
                    Event_1.AEvent.fireEvent(targetId, "onUnselect");
                }
            }
            else {
                if (target.hasClass("selected")) {
                    target.removeClass("selected");
                    if (Event_1.AEvent.checkEventIsExsit(targetId, "onUnselect")) {
                        Event_1.AEvent.fireEvent(targetId, "onUnselect");
                    }
                }
                else {
                    target.addClass("selected");
                    if (Event_1.AEvent.checkEventIsExsit(targetId, "onSelect")) {
                        Event_1.AEvent.fireEvent(targetId, "onSelect");
                    }
                }
            }
        };
        TableView.prototype.GetWidgetText = function () {
            return $("#" + this.eTargetId + " .text span").text();
        };
        TableView.prototype.layout = function (obj) {
            var dom, objects;
            dom = $("#" + this.id);
            dom.css("position", "absolute")
                .css("width", obj.style.size.width).css("height", obj.style.size.height)
                .css("left", obj.style.location.x).css("top", obj.style.location.y);
            objects = obj.objects;
            if (objects != undefined) {
                for (var i = 0; i < objects.length; i++) {
                    this.layoutChild(objects[i]);
                }
            }
        };
        TableView.prototype.layoutChild = function (obj) {
            var objPaths, idMap, id, childDom, size, location, interactionMap, objects;
            objPaths = this.host.getAxureObjPaths();
            idMap = obj.id;
            id = objPaths[idMap].scriptId;
            childDom = $("#" + id);
            size = obj.style.size;
            location = obj.style.location;
            interactionMap = obj.interactionMap; // 表格单元的事件
            if (interactionMap != undefined) {
                this.eTargetId = id;
                for (var actionName in interactionMap) {
                    this.bindEvent(actionName, interactionMap[actionName]);
                }
            }
            childDom.css("position", "absolute");
            if (size != undefined) {
                childDom.css("width", size.width).css("height", size.height);
            }
            if (obj.type === "richTextPanel") {
                childDom.css("top", 0).css("left", 0);
                $(childDom.find("p")[0]).css("line-height", size.height + "px");
            }
            else if (location != undefined) {
                childDom.css("top", location.y).css("left", location.x);
            }
            if (obj.style.fontSize != undefined) {
                childDom.find(".text span").css("font-size", obj.style.fontSize);
            }
            objects = obj.objects;
            if (objects != undefined) {
                for (var i = 0; i < objects.length; i++) {
                    this.layoutChild(objects[i]);
                }
            }
        };
        return TableView;
    }(AbstractAxureView_1.AbstractAxureView));
    exports.TableView = TableView;
});
//# sourceMappingURL=TableView.js.map