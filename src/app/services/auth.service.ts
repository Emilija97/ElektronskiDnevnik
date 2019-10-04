import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subscriber, throwError } from "rxjs";
import { User } from "../models/user";
import { Router } from "@angular/router";
import { find, map, catchError } from "rxjs/operators";
import { environment as env } from "../../environments/environment";
import { Grades } from "../models/grades";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  public grades: Grades = new Grades();
  public user: User;
  public student: User;
  // public id: string;
  public users$: Observable<User[]>;
  constructor(private http: HttpClient, private router: Router) {}

  getToken(): string {
    return localStorage.getItem("token");
  }

  getById(id: string): Observable<User> {
    return this.http.get<User>(`${env.url}/users/${id}`).pipe(
      catchError(err => {
        return throwError("User not found.");
      })
    );
  }

  logIn(email: string, password: string): Observable<any> {
    return Observable.create((obs: Subscriber<any>) => {
      this.http
        .get<User[]>(`${env.url}/users?email=${email}&password=${password}`)
        .subscribe(res => {
          if (res && res.length > 0) {
            console.log("Potvrdjujem");
            this.user = res[0];
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

  signUp(user: User): Observable<any> {
    console.log("Usao sam u service");
    return Observable.create((obs: Subscriber<any>) => {
      this.http.get<User[]>(`${env.url}/users?email=${user.email}`).subscribe(res => {
        if (!res || res.length == 0) {
          this.http.post<User>(`${env.url}/users`, user).subscribe(res => {
            obs.next(res);
            obs.complete();
          });
        } else {
          obs.next("Username already taken.");
          obs.complete();
        }
      });
    });
  }

  addSubjectField(grades: Grades) {
    console.log("Id studenta: " + grades.studentId);
    this.http.post<Grades>(`${env.url}/grades`, grades).subscribe(
      data => {
        console.log("Post request is successful ", data);
      },
      error => {
        console.error("Error", error);
      }
    );
  }
}
