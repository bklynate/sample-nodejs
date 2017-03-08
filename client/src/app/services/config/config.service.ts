import {Injectable} from '@angular/core';

@Injectable()
export class ConfigService {

    restHost:string = 'http://localhost:';
    restPort: string = '9001';

    restAPIString: string = this.restHost + this.restPort;

};
