import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiURL: string = environment.urlAPI;

  constructor(private httpClient: HttpClient) { }


  public HttpGet(url: string) {
    return this.httpClient.get(`${this.apiURL}/${url}`);
  }

  public HttpPost(url: string, data: any) {
    return this.httpClient.post(`${this.apiURL}/${url}`, data);
  }

  public HttpPut(url: string, data: any) {
    return this.httpClient.put(`${this.apiURL}/${url}`, data);
  }

  public HttpDelete(url: string) {
    return this.httpClient.delete(`${this.apiURL}/${url}`);

  }
}
