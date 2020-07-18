import { Component } from '@angular/core';
import { DataService } from "./data.service";

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
  getSourceName = (url: string) => {
    return (url.split('//')[1].split('/')[0].split('.').splice(1).join('.'))
  }
  constructor(private appService: DataService){}
  ngOnInit() {
    this.appService
      .sendGetRequest()
      .subscribe(data => {
        this.loader = false
        this.apiRes = data;
        this.hits = this.apiRes.hits.filter(hits => hits.title != null && hits.url)
      });
  }
}
