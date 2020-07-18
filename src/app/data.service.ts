import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private httpClient: HttpClient) { }
  public sendGetRequest() {
    return this.httpClient.get('https://hn.algolia.com/api/v1/search?query=&page=0')
  }
}
