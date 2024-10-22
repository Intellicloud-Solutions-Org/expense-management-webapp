import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/auth/current-user';

  constructor(private http: HttpClient) {}

  fetchUserInfo(token:any): Observable<any> {
    return this.http.get(this.apiUrl,token);
    }

    setUserInfo(userInfo: any): void {
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    }
  
    // Get user info from local storage
    getUserInfo(): any {
      const userInfo = localStorage.getItem('userInfo');
      return userInfo ? JSON.parse(userInfo) : null;
    }
  
    // Remove user info from local storage
    removeUserInfo(): void {
      localStorage.removeItem('userInfo');
    }

    //Get user role 
 public getUserRole(){
  let user=this.getUserInfo();
  return user.data.authorities[0].authority;  
}

public islogin(){
    
  let tokenStr=localStorage.getItem("token");
    if (tokenStr==null || tokenStr=="" ||tokenStr==undefined) {
     return false;
    }else{
     return true;
    }
 }

 //logout: to remove token from local storage
 public logout() {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("user");
  return true;
}

saveToken(token: string) {
  localStorage.setItem('jwtToken', token);
}

getToken(): string | null {
  return localStorage.getItem('jwtToken');
}

removeToken(){
 localStorage.removeItem('jwtToken');
}
}

