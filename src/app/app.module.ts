import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { NotificationsModule } from './notifications/notifications.module';
import { OrderModule } from './order/order.module';
import { OrdersModule } from './orders/orders.module';
import { MyOrdersModule } from './my-orders/my-orders.module';

import { AuthService } from './auth/auth.service';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireFunctionsModule } from 'angularfire2/functions';
import { environment } from '../environments/environment';

import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule, SwPush, SwUpdate } from '@angular/service-worker';
import { MatSnackBarModule } from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AdminGuard } from './auth/admin.guard';
import { AuthGuard } from './auth/auth.guard';
import { WorkplaceGuard } from './auth/workplace.guard';
import { UpdateService } from './update.service';

@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFirestoreModule.enablePersistence(),
    AngularFireFunctionsModule,
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    HttpClientModule,
    SharedModule,
    NotificationsModule,
    CoreModule,
    MyOrdersModule,
    OrderModule,
    OrdersModule,
    AuthModule,
    AdminModule,
    AppRoutingModule,
    MatSnackBarModule,
    ServiceWorkerModule.register('/combined-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [UpdateService, AuthService, AuthGuard, WorkplaceGuard, AdminGuard]
})

export class AppModule {
}
