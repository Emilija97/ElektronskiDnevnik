import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subscriber, throwError } from "rxjs";
import { User } from "../models/user";
import { environment as env } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class StudentsService {
  public students: User[];
  constructor(private http: HttpClient) {}

  get(): Observable<User[]> {
    return this.http.get<User[]>(`${env.url}/users?role=student`);
    // return Observable.create((obs: Subscriber<any>) => {
    //   this.http.get<User[]>(`${env.url}/users?role=student`).subscribe(res => {
    //     if (res && res.length > 0) {
    //       console.log("Svi studenti");
    //       this.students = res;
    //       obs.next(res);
    //       obs.complete();
    //     } else {
    //       console.log("Javljam gresku");
    //       throwError("Database is empty.");
    //       obs.next("Database is empty.");
    //       obs.complete();
    //     }
    //   });
    // });
  }
}
