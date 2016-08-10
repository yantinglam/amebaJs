import {AbstractView} from "../AbstractView";
import {TadPanel} from "../TadPanel";
/**
 * Created by Oliver on 2016-08-09 0009.
 */
export class ButtonView extends AbstractView {

    constructor(id:string,host:TadPanel, thisNode: JQuery)
    {
        super(id,host,thisNode);
    }

    bindEvent(eventType:string,flowType:string,path:string):void{
        var view = this; //避免this指代错误
        if(eventType === "click")
        {
            view.getNode().on("click",function(){
                alert("click");
                view.getHost().queueTaskPack(view.getMission(flowType,path));
            });
        }

    }

    public modelChanged(val:any):void {

    };
    public updateModel(val:any):void {

    };
}