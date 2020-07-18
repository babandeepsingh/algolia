import { Component } from '@angular/core';
import { DataService } from "./data.service";
import { stringify } from '@angular/compiler/src/util';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'algolia';
  loader = true;
  apiRes: any = {};
  hits = [];
  name = "Angular";
  paginationPages = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]

  getSourceName = (url: string) => {
    return (url.split('//')[1].split('/')[0].split('.').splice(1).join('.'))
  }
  constructor(private appService: DataService, private cookieService: CookieService){}
  ngOnInit() {
    this.appService
      .sendGetRequest()
      .subscribe(data => {
        this.loader = false
        this.apiRes = data;
        this.hits = this.apiRes.hits.filter(hits => hits.title != null && hits.url)
      });
  }
  hitApi = (page:number) => {
    this.appService.sendGetRequestPage(this.name ? this.name : '', page)
      .subscribe(data => {
        this.loader = false
        this.apiRes = data;
        this.hits = this.apiRes.hits.filter(hits => hits.title != null && hits.url)
      });
  }
  buttonPagination = (pagePassed: number) => {
    this.loader = true
    this.hitApi(pagePassed);
  }
  clickedUpCount = (id:string) => {
    const exist = this.cookieService.check(id);
    if (exist) {
      const value = this.cookieService.get(id);
      this.cookieService.set(id, (parseInt(value) + 1).toString())
    }
    else {
      const n: number = 1;
      this.cookieService.set(id, '1')
      console.log(this.cookieService.get(id))
    }
  }
  getUpVote = (id:string) => {
      const value = this.cookieService.get(id);
      console.log(id+'::'+value);
      if(value || value == '0'){
        const result = this.cookieService.get(id);
        return result
      }
      else{
        this.cookieService.set(id, '0')
        return this.cookieService.get(id);
      }
  }
}
