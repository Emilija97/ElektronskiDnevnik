import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subscriber, throwError } from "rxjs";
import { User } from "../models/user";
import { Router } from "@angular/router";
import { find, map } from "rxjs/operators";

const url = "http://localhost:3000";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  public user: User;
  public id: number;
  public users$: Observable<User[]>;
  constructor(private http: HttpClient, private router: Router) {}

  getToken(): string {
    return localStorage.getItem("token");
  }

  logIn(email: string, password: string): Observable<any> {
    return Observable.create((obs: Subscriber<any>) => {
      this.http
        .get<User[]>(
          `http://localhost:3000/users?email=${email}&password=${password}`
        )
        .subscribe(res => {
          if (res && res.length > 0) {
            console.log("Potvrdjujem");
            obs.next(res[0]);
            obs.complete();
          } else {
            console.log("Javljam gresku");
            // throwError("Username or password incorrect.");
            obs.next("Username or password incorrect.");
            obs.complete();
          }
        });
    });
  }

  login(email: string, password: string): Observable<User | string> {
    return Observable.create((obs: Subscriber<User | string>) => {
      this.http
        .get<User[]>(`${url}/users?email=${email}&password=${password}`)
        .subscribe(res => {
          if (res && res.length > 0) {
            obs.next(res[0]);
            obs.complete();
          } else {
            obs.next("Username or password incorrect.");
            obs.complete();
          }
        });
    });
  }
  // logIn(email: string, password: string): Observable<any> {
  //   this.user = new User();
  //   this.users$ = this.getAllUsers();
  //   this.users$.forEach(user => console.log(user));
  //   this.users$
  //     .pipe(
  //       map(users =>
  //         users.findIndex(
  //           user => user.email == email && user.password == password
  //         )
  //       )
  //     )
  //     .subscribe(userId => {
  //       this.id = userId;
  //     });
  //   console.log("Moj id je: " + this.id);
  //   this.user.email = email;
  //   this.user.password = password;
  //   return this.http.post<User>(url, { email, password });
  //   // return this.http.get<User>(url);
  //   // var data =
  //   //   "email=" + email + "&password=" + password + "&grant_type=password";
  //   // var reqHeader = new HttpHeaders({
  //   //   "Content-Type": "application/x-www-urlencoded",
  //   //   "No-Auth": "True"
  //   // });
  //   // return this.http.post<User>(url, data, { headers: reqHeader });
  // }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(url);
  }
}
// this.router.navigate(["/administrator"]);
