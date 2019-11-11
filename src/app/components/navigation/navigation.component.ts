import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
	loggedIn: any = false;

	constructor(private auth: AuthService) {
		this.auth.isAuthenticated();
		this.auth.authenticated.subscribe( res => this.loggedIn = res );
	}

	async ngOnInit() {
		
	}

}
