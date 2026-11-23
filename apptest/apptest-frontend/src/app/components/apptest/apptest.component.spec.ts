import {ComponentFixture, TestBed} from '@angular/core/testing';
import { ApptestComponent} from "./Apptest.component";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {Observable, of} from "rxjs";

describe('ApptestComponent', () => {
  let fixture: ComponentFixture<ApptestComponent>;
  let component: ApptestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApptestComponent],
      imports: [TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader, useValue: {
            getTranslation(): Observable<Record<string, string>> {
              return of({});
            }
          }
        }
      })],
    }).compileComponents();

    fixture = TestBed.createComponent(ApptestComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
