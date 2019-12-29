import Module from "./Module";
import EventBase from './EventBase';
import AntiDelete from "./modules/AntiDelete";
import { Client } from "discord.js";

export default class ModuleHandler {
    readonly modules: Map<String, Module> = new Map();
    
    constructor(dsClient: Client){   
        this.addModule(new AntiDelete(dsClient))
    }

    public addModule(m: Module){
        this.modules.set(m.name, m);
        if(this.isEvent(m)){
            (m as EventBase).handleEvent();
        }
    }

    private isEvent(m : any) : m is EventBase {
        return m.handleEvent() !== undefined;
    }
}

