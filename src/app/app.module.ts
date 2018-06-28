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
import { ServiceWorkerModule, SwPush, SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminGuard } from './auth/admin.guard';


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
    OrderModule,
    OrdersModule,
    AuthModule,
    AdminModule,
    AppRoutingModule,
    ServiceWorkerModule.register('/combined-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [AuthService, AuthGuard, WorkplaceGuard, AdminGuard]
})

export class AppModule {

  constructor(update: SwUpdate, push: SwPush, snackbar: MatSnackBar) {
    update.available.subscribe(update => {
      console.log('update available');
      const snack = snackbar.open('Actualización disponible', 'Actualizar');

      snack.onAction()
        .subscribe(() => {
          window.location.reload();
        });
    });
    push.messages.subscribe(msg => {
      console.log(msg);
      snackbar.open(JSON.stringify(msg));
    });
  }
}
