import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subscriber, throwError } from "rxjs";
import { User } from "../models/user";
import { environment as env } from "../../environments/environment";
import { Grades } from "../models/grades";
import { SubjectService } from "./subject.service";
import { Store } from "@ngrx/store";
import { AppState } from "../store/state/app.states";
import { Delete } from "../store/actions/subjects.actions";

@Injectable({
  providedIn: "root"
})
export class StudentsService {
  public students: User[];

  constructor(
    private http: HttpClient,
    public subService: SubjectService,
    private store: Store<AppState>
  ) {}

  get(): Observable<User[]> {
    return this.http.get<User[]>(`${env.url}/users?role=student`);
  }

  remove(id: number): Observable<User> {
    // Observable.create((obs: Subscriber<any>) => {
    //   this.http
    //     .get<Grades[]>(`${env.url}/grades?studentId=id`)
    //     .subscribe(res => {
    //       if (res && res.length > 0) {
    //         console.log(
    //           "Id usera: " + res[0].studentId + ", a grade id: " + res[0].id
    //         );
    //         const id = res[0].id;
    //         this.http
    //           .delete<Grades>(`${env.url}/grades/${id}`)
    //           .subscribe(() => console.log("Zavrsio sam brisanje ocena."));
    //       } else {
    //         console.log("Javljam gresku");
    //         throwError("Username or password incorrect.");
    //         obs.next("Username or password incorrect.");
    //         obs.complete();
    //       }
    //     });
    // });
    // this.http
    //   .delete<void>(`${env.url}/grades/${id}`)
    //   .subscribe(() => console.log("Glupa sam, gde si sad?"));
    return this.http.delete<User>(`${env.url}/users/${id}`);
  }
  // Observable.create((obs: Subscriber<any>) => {
  //   this.http
  //     .get<Grades[]>(`${env.url}/grades?studentId=id`)
  //     .subscribe(res => {
  //       if (res && res.length > 0) {
  //         console.log("Potvrdjujem " + res[0].id);
  //         this.http.delete<Grades>(`${env.url}/grades/${res[0].id}`);
  //         obs.next(res[0]);
  //         obs.complete();
  //       } else {
  //         console.log("Javljam gresku");
  //         throwError("Username or password incorrect.");
  //         obs.next("Username or password incorrect.");
  //         obs.complete();
  //       }
  //     });
  // });
  // this.http.get<Grades>(`${env.url}/grades?studentId=id`).subscribe(grade => {
  //   console.log(grade.id);

  //   this.http.delete<Grades>(`${env.url}/grades/${grade.id}`);
  // });
  // this.http.delete<Grades>(`${env.url}/grades/${this.grade.id}`);
  // console.log(this.grade.id);
  // }
}
