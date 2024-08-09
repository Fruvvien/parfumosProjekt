import { Injectable } from "@angular/core";
import { environment } from "../environments/enviroment"
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })


export class fetchDataService{

  constructor(private http: HttpClient){

  }

  fetchDataFinalProduct(){

    return this.http.get(environment.API_URL+'/');


  }

  fetchDataSimpleProduct(){
    return this.http.get(environment.API_URL+"/simpleParfum");
   }
}
