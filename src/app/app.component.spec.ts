import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DataService } from "./data.service";
describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let h1: HTMLElement;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('testing initially', () =>
    expect('hello test').toBe('hello test')
  );
  it('testing component loader', () =>
    expect(component.loader).toBe(true)
  )
  it('testing component hits', () =>
    expect(component.hits).toBeTruthy
  )
  it('testing component hits length', () =>
    expect(component.hits.length).toBe(0)
  )
  it('testing website', () =>
    expect(component.getSourceName('https://codecraft.tv/'))
  )
});
