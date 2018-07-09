import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebaseApp from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { User } from '../shared/classes/user';
import { Link } from '../shared/classes/link';
import { SignIn } from '../shared/classes/sign-in';
import { SignUp } from '../shared/classes/sign-up';

import { NotificationsService } from '../notifications/notifications.service';

import { Observable, Subject, BehaviorSubject, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  user: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private notificationsService: NotificationsService
  ) {

    //// Get auth data, then get firestore user document || null
    this.user = this.afAuth
      .authState
      .pipe(
        switchMap(user => {
          // console.log('Firebase user : ', user);
          if (user) {
            const doc = this.afs.collection<User>('usuarios').doc<User>(user.uid);
            return doc.valueChanges();
          }
          return of(null);
        })
      );
  }

  get currentUserObservable(): Observable<any> {
    return this.afAuth.authState;
  }

  get authenticated(): boolean {
    return this.afAuth.auth.currentUser !== null;
  }

  signInEmail(signIn: SignIn) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(signIn.email, signIn.password);
  }

  signInSocial(provider: string) {
    let _provider;
    switch (provider) {
      case 'google':
        _provider = new firebaseApp.auth.GoogleAuthProvider();
        break;
    }

    return this.afAuth.auth
      .signInWithPopup(_provider)
      .then(credential => this.updateUserData(credential.user).then(() => credential.user));
  }

  signUp(signUp: SignUp) {
    return this.afAuth
      .auth
      .createUserWithEmailAndPassword(signUp.email, signUp.password)
      .then((credential: firebaseApp.auth.UserCredential) => {
        console.log(credential);
        credential.user.updateProfile({ // UPDATE FIREBASE USER CREDENTIALS
          displayName: signUp.name,
          photoURL: 'https://devchantlisv.page.link/empty-picture'
        })
          .then(() => this.updateUserData(credential.user, signUp))
      });

  }

  signOut() {
    return this.afAuth.auth
      .signOut()
      .then(() => {
        this.router.navigate(['menu']);
        this.notificationsService.show('Adiós!', 'Autenticación', 'info');
      });
  }

  forgotPassword(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  updateWorkplace(workplace: string, user: User) {
    return this.afs
      .doc<User>(`usuarios/${user.id}`)
      .update({
        workplace: workplace
      });
  }

  private updateUserData(user, signUp?: SignUp) {
    // Sets user data to firestore on login
    // console.log(user, signUp);
    const userRef: AngularFirestoreDocument<User> = this.afs.collection('usuarios').doc(user.uid);
    return userRef
      .ref
      .get()
      .then(doc => {
        if (!doc.exists) {
          let data: User = {
            id: user.uid,
            email: user.email,
            name: user.displayName,
            role: 'Cliente',
            photoURL: user.photoURL,
            debit: 0,
            credit: 0
          };
          if (signUp) {
            console.log(`Workplace : ${signUp.workplace}`)
            data.workplace = signUp.workplace;
          }
          return userRef.set(data, { merge: true });
        }
      }, e => console.log(e));
  }
}