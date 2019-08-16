import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, Subscriber, throwError } from "rxjs";
import { Grades } from "../models/grades";
import { environment as env } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class SubjectService {
  constructor(private http: HttpClient, private router: Router) {}

  fetchSubjects(id: number): Observable<any> {
    return Observable.create((obs: Subscriber<any>) => {
      this.http
        .get<Grades[]>(`${env.url}/grades?studentId=${id}`)
        .subscribe(res => {
          if (res && res.length > 0) {
            console.log("Potvrdjujem");
            obs.next(res[0]);
            obs.complete();
          } else {
            console.log("Javljam gresku");
            throwError("There isn't in the base table with grades.");
            obs.next("There isn't in the base table with grades.");
            obs.complete();
          }
        });
    });
  }

  changeGrade(grades: Partial<Grades>): Observable<any> {
    return this.http.patch<Grades>(`${env.url}/grades/${grades.id}`, grades);
  }
}
