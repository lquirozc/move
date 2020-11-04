import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundPageComponent } from './components/shared/not-found-page/not-found-page.component';
import { LoginAdminComponent } from './components/admin/login-admin/login-admin.component';
import { MasterAdminComponent } from './components/admin/master-admin/master-admin.component';
import { MastersComponent } from './components/admin/configuration/masters/masters.component';
import { MenuAdminComponent } from './components/admin/menu-admin/menu-admin.component';
import { NotificationsComponent } from './components/admin/configuration/notifications/notifications.component';
import { ComissionsComponent } from './components/admin/configuration/comissions/comissions.component';
import { PaymentGatewayComponent } from './components/admin/configuration/payment-gateway/payment-gateway.component';
import { TermsAndConditionsComponent } from './components/admin/configuration/terms-and-conditions/terms-and-conditions.component';
import { ResolutionInvoicingsComponent } from './components/admin/configuration/resolution-invoicings/resolution-invoicings.component';
import { MailingServicesComponent } from './components/admin/configuration/mailing-services/mailing-services.component';
import { RegisterCommerceComponent } from './components/admin/commerce/register-commerce/register-commerce.component';
import { RegisterServiceComponent } from './components/admin/commerce/register-service/register-service.component';
import { SupportComponent } from './components/admin/support/support.component';
import { ActivateAccountComponent } from './components/shared/activate-account/activate-account.component';
import { RestorePasswordComponent } from './components/shared/restore-password/restore-password.component';
import { TopicsHelpCenterComponent } from './components/admin/help-center/topics-help-center/topics-help-center.component';
import { QuesAnswHelpCenterComponent } from './components/admin/help-center/ques-answ-help-center/ques-answ-help-center.component';
import { DetailTicketsSupportComponent } from './components/admin/support/detail-tickets-support/detail-tickets-support.component';
import { TicketsSupportComponent } from './components/admin/support/tickets-support/tickets-support.component';
import { TicketsSupportCommerceComponent } from './components/admin/support/tickets-support-commerce/tickets-support-commerce.component';
import { PayuCollectComponent } from './components/admin/payu-collect/payu-collect.component';
import { PaymentReportsComponent } from './components/admin/reports/payment-reports/payment-reports.component';
import { CustomersComponent } from './components/admin/customers/customers.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginAdminComponent
  },
  {
    path: 'menu',
    component: MenuAdminComponent
  },
  {
    path: 'activate/:type/:userId',
    component: ActivateAccountComponent
  },
  {
    path: 'restore/:type/:userId',
    component: RestorePasswordComponent
  },
  {
    path: 'admin/masters',
    component: MasterAdminComponent,
    children: [
      {
        outlet: 'master',
        path: '',
        component: MastersComponent
      }
    ]
  },
  {
    path: 'admin/notifications',
    component: MasterAdminComponent,
    children: [
      {
        outlet: 'master',
        path: '',
        component: NotificationsComponent
      }
    ]
  },
  {
    path: 'admin/comissions',
    component: MasterAdminComponent,
    children: [
      {
        outlet: 'master',
        path: '',
        component: ComissionsComponent
      }
    ]
  },
  {
    path: 'admin/payment-gateway',
    component: MasterAdminComponent,
    children: [
      {
        outlet: 'master',
        path: '',
        component: PaymentGatewayComponent
      }
    ]
  },
  {
    path: 'admin/terms',
    component: MasterAdminComponent,
    children: [
      {
        outlet: 'master',
        path: '',
        component: TermsAndConditionsComponent
      }
    ]
  },
  {
    path: 'admin/resolution-invoicing',
    component: MasterAdminComponent,
    children: [
      {
        outlet: 'master',
        path: '',
        component: ResolutionInvoicingsComponent
      }
    ]
  },
  {
    path: 'admin/mailing',
    component: MasterAdminComponent,
    children: [
      {
        outlet: 'master',
        path: '',
        component: MailingServicesComponent
      }
    ]
  },
  {
    path: 'admin/register-commerce',
    component: MasterAdminComponent,
    children: [
      {
        outlet: 'master',
        path: '',
        component: RegisterCommerceComponent
      }
    ]
  },
  {
    path: 'admin/register-service',
    component: MasterAdminComponent,
    children: [
      {
        outlet: 'master',
        path: '',
        component: RegisterServiceComponent
      }
    ]
  },
  {
    path: 'admin/topics-help-center',
    component: MasterAdminComponent,
    children: [
      {
        outlet: 'master',
        path: '',
        component: TopicsHelpCenterComponent
      }
    ]
  },
  {
    path: 'admin/ques-answ-help-center',
    component: MasterAdminComponent,
    children: [
      {
        outlet: 'master',
        path: '',
        component: QuesAnswHelpCenterComponent
      }
    ]
  },
  {
    path: 'admin/tickets-support',
    component: MasterAdminComponent,
    children: [
      {
        outlet: 'master',
        path: '',
        component: TicketsSupportComponent
      }
    ]
  },
  {
    path: 'admin/tickets-support-commerce',
    component: MasterAdminComponent,
    children: [
      {
        outlet: 'master',
        path: '',
        component: TicketsSupportCommerceComponent
      }
    ]
  },
  {
    path: 'admin/detail-tickets-support',
    component: MasterAdminComponent,
    children: [
      {
        outlet: 'master',
        path: '',
        component: DetailTicketsSupportComponent
      }
    ]
  },
  {
    path: 'admin/customers',
    component: MasterAdminComponent,
    children: [
      {
        outlet: 'master',
        path: '',
        component: CustomersComponent
      }
    ]
  },
  {
    path: 'admin/reports/payment-reports',
    component: MasterAdminComponent,
    children: [
      {
        outlet: 'master',
        path: '',
        component: PaymentReportsComponent
      }
    ]
  },
  {
    path: 'admin/payu-collect',
    component: PayuCollectComponent,
    children: [
      {
        outlet: 'master',
        path: '',
        component: PayuCollectComponent
      }
    ]
  },
  
  //Don't touch this code
  {
    path: '**',
    component: NotFoundPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
