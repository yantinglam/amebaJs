import {AbstractView} from "../../AbstractView";
import {TadPanel} from "../../TadPanel";

class HtmlButtonView extends AbstractView {

    constructor(id:string,host:TadPanel, thisNode: JQuery)
    {
        super(id,host,null, thisNode);
    }

    public bindEvent(actionName: string, action: string): void {
        if(actionName === "onClick") {
            this.$thisNode.css("cursor", "pointer");
            this.$thisNode.on("click", function() {
                console.log("onClick");
            });
        }
    }

    public layout(obj): void {
        var dom = $("#" + this.id);
        dom.css("position", "absolute")
            .css("width", obj.style.size.width).css("height", obj.style.size.height)
            .css("left", obj.style.location.x).css("top", obj.style.location.y);
        
        var input = $("#" + this.id + "_input");
        input.css("width", "inherit").css("height", "inherit");
        if(obj.style.fontSize != undefined) {
            input.css("font-size", obj.style.fontSize);
        }
    }
}

export {HtmlButtonView};