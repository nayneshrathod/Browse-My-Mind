import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Employee, Manager, User } from './user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedManager: Manager = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    address: '',
    dob: '',
    company: '',
  };
  selectedEmployee: Employee = { 
    firstName: '',
    lastName: '',
    address: '',
    dob: '',
    mobile: '',
    city: '',
  };

  selectedUser: User = {
    email: '',
    password: ''
  }; 

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) }; 
  constructor(private http: HttpClient) { }

  //HttpMethods

  postUser(user: Manager): Observable<any> {
    return this.http.post(environment.apiBaseUrl + '/register', user, this.noAuthHeader);
  }

  addemp(user: Employee): Observable<any> {
    return this.http.post(environment.apiBaseUrl + '/addemp', user);
  }


  editemp(id: string, emp: Employee): Observable<any> {
    return this.http.put(environment.apiBaseUrl + `/editemp/${id}`, emp,);
  }

  delemp(_id: string): Observable<any> {
    return this.http.delete(environment.apiBaseUrl + `/delemp/${_id}`);
  }

  login(authCredentials): Observable<any> {
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials, this.noAuthHeader);
  }

  getUserProfile(): Observable<any> {
    return this.http.get(environment.apiBaseUrl + '/userProfile');
  } 
  
  getEmpdata(): Observable<any>  {
    return this.http.get(environment.apiBaseUrl + '/emp');
  }


  //Helper Methods

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
}
