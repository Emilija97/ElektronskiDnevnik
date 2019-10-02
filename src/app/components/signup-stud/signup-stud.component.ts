import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { AuthService } from "src/app/services/auth.service";
import { User } from "src/app/models/user";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/state/app.states";
import { SignUpStudent, ShowInvalid } from "src/app/store/actions/auth.actions";
import { Router } from "@angular/router";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { AuthState } from "src/app/store/reducers/auth.reducer";
import { FormvalidatorService } from "src/app/services/formvalidator.service";

@Component({
  selector: "app-signup-stud",
  templateUrl: "./signup-stud.component.html",
  styleUrls: ["./signup-stud.component.scss"]
})
export class SignupStudComponent implements OnInit {
  public student: User = new User();
  authObs$: Observable<AuthState>;
  signUpStudForm: FormGroup;
  constructor(
    private location: Location,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private store: Store<AppState>
  ) {
    this.authObs$ = store.select("auth");
  }

  ngOnInit() {
    this.signUpStudForm = this.fb.group(
      {
        name: [
          "",
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(40),
            Validators.pattern("^[a-zA-Z]+$")
          ]
        ],
        surname: [
          "",
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(40),
            Validators.pattern("^[a-zA-Z]+$")
          ]
        ],
        email: ["", [Validators.required, Validators.email]],
        password: [
          "",
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
            Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$")
          ]
        ],
        confirmPassword: ["", Validators.required]
      },
      { validators: [FormvalidatorService.matchPassword] }
    );
  }

  get name() {
    return this.signUpStudForm.get("name");
  }

  get surname() {
    return this.signUpStudForm.get("surname");
  }

  get email() {
    return this.signUpStudForm.get("email");
  }

  get password() {
    return this.signUpStudForm.get("password");
  }

  get confirmPassword() {
    return this.signUpStudForm.get("confirmPassword");
  }

  get formErrors() {
    return this.signUpStudForm.errors;
  }

  showInvalid() {
    this.store.dispatch(new ShowInvalid());
  }

  onBack() {
    this.location.back();
  }

  onSubmit(): void {
    console.log("U submit sam");
    this.student = this.signUpStudForm.value;
    console.log(this.student);
    const payload = {
      email: this.student.email,
      password: this.student.password,
      name: this.student.name,
      surname: this.student.surname,
      averageGrade: "0.00",
      role: "student"
    };
    this.store.dispatch(new SignUpStudent(payload));
  }
}
