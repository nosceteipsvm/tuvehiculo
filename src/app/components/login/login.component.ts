import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SigninI } from '../../interfaces/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	d_username: string = 'bbleasby2';
	d_password: string = '123456';
	errors: string[] = [];

	constructor(
		private auth: AuthService,
		private router: Router
	) { }

	async handleSubmit({ value }) {
		this.auth.signin(value).subscribe( async (res) => {
			if (res.jwt_secret){
				this.router.navigateByUrl('/upload');
			} else {
				this.errors = [ 'Username and/or Password incorrect' ];
			}
		});
	}

}
