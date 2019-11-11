import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { QueryI } from '../interfaces/query';

@Injectable({
  providedIn: 'root'
})
export class FetchService {
	SERVIDOR: string = 'https://tuvehiculo.clbs9571.now.sh';
  params: QueryI = {
    class: '',
    make: '',
    model: '',
    min_year: 1885,
    max_year: new Date().getFullYear(),
    min_price: 1000,
    max_price: 9999999,
  };

  constructor(private http: HttpClient) { }

  getAll(){
  	return this.http.get(`${this.SERVIDOR}/vehicle/search`);
  }

  getAllManu(){
  	return this.http.get(`${this.SERVIDOR}/vehicle/search/makes`).pipe(
  		tap(data => {
  			return data;
  		})
  	);
  }

  getAllModels(mod: string){
  	return this.http.get(`${this.SERVIDOR}/vehicle/search/models/${mod}`).pipe(
  		tap(data => {
  			return data;
  		})
  	);
  }

  searchByParams(){
    const { 
      make,
      model,
      min_year,
      max_year,
      min_price,
      max_price
    } = this.params;

    if (!this.params.make && !this.params.model){
      return this.getAll();
    } else {
      return this.http.get(`${this.SERVIDOR}/vehicle/search/${make}/${model}/yearBetw_${min_year}-${max_year}/priceBetw_${min_price}-${max_price}`);
    }
  }

  searchById(id: string){
    return this.http.get(`${this.SERVIDOR}/vehicle/search/${id}`);
  }

  setParams(queryParams: QueryI): void {
    this.params = {
      class: queryParams.class,
      make: queryParams.make,
      model: queryParams.model,
      min_year: queryParams.min_year,
      max_year: queryParams.max_year,
      min_price: queryParams.min_price,
      max_price: queryParams.max_price
    }
  }

  getParams(): QueryI {
    return this.params;
  }
}
