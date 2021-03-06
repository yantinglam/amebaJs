import {AbstractAxureView} from "./AbstractAxureView";
import {TadPanel} from "../../TadPanel";

class TreeView extends AbstractAxureView {

    private obj;
    private visibleLeavesNum;
    private eTargetId;

    constructor(id:string,host:TadPanel, thisNode: JQuery)
    {
        super(id,host,null, thisNode);
        this.init();
    }

    public bindEvent(actionName: string, action: string): void {
        this.bindEventToTarget($("#" + this.eTargetId), actionName, action);
    }

    public init(): void {
        let tree = this;
        $("#" + this.id + " .image").on("click", function() {
            let parentId, childrenContainer, img;

            parentId = $(this).parent().attr("id");
            childrenContainer = $("#" + parentId + "_children");
            img = $(this).find("img");
            if(childrenContainer.css("visibility") === "visible") {
                img.attr("src", (img.attr("src")).replace("_selected", ""));
                childrenContainer.css("visibility", "hidden").css("display", "none");
            } else {
                img.attr("src", (img.attr("src")).split(".")[0] + "_selected.png");
                childrenContainer.css("visibility", "visible").css("display", "block");
            }

            //重新布局
            tree.layout(tree.obj);         
        });
    }

    public layout(obj: any): void {
        let dom, childrenContainer, children, childNum;

        this.obj = obj;
        // 整体布局
        dom = $("#" + this.id);
        dom.css("position", "absolute")
            .css("width", obj.style.size.width).css("height", obj.style.size.height)
            .css("top", obj.style.location.y).css("left", obj.style.location.x);

        // 孩子节点的布局
        childrenContainer = $("#" + this.id + "_children");
        children = childrenContainer.children();
        childNum = 0;
        for(let i = 0; i < children.length; i++) {
            childNum += this.layoutChild(children[i], i + childNum);
        }
    }

    public layoutChild(obj: any, top: number): number {
        let id, dom, idMap, size, location, fontSize, interactionMap, childrenContainer;

        id = $(obj).attr("id");
        dom = $("#" + id);
        idMap = this.getIdMap(id);
        size = this.getObjInfo(idMap, this.obj.objects, "size");
        location = this.getObjInfo(idMap, this.obj.objects, "location");
        fontSize = this.getObjInfo(idMap, this.obj.objects, "fontSize");
        interactionMap = this.getObjInfo(idMap, this.obj.objects, "interactionMap");
        
        if(interactionMap != undefined) {
            this.eTargetId = id;
            for(let actionName in interactionMap) {
                this.bindEvent(actionName, interactionMap[actionName]);
            }
        }

        dom.css("position", "absolute");
        if(size != undefined) {
            dom.css("width", size.width).css("height", size.height);
        }
        if(location != undefined) {
            dom.css("top", top * 20).css("left", location.x);
        } else {
            dom.css("top", 0).css("left", 0);
        }
        if(fontSize != undefined) {
            dom.find(".text span").css("font-size", fontSize);
        }

        if(dom.find(".image").length != 0) {
            let image, selectiongroup;

            image = dom.find(".image");
            idMap = this.getIdMap(image.attr("id"));
            size = this.getObjInfo(idMap, this.obj.objects, "size");
            location = this.getObjInfo(idMap, this.obj.objects, "location");

            image.css("position", "absolute").css("cursor", "pointer");
            if(size != undefined) {
                image.css("width", size.width).css("height", size.height);
            }
            if(location != undefined) {
                image.css("top", 6).css("left", 0);
            } else {
                image.css("top", 6).css("left", 0);
            }

            selectiongroup = $(image).next();
            idMap = this.getIdMap(selectiongroup.attr("id"));
            size = this.getObjInfo(idMap, this.obj.objects, "size");
            location = this.getObjInfo(idMap, this.obj.objects, "location");

            selectiongroup.css("position", "absolute");
            if(size != undefined) {
                selectiongroup.css("width", size.width).css("height", size.height);
            }
            if(location != undefined) {
                selectiongroup.css("top", 0).css("left", 20);
            } else {
                selectiongroup.css("top", 0).css("left", 20);
            }
        } else {
            let selectiongroup = $(dom).children();
            idMap = this.getIdMap(selectiongroup.attr("id"));
            size = this.getObjInfo(idMap, this.obj.objects, "size");
            location = this.getObjInfo(idMap, this.obj.objects, "location");

            selectiongroup.css("position", "absolute");
            if(size != undefined) {
                selectiongroup.css("width", size.width).css("height", size.height);
            }
            if(location != undefined) {
                selectiongroup.css("top", 0).css("left", 20);
            } else {
                selectiongroup.css("top", 0).css("left", 20);
            }
        }

        // 孩子节点的布局
        childrenContainer = $("#" + id + "_children");
        if(childrenContainer.length != 0) {
           if(childrenContainer.css("visibility") === "hidden") {
                childrenContainer.css("display", "none");
                return 0; // 当作没孩子节点
            } else {
                let children, childNum;

                childrenContainer.css("display", "block");
                children = childrenContainer.children();
                childNum = 0;
                for(let i = 0; i < children.length; i++) {
                    childNum += this.layoutChild(children[i], i + 1 + childNum);
                }
                return children.length + childNum;
            }
        } else {
            return 0; //没有孩子节点
        }
    }

    public getObjInfo(idMap: string, objects: Array<any>, info: string): Object {
        if(idMap == undefined) {
            throw "找不到此id对应的idMap";
        }
        if(objects != undefined) {
            for(let i = 0; i < objects.length; i++) {
                if(objects[i].id === idMap) {
                    if(info === "fontSize") {
                        return objects[i].style.fontSize;
                    } else if(info === "location") {
                        return objects[i].style.location;
                    } else if(info === "size") {
                        return objects[i].style.size;
                    } else if(info === "interactionMap") {
                        return objects[i].interactionMap;
                    }
                } else {
                    let result = this.getObjInfo(idMap, objects[i].objects, info);
                    if(result != undefined) {
                        return result;
                    }
                }
            }
        } 
    }

    public getIdMap(id): string {
        let objPaths = this.host.getAxureObjPaths();
        for(let idMap in objPaths) {
            if(objPaths[idMap].scriptId === id) {
                return idMap;
            }
        }
        return undefined;
    }
}

export {TreeView};