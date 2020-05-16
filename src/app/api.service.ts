import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  ping$(): Observable<any> {
    return this.http.get('https://36iu0bmppi.execute-api.us-east-1.amazonaws.com/Dev/pets');
    //return this.http.get('/api/external');
  }

}