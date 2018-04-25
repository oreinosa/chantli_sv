import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap'
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { User } from '../shared/classes/user';
import { Link } from '../shared/classes/link';
import { SignIn } from '../shared/classes/sign-in';
import { SignUp } from '../shared/classes/sign-up';

import { CategoriesService } from './../admin/categories/categories.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class AuthService {
  fbUser: firebase.User;
  user: Observable<User>;

  _links: Link[];
  _actions: Link[];
  linksSubject: BehaviorSubject<Link[]>;
  actionsSubject: BehaviorSubject<Link[]>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private categoriesService: CategoriesService,
    private router: Router,
    private notificationsService: NotificationsService
  ) {
    this._links = [
      // { label: 'Inicio', route: '', icon: '' }
    ];
    this._actions = [];

    this.actionsSubject = new BehaviorSubject<Link[]>([
      { label: 'Ingresar', route: 'ingresar', icon: 'person' },
      { label: 'Registrarse', route: 'registrarse', icon: 'person_add' }
    ]);
    this.linksSubject = new BehaviorSubject<Link[]>(this._links);

    //// Get auth data, then get firestore user document || null
    this.user = this.afAuth
      .authState
      .switchMap(user => {
        this.fbUser = user;
        // console.log('Firebase user : ', user);
        if (user) {
          const doc = this.afs.collection<User>('users').doc(user.uid);
          return doc.valueChanges();
        } else {
          return Observable.of(null)
        }
      });

  }

  setRouting(role: string = '') {
    console.log(`Set routing for ${role}`);
    this._actions = [];
    switch (role) {
      case 'Admin':
        this._actions.push(
          { label: 'Admin', route: 'admin', icon: 'build' },
        );
      case 'Cliente':
        this._actions.push(
          { label: 'Perfil', route: 'perfil', icon: 'person' },
        );
        break;
      default:
        this._actions.push(
          { label: 'Ingresar', route: 'ingresar', icon: 'person' },
          { label: 'Registrarse', route: 'registrarse', icon: 'person_add' }
        );
    }
    this.actionsSubject.next(this._actions);
    // this.linksSubject.next(this._links);
  }

  signInEmail(signIn: SignIn) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(signIn.email, signIn.password)
      .then((any) => {
        console.log(any);
        let body, type: string;
        body = `Hola`;
        type = 'info';
        this.notificationsService.show(body, undefined, type);
      });
  }

  signInSocial(provider: string) {
    let _provider;
    switch (provider) {
      case 'google':
        _provider = new firebase.auth.GoogleAuthProvider();
    }
    return this.afAuth
      .auth
      .signInWithPopup(_provider)
      .then((any) => {
        console.log(any);
        let body, type: string;
        body = `Hola`;
        type = 'info';
        this.notificationsService.show(body, undefined, type);
      });;
  }

  signUp(signUp: SignUp) {
    return this.afAuth
      .auth
      .createUserWithEmailAndPassword(signUp.email, signUp.password)
      .then(credential => credential.updateProfile({
        displayName: signUp.name,
        // photoURL: 'http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png'
      }).then(() => credential))
      .then(credential => this.updateUserData(credential))
      .then(() => this.notificationsService.show(`Bienvenido, ${signUp.name}`, undefined, 'success'));
  }

  signOut() {
    return this.afAuth.auth
      .signOut()
      .then(() => {
        this.router.navigate(['']);
        this.notificationsService.show('Adiós!', undefined, 'info');
      });
  }

  forgotPassword(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  updateWorkplace(workplace: string, user: User) {
    user.workplace = workplace;
    return this.updateUserData(user)
      .then(() => this.notificationsService.show('Lugar de trabajo actualizado!', undefined, 'success'));
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      id: user.uid,
      email: user.email,
      name: user.displayName,
      // photoURL: user.photoURL,
      role: 'Cliente'
    };
    return userRef
      .set(data, { merge: true })
      .then(() => true)
      .catch(() => false);
  }
}