import { Component } from '@angular/core';
import { DataService } from "./data.service";
import { stringify } from '@angular/compiler/src/util';
import { CookieService } from 'ngx-cookie-service';
import { Meta } from '@angular/platform-browser';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
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
  graphId = [];
  pagination = 0;
  graphVote = [];
  name = "Angular";
  public lineChartData: ChartDataSets[] = [
    // { data: [65, 59, 80, 81, 56, 55, 40] },
  ];
  public lineChartLabels: Label[] = [
    // 'January', 'February', 'March', 'April', 'May', 'June', 'July'
  ];
  public lineChartOptions: (any & { annotation: any }) = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'transparent',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  getSourceName = (url: string) => {
    return (url.split('//')[1].split('/')[0].split('.').splice(1).join('.'))
  }
  constructor(private appService: DataService, private cookieService: CookieService, private meta: Meta) {
    this.meta.addTag({ name: 'description', content: 'Hacker news' });
    this.meta.addTag({ name: 'author', content: 'Babandeep Singh' });
    this.meta.addTag({ name: 'keywords', content: 'Angular, hacker, hackers, news, hackers news, ycombinator, algolia' });
  }
  ngOnInit() {
    this.appService
      .sendGetRequest()
      .subscribe(data => {
        this.loader = false
        this.apiRes = data;
        this.hits = this.apiRes.hits.filter(hits => hits.title != null && hits.url)
        this.getChartData();
      });

  }

  hitApi = (page: number) => {
    this.appService.sendGetRequestPage(this.name ? this.name : '', page)
      .subscribe(data => {
        this.loader = false
        this.apiRes = data;
        this.hits = this.apiRes.hits.filter(hits => hits.title != null && hits.url)
        this.graphId = []
        this.graphVote = []
        this.getChartData()
      });

  }
  buttonPagination = () => {
    this.pagination = this.pagination + 1;
    const pagePassed = this.pagination;
    this.loader = true;
    this.hitApi(pagePassed);

  }
  buttonPaginationBack = () => {
    this.pagination = this.pagination - 1;
    const pagePassed = this.pagination;
    this.loader = true;
    this.hitApi(pagePassed);
  }
  clickedUpCount = (id: string) => {
    const exist = this.cookieService.check(id);
    if (exist) {
      const value = this.cookieService.get(id);
      this.cookieService.set(id, (parseInt(value) + 1).toString())
    }
    else {
      const n: number = 1;
      this.cookieService.set(id, '1')
      // console.log(this.cookieService.get(id))
    }
    this.graphId = []
    this.graphVote = []
    this.getChartData()
  }
  getUpVote = (id: string) => {
    const value = this.cookieService.get(id);
    // console.log(id+'::'+value);
    if (value || value == '0') {
      const result = this.cookieService.get(id);
      return result
    }
    else {
      this.cookieService.set(id, '0')
      return this.cookieService.get(id);
    }

  }

  getChartData = () => {
    this.lineChartData = [];
    this.lineChartLabels = [];
    this.hits.map((hit) => {
      this.graphId.push(hit.objectID)
      const value = this.cookieService.get(hit.objectID);
      if (value || value == '0') {
        // const result = this.cookieService.get(hit.objectID);
        // return result
        this.graphVote.push(this.cookieService.get(hit.objectID));
      }
      else {
        this.cookieService.set(hit.objectID, '0')
        // return this.cookieService.get(hit.objectID);
        this.graphVote.push(this.cookieService.get(hit.objectID));
      }
    })
    console.log(this.graphId)
    console.log(this.graphVote)

    this.lineChartData = [
      { data: this.graphVote, label: 'Vite' },
    ]
    this.lineChartLabels = this.graphId
  }
}
