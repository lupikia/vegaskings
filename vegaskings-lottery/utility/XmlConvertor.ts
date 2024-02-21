import parser, { XMLParser } from 'fast-xml-parser';

export class XmlConvertor {

    private _parser:XMLParser
    constructor(){
       this._parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix : "",
        allowBooleanAttributes: true
    });
    }

    getConvertToJSON(data:string): any {
        return this._parser.parse(data);
    }
}