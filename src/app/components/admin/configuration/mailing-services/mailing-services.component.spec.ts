import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailingServicesComponent } from './mailing-services.component';

describe('MailingServicesComponent', () => {
  let component: MailingServicesComponent;
  let fixture: ComponentFixture<MailingServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailingServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailingServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
