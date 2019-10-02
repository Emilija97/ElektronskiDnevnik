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
    return this.http.delete<User>(`${env.url}/users/${id}`);
  }

  updateUser(user: Partial<User>): Observable<any> {
    return this.http.patch<User>(`${env.url}/users/${user.id}`, user);
  }

  getBestStudents(): Observable<User[]> {
    return this.http.get<User[]>(`${env.url}/users?role=student&averageGrade=5.00`);
  }
}
