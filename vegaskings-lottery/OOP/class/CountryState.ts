  export class CountryState {
    public country: string
    public state: string

    constructor(state:string,country:string){
      this.country = country;
      this.state = state;
    }
  }