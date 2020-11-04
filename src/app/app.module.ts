defineLocale('es', esLocale);
registerLocaleData(localeEs);
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundPageComponent } from './components/shared/not-found-page/not-found-page.component';
import { MenuAdminComponent } from './components/admin/menu-admin/menu-admin.component';
import { MastersComponent } from './components/admin/configuration/masters/masters.component';
import { LoginAdminComponent } from './components/admin/login-admin/login-admin.component';
import { MasterAdminModule } from './components/admin/master-admin/master-admin.module';
import { MasterAdminComponent } from './components/admin/master-admin/master-admin.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NotificationsComponent } from './components/admin/configuration/notifications/notifications.component';
import { ComissionsComponent } from './components/admin/configuration/comissions/comissions.component';
import { PaymentGatewayComponent } from './components/admin/configuration/payment-gateway/payment-gateway.component';
import { TermsAndConditionsComponent } from './components/admin/configuration/terms-and-conditions/terms-and-conditions.component';
import { ResolutionInvoicingsComponent } from './components/admin/configuration/resolution-invoicings/resolution-invoicings.component';
import { MailingServicesComponent } from './components/admin/configuration/mailing-services/mailing-services.component';
import { LoaderComponent } from './components/shared/loader/loader.component';
import { RouteReuseStrategy } from '@angular/router';
import { LoaderService } from './services/loader.service';
import { DialogService } from './services/dialog.service';
import { SessionService } from './services/session.service';
import { DatePipe } from '@angular/common';
import { HttpConfigInterceptor } from './interceptors/httpconfig.interceptor';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomSelectComponent } from './components/shared/components/custom-select/custom-select.component';
import { CommerceTypesComponent } from './components/admin/configuration/masters/commerce-types/commerce-types.component';
import { ServiceTypesComponent } from './components/admin/configuration/masters/service-types/service-types.component';
import { CountriesComponent } from './components/admin/configuration/masters/countries/countries.component';
import { DepartmentsComponent } from './components/admin/configuration/masters/departments/departments.component';
import { CitiesComponent } from './components/admin/configuration/masters/cities/cities.component';
import { NeighborhoodsComponent } from './components/admin/configuration/masters/neighborhoods/neighborhoods.component';
import { CurrencyTypesComponent } from './components/admin/configuration/masters/currency-types/currency-types.component';
import { CustomCurrencyPipe } from './pipes/custom-currency.pipe';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CustomFilterPipe } from './pipes/custom-filter.pipe';
import { CustomDatatableComponent } from './components/shared/custom-datatable/custom-datatable.component';
import { CustomDatatableModule } from './components/shared/custom-datatable/custom-datatable.module';
import { OrderModule } from 'ngx-order-pipe';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { RegisterCommerceComponent } from './components/admin/commerce/register-commerce/register-commerce.component';
import { RegisterServiceComponent } from './components/admin/commerce/register-service/register-service.component';
import { HistoryRequestCommerceComponent } from './components/admin/commerce/register-commerce/history-request-commerce/history-request-commerce.component';
import { HistoryRequestServiceComponent } from './components/admin/commerce/register-service/history-request-service/history-request-service.component';
import { TicketsSupportComponent } from './components/admin/support/tickets-support/tickets-support.component';
import { DetailTicketsSupportComponent } from './components/admin/support/detail-tickets-support/detail-tickets-support.component';
import { SupportComponent } from './components/admin/support/support.component';
import { ActivateAccountComponent } from './components/shared/activate-account/activate-account.component';
import { RestorePasswordComponent } from './components/shared/restore-password/restore-password.component';
import { QuesAnswHelpCenterComponent } from './components/admin/help-center/ques-answ-help-center/ques-answ-help-center.component';
import { TopicsHelpCenterComponent } from './components/admin/help-center/topics-help-center/topics-help-center.component';
import { TicketsSupportCommerceComponent } from './components/admin/support/tickets-support-commerce/tickets-support-commerce.component';
import { BanksComponent } from './components/admin/configuration/masters/banks/banks.component';
import { PayuCollectComponent } from './components/admin/payu-collect/payu-collect.component';
import { CustomersComponent } from './components/admin/customers/customers.component';
import { PaymentReportsComponent } from './components/admin/reports/payment-reports/payment-reports.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginAdminComponent,
    NotFoundPageComponent,
    MenuAdminComponent,
    MasterAdminComponent,
    MastersComponent,
    NotificationsComponent,
    ComissionsComponent,
    PaymentGatewayComponent,
    TermsAndConditionsComponent,
    ResolutionInvoicingsComponent,
    MailingServicesComponent,
    LoaderComponent,
    CustomSelectComponent,
    CommerceTypesComponent,
    ServiceTypesComponent,
    CountriesComponent,
    DepartmentsComponent,
    CitiesComponent,
    NeighborhoodsComponent,
    CurrencyTypesComponent,
    CustomCurrencyPipe,
    CustomFilterPipe,
    CustomDatatableComponent,
    RegisterCommerceComponent,
    RegisterServiceComponent,
    HistoryRequestCommerceComponent,
    HistoryRequestServiceComponent,
    TicketsSupportComponent,
    DetailTicketsSupportComponent,
    SupportComponent,
    ActivateAccountComponent,
    RestorePasswordComponent,
    TopicsHelpCenterComponent,
    QuesAnswHelpCenterComponent,
    TicketsSupportCommerceComponent,
    BanksComponent,
    PayuCollectComponent,
    CustomersComponent,
    PaymentReportsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MasterAdminModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PopoverModule.forRoot(), ModalModule.forRoot(), BsDatepickerModule.forRoot(), TooltipModule.forRoot(),
    TimepickerModule.forRoot(), PaginationModule.forRoot(), TooltipModule.forRoot(),
    CustomDatatableModule,
    OrderModule,
    AngularEditorModule
  ],
  providers: [
    LoaderService,
    DialogService,
    SessionService,
    BsLocaleService,

    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    DatePipe,
    { provide: LOCALE_ID, useValue: 'es-CO' }
  ],
  exports: [
    CustomSelectComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
