import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router} from '@angular/router';
import { FetchService } from '../../services/fetch.service';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
	auth: string = localStorage.getItem('SECRET_KEY');
	assets: string = "../../../assets/";
	image: string = 'placeholder.png';
	ph1: string = this.assets + this.image;
	ph2: string = this.assets + this.image;
	ph3: string = this.assets + this.image;
	ph4: string = this.assets + this.image;
	init_man: string;
	init_mon: string;
	manufacturer: object;
	models: object;
	errors: string[] = [];
	file: File = null;
	uploadForm: FormData = new FormData();

  	constructor(
  		private fetch: FetchService,
  		private router: Router,
  		private http: HttpClient
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
		});
	}

	handleFileInput(files: FileList, n: number) {
      this.file = files.item(0);

      //show image preview
      var reader = new FileReader();
      reader.onload = (event: any) => {
      	switch(n) {
		  case 1:
		    this.ph1 = event.target.result;
		    break;
		  case 2:
		    this.ph2 = event.target.result;
		    break;
		  case 3:
		    this.ph3 = event.target.result;
		    break;
		  case 4:
		    this.ph4 = event.target.result;
		    break;
		  default:
		    // this.ph1 = event.target.result;
		}
      }

      reader.readAsDataURL(this.file);

      this.uploadForm.append('file', this.file, this.file.name);
    }

	handleSubmit({ value }) {
		Object.keys(value).forEach((key) => {
			this.uploadForm.append(key, value[key]);
		});

		const headers = new HttpHeaders({
			'Authorization': `Bearer ${this.auth}`
		});

		this.http.post('https://tuvehiculo.clbs9571.now.sh/vehicle/upload', this.uploadForm, { headers })
		.subscribe((data) => {
			if(data){
				this.router.navigateByUrl('/posts/search');
			} else {
				this.errors = [ 'Invalid/incomplete fields' ];
			}
		})
	}
}
