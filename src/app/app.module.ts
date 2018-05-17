import { MessagingModule } from './messaging/messaging.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';

import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireFunctionsModule } from 'angularfire2/functions';
import { environment } from '../environments/environment';

import { NotificationsModule } from './notifications/notifications.module';
import { OrderModule } from './order/order.module';
import { WorkplaceGuard } from './auth/workplace.guard';
import { OrdersModule } from './orders/orders.module';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFirestoreModule
    .enablePersistence()
    ,
    AngularFireFunctionsModule,
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    HttpClientModule,
    SharedModule,
    MessagingModule,
    NotificationsModule,
    CoreModule,
    OrderModule,
    OrdersModule,
    AuthModule,
    AdminModule,
    AppRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [AuthService, AuthGuard, WorkplaceGuard]
})
export class AppModule {
  // constructor() {
  //   AngularFireModule.initializeApp(environment.firebase);
  // }
}
