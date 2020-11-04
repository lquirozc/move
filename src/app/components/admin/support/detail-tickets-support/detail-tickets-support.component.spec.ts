import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTicketsSupportComponent } from './detail-tickets-support.component';

describe('DetailTicketsSupportComponent', () => {
  let component: DetailTicketsSupportComponent;
  let fixture: ComponentFixture<DetailTicketsSupportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailTicketsSupportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTicketsSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
