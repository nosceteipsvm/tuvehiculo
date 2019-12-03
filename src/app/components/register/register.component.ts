import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
	errors: string[] = [];

 	constructor(
 		private auth: AuthService,
 		private router: Router
 	) { }

	async handleSubmit({ value }){
		await this.auth.signup(value).subscribe(res => {
			if (res.jwt_secret){
				this.router.navigateByUrl('/upload');
			} else {
				this.errors = res.errors;
			}
		})
	}
}
