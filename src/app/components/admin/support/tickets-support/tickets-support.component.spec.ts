import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsSupportComponent } from './tickets-support.component';

describe('TicketsSupportComponent', () => {
  let component: TicketsSupportComponent;
  let fixture: ComponentFixture<TicketsSupportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketsSupportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
