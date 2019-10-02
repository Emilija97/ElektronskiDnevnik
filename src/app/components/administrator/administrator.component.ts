import { Component, OnInit, Input } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/state/app.states";
import { LogOut } from "src/app/store/actions/auth.actions";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { Observable } from "rxjs";
import { User } from "src/app/models/user";
import { Grades } from "src/app/models/grades";
import { HttpClient } from "@angular/common/http";
import { environment as env } from "../../../environments/environment";
import { StudentsService } from "src/app/services/students.service";
import { Fetch, Remove } from "src/app/store/actions/students.actions";
import * as fromStudent from "../../store/reducers/students.reducer";
import { Delete, FetchSubjects } from "src/app/store/actions/subjects.actions";
import { AuthState } from "src/app/store/reducers/auth.reducer";

@Component({
  selector: "app-administrator",
  templateUrl: "./administrator.component.html",
  styleUrls: ["./administrator.component.scss"]
})
export class AdministratorComponent implements OnInit {
  public students$: Observable<User[]>;
  authObs$: Observable<AuthState>;

  grades: Grades = new Grades();
  constructor(
    private store: Store<AppState>,
    private router: Router,
    public authService: AuthService,
    public studService: StudentsService,
    private http: HttpClient
  ) {
    this.authObs$ = this.store.select("auth");
  }

  ngOnInit() {
    this.store.dispatch(new Fetch());
    this.students$ = this.store.select(fromStudent.selectAllStudents);
    console.log(this.students$[0]);
  }

  logOut() {
    console.log("zavrsavam");
    this.store.dispatch(new LogOut());
    this.router.navigate(["/login"]);
  }

  logNewStudent() {
    this.router.navigate(["/signup-stud"]);
  }

  seeBestStudents() {
    this.router.navigate(["/best-students"]);
  }

  onDelete(id: string) {
    console.log("Delete id: " + id);
    this.store.dispatch(new Remove(id));
    this.store.dispatch(new Delete(id));
    this.store.dispatch(new Fetch());
    this.students$ = this.store.select(fromStudent.selectAllStudents);
  }
}
