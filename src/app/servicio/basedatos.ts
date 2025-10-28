import { Injectable,inject } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import { User } from '../models/user.models';

@Injectable({
  providedIn: 'root'
})
export class Basedatos {


  //auth= inject(AngularFireAuth);

  constructor(private auth: AngularFireAuth){}


  /*signIn(user:User){

    return signInWithEmailAndPassword(getAuth(),user.email,user.password);
  }*/


    signIn(correo:string,paas:string){

    return this.auth.signInWithEmailAndPassword(correo,paas);
  }
  
}
