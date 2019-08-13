import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/state/app.states";
import { LogOut } from "src/app/store/actions/auth.actions";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { Observable } from "rxjs";
import { User } from "src/app/models/user";
import { Grades } from "src/app/models/grades";
import { HttpClient } from "@angular/common/http";
const url = "http://localhost:3000";
@Component({
  selector: "app-administrator",
  templateUrl: "./administrator.component.html",
  styleUrls: ["./administrator.component.scss"]
})
export class AdministratorComponent implements OnInit {
  public students$: Observable<User[]>;

  grades: Grades = new Grades();
  constructor(
    private store: Store<AppState>,
    private router: Router,
    public authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    console.log(this.authService.user.name);
    this.students$ = this.authService.getAllStudents();
  }

  onSubmit() {
    console.log("zavrsavam");
    this.store.dispatch(new LogOut());
    this.router.navigate(["/login"]);
  }

  logNewStudent() {
    this.router.navigate(["/signup-stud"]);
  }

  addGrades() {
    this.grades.math = "";
    this.grades.biology = "";
    this.grades.englishLanguage = "";
    this.grades.serbianLanguage = "";
    this.grades.studentId = 10;
    this.http.post<Grades>(`${url}/grades?`, this.grades).subscribe(
      data => {
        console.log("Post request is successful ", data);
      },
      error => {
        console.error("Error", error);
      }
    );
    console.log("Zavrsio sam upis ocena" + this.grades);
  }
}
