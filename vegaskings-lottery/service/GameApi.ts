export class GameApi{

    private _gamesXml: string='';
    private _headers = new Headers();
    constructor(){
        this._headers.append("Content-Type", "application/x-www-form-urlencoded;charset=utf-8;");
    }

    /**
     * Function to get games from API
     * @returns boolean
     */
    async getGames():Promise<boolean>{

       await fetch("http://www.lotterynumbersxml.com/lotterydata/ashley@fwmedia.io-test/6aturu8y3/lottery.xml",  {
            method: 'GET',
            headers: this._headers})
            .then(response =>  response.text())
            .then(result => this._gamesXml = result);
        return true;
    }

    /**
     * list of games as string returned to use for further use
     * @returns string
     */
     getGamesXml():string{

        return this._gamesXml;
    }
}