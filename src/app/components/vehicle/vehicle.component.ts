import { Component, OnInit } from '@angular/core';
import { FetchService } from '../../services/fetch.service';
import { ActivatedRoute } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {
	vehicle: any;
	vehicle_id: string;
	current_img: string;

	constructor(
		private fetch: FetchService,
		private route: ActivatedRoute
	) {
		this.vehicle_id = this.route.snapshot.paramMap.get('id');
	}

	async ngOnInit() {
		await this.fetch.searchById(this.vehicle_id).subscribe( async results => {
			this.vehicle = await results[0];
			this.current_img = this.vehicle.src[0];
			this.vehicle.price = new Intl.NumberFormat('de-DE', {
	    		style: 'currency',
	    		currency: 'USD'
	    	}).format(this.vehicle.price);
		});
	}

	setCurrImg(image: string){
		this.current_img = image;
	}
}
