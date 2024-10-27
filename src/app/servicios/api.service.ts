import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) { }
  
  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getUser(email: String): Observable<any> {
    return this.http.get(this.apiUrl + '/' + email);
  }

  isRegistered(email: String): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.getUser(email).subscribe(
        (response) => {
          if (response != null) {
            resolve(true);
          } 
          else {
            resolve(false);
          }
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  createUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }
}
