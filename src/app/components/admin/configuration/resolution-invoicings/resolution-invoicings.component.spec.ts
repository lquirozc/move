import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolutionInvoicingsComponent } from './resolution-invoicings.component';

describe('ResolutionInvoicingsComponent', () => {
  let component: ResolutionInvoicingsComponent;
  let fixture: ComponentFixture<ResolutionInvoicingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolutionInvoicingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolutionInvoicingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
