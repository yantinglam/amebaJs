import {AbstractView} from "../../AbstractView";
import {TadPanel} from "../../TadPanel";

class LabelView extends AbstractView {

    constructor(id:string,host:TadPanel, thisNode: JQuery)
    {
        super(id,host,null, thisNode);
    }

    public bindEvent(actionName: string, action: string): void {
    }

    public layout(obj): void {
        var dom = $("#" + this.id);
        dom.css("position", "absolute")
            .css("width", obj.style.size.width).css("height", obj.style.size.height)
            .css("left", obj.style.location.x).css("top", obj.style.location.y);

        if(obj.style.fontSize != undefined) {
            dom.find(".text span").css("font-size", obj.style.fontSize);
        }
    }
}

export {LabelView};