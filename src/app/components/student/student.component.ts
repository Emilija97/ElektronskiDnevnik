import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { SubjectService } from "src/app/services/subject.service";
import { Grades } from "src/app/models/grades";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/state/app.states";
import { LogOut } from "src/app/store/actions/auth.actions";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { StudentState } from "src/app/store/reducers/students.reducer";
import { AuthState } from "src/app/store/reducers/auth.reducer";

@Component({
  selector: "app-student",
  templateUrl: "./student.component.html",
  styleUrls: ["./student.component.scss"]
})
export class StudentComponent implements OnInit {
  public grades: Grades;
  authObs$: Observable<AuthState>;
  constructor(
    public subService: SubjectService,
    public authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.authObs$ = this.store.select("auth");
  }

  ngOnInit() {
    this.subService.fetchSubjects(this.authService.user.id).subscribe(grades => {
      this.grades = grades;
    });
  }

  signOut() {
    console.log("zavrsavam");
    this.store.dispatch(new LogOut());
    this.router.navigate(["/login"]);
  }
}
