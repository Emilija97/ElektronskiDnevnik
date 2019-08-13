import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { SubjectService } from "src/app/services/subject.service";
import { Grades } from "src/app/models/grades";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/state/app.states";
import { LogOut } from "src/app/store/actions/auth.actions";
import { Router } from "@angular/router";

@Component({
  selector: "app-student",
  templateUrl: "./student.component.html",
  styleUrls: ["./student.component.scss"]
})
export class StudentComponent implements OnInit {
  public grades: Grades;
  constructor(
    public subService: SubjectService,
    public authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit() {
    this.subService
      .fetchSubjects(this.authService.user.id)
      .subscribe(grades => {
        this.grades = grades;
      });
  }

  signOut() {
    console.log("zavrsavam");
    this.store.dispatch(new LogOut());
    this.router.navigate(["/login"]);
  }
}
