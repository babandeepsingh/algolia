import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private PATH_BASE = "https://hn.algolia.com/api/v1/search";
  private PATH_SEARCH = "?query=";
  private PARAM_SEARCH = "page=";
  constructor(private httpClient: HttpClient) { }
  public sendGetRequest() {
    return this.httpClient.get('https://hn.algolia.com/api/v1/search?query=&page=0')
  }
  public sendGetRequestPage(query:string, page:number) {
    return this.httpClient.get(`${this.PATH_BASE}${this.PATH_SEARCH}&${this.PARAM_SEARCH}${page}`)
  }
}
