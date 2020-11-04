import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryRequestServiceComponent } from './history-request-service.component';

describe('HistoryRequestServiceComponent', () => {
  let component: HistoryRequestServiceComponent;
  let fixture: ComponentFixture<HistoryRequestServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryRequestServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryRequestServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
