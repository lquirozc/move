import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsSupportCommerceComponent } from './tickets-support-commerce.component';

describe('TicketsSupportCommerceComponent', () => {
  let component: TicketsSupportCommerceComponent;
  let fixture: ComponentFixture<TicketsSupportCommerceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketsSupportCommerceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsSupportCommerceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
