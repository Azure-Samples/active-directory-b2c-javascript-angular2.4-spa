import { Injectable }     from '@angular/core';
import { Http }           from '@angular/http';

@Injectable()
export class TodoService {

    constructor(private http: Http) {}

    getItems(config: any): any {
        return this.http
                .get('https://aadb2cplayground.azurewebsites.net/api/Tasks', config);
    }

    postItem(item: any, config: any): any {
        return this.http
                .post('https://aadb2cplayground.azurewebsites.net/api/Tasks/', item, config);
    }

    deleteItem(id: number, config: any): any {
        return this.http
                .delete('https://aadb2cplayground.azurewebsites.net/api/Tasks/' + id, config);
    }
}
