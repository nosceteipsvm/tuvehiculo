import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router} from '@angular/router';
import { FetchService } from '../../services/fetch.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
	auth: string = localStorage.getItem('SECRET_KEY');
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

	handleFileInput(files: FileList) {
      this.file = files.item(0);
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
