import { Injectable, Output, EventEmitter } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { SigninI, SignupI, JwtI } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	SERVIDOR: string = 'https://tuvehiculo.clbs9571.now.sh';
	token: string;
  @Output() authenticated: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) { }

  async isTokenExpired(): Promise<boolean> {
  	if (this.token) {
  		const jwtd = await jwt_decode(this.token);

  		if (Date.now() >= jwtd.exp * 1000){
  			return true;
  		} else {
  			return false;
  		}
  	}

  	return true;
  }

  signin(userData: SigninI): Observable<any>{
      return this.http.post(`${this.SERVIDOR}/auth/signin`, userData)
      .pipe(
        tap(
          async (data) => {
            if(data.jwt_secret){
              this.token = await data.jwt_secret;
              this.setToken();
              this.authenticated.emit(true);
            }
          }
        )
      );
  }

  signup(userData: SignupI): Observable<any>{
    return this.http.post(`${this.SERVIDOR}/auth/signup`, userData)
    .pipe(
      tap(
        async (data) => {
          if(data.jwt_secret){
            this.token = await data.jwt_secret;
            this.setToken();
            this.authenticated.emit(true);
          }
        }
      )
    );
  }

  logout(): void {
    this.removeToken();
    this.authenticated.emit(false);
  }

  private async getToken(): Promise<string> {
    return await localStorage.getItem('SECRET_KEY');
  }

  private async setToken(): Promise<void> {
  	await localStorage.setItem('SECRET_KEY', this.token);
  }

  private async removeToken(): Promise<void> {
    this.token = '';
  	await localStorage.removeItem('SECRET_KEY');
  }

  async isAuthenticated(): Promise<boolean> {
    this.token = await this.getToken();
    
  	if (this.token) {
      const is_exp = await this.isTokenExpired();
      if (is_exp !== true){ // token is not expired
        this.authenticated.emit(true);
        return true;
      }
  	}

    this.authenticated.emit(false);
  	return false;
  }
}
