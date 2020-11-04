import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryRequestCommerceComponent } from './history-request-commerce.component';

describe('HistoryRequestCommerceComponent', () => {
  let component: HistoryRequestCommerceComponent;
  let fixture: ComponentFixture<HistoryRequestCommerceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryRequestCommerceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryRequestCommerceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
