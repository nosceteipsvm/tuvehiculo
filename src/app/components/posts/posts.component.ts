import { Component, OnInit } from '@angular/core';
import { FetchService } from '../../services/fetch.service';
import { QueryI } from '../../interfaces/query';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
	posts: object[] = [];
	n_results: number = this.posts.length;
	params: QueryI;

	constructor(
		private fetch: FetchService
	){}

	async ngOnInit() {
		this.params = await this.fetch.getParams();
		await this.fetch.searchByParams().subscribe( async (data: object[]) => {
			this.posts = await data;
			this.posts.forEach((post: any) => {
				post.price = new Intl.NumberFormat('de-DE', {
		    		style: 'currency',
		    		currency: 'USD'
		    	}).format(post.price);
			})
		});
	}

}
