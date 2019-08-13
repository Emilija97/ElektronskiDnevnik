import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { AuthService } from "src/app/services/auth.service";
import { User } from "src/app/models/user";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/state/app.states";
import { SignUpStudent } from "src/app/store/actions/auth.actions";

@Component({
  selector: "app-signup-stud",
  templateUrl: "./signup-stud.component.html",
  styleUrls: ["./signup-stud.component.scss"]
})
export class SignupStudComponent implements OnInit {
  public student: User = new User();
  constructor(
    private location: Location,
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {}

  onBack() {
    this.location.back();
  }

  onSubmit(): void {
    console.log("U submit sam");
    const payload = {
      email: this.student.email,
      password: this.student.password,
      name: this.student.name,
      surname: this.student.surname,
      role: "student"
    };
    this.store.dispatch(new SignUpStudent(payload));
  }
}
