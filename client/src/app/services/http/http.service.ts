import {Injectable} from '@angular/core';
import {Http, Response, Request,RequestMethod, Headers} from '@angular/http';
//import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable()
export class Httpprovider {
    cities: Response;
    http: Http;
    constructor(http: Http){
        this.http = http;
    }
    httpReq(url: string, method: string, data: any, header: string){
        var methods: any;
        let headers = new Headers();
        if (header === 'http') {
            headers.append('Content-Type', 'text/html');
        } else {
            headers.append('Content-Type', 'application/json');
        }

        if (method === 'GET'){ 
            methods = RequestMethod.Get
        } 
        else if (method === 'POST'){ 
            methods = RequestMethod.Post
        }
        else if (method === 'PUT'){
            methods = RequestMethod.Put
        }
        else if (method === 'PATCH'){
            methods = RequestMethod.Patch
        } 
        else if (method === 'DELETE'){
            methods = RequestMethod.Delete
        }
        else {
            methods = RequestMethod.Get
        };

        return this.http.request(new Request({
                    method: methods,
                    url: url,
                    body: JSON.stringify(data),
                    headers: headers
                })).map(res => res.json());
    }

}