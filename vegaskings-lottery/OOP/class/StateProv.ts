import { Game } from "../interface/Game";

export class StateProv {

    game: Game[];
    stateprov_name: string;
    stateprov_id: string;
    country: string;

    constructor(obj:StateProv){
        this.game = obj?.game;
        this.stateprov_name =  obj?.stateprov_name;
        this.stateprov_id =  obj?.stateprov_id;
        this.country =  obj?.country;
    }
  }