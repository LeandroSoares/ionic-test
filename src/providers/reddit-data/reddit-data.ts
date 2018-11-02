import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

/*
  Generated class for the RedditDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RedditDataProvider {
    private url: string = "https://www.reddit.com/new.json";
    constructor(public http: HttpClient) {}

    getRemoteData(params?: { key: string; value: string }): Promise<any> {
        let fullurl = this.url;
        if (params) {
            fullurl = this.url + "?" + params.key + "=" + params.value;
        }
        return new Promise((resolve, reject) => {
            this.http.get(fullurl).subscribe(
                data => {
                    resolve(data);
                },
                error => {
                    reject(error);
                }
            );
        });
    }
}
