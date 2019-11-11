import { Component, OnInit, Input } from '@angular/core';
import { Router} from '@angular/router';
import { FetchService } from '../../services/fetch.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	init_man: string;
	init_mon: string;
	manufacturer: object;
	models: object;
	allowed: boolean = false;
    min_year: number = 1980;
    max_year: number = new Date().getFullYear();
    min_price: number = 10000;
    max_price: number = 1000000;

  	constructor(
  		private fetch: FetchService,
  		private router: Router
  	) { }

	async ngOnInit() {
		await this.fetch.getAllManu().subscribe(async (all_makes) => {
			this.manufacturer = await all_makes;
			this.init_man = await this.manufacturer[0];
			if (this.init_man){
				await this.handleManuChange(this.init_man);
			}
		});
	}

	async handleManuChange(manuf){
		if(manuf.value){
			manuf = manuf.value;
		}

		await this.fetch.getAllModels(manuf).subscribe(async (all_models) => {
			this.models = await all_models;
			this.init_mon = await this.models[0];
			console.log(this.models);
			this.allowed = true;
		});
	}

	async queryVehicles({ value }){
		this.fetch.setParams(value);
		this.router.navigateByUrl(`/posts/search`);
	}
	
}
