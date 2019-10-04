import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user";
import { Location } from "@angular/common";
import { AuthService } from "src/app/services/auth.service";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/state/app.states";
import { SignUp, ShowInvalid } from "src/app/store/actions/auth.actions";
import { FormBuilder, FormGroup, Validators, AbstractControl } from "@angular/forms";
import { AuthState } from "src/app/store/reducers/auth.reducer";
import { Observable } from "rxjs";
import { FormvalidatorService } from "src/app/services/formvalidator.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})
export class SignupComponent implements OnInit {
  public user: User = new User();
  chCode: string = "administrator2019";
  code: string = "";
  signUpForm: FormGroup;
  authObs$: Observable<AuthState>;
  constructor(
    private fb: FormBuilder,
    private location: Location,
    private authService: AuthService,
    private store: Store<AppState>
  ) {
    this.authObs$ = this.store.select("auth");
  }

  ngOnInit() {
    this.signUpForm = this.fb.group(
      {
        affirmationCode: [
          "",
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(30),
            Validators.pattern("^[A-Za-z]+(?:[A-Za-z0-9_-]+)*$")
          ]
        ],
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
    return this.signUpForm.get("name");
  }

  get surname() {
    return this.signUpForm.get("surname");
  }

  get email() {
    return this.signUpForm.get("email");
  }

  get affirmationCode() {
    return this.signUpForm.get("affirmationCode");
  }

  get password() {
    return this.signUpForm.get("password");
  }

  get confirmPassword() {
    return this.signUpForm.get("confirmPassword");
  }

  get formErrors() {
    return this.signUpForm.errors;
  }

  showInvalid() {
    this.store.dispatch(new ShowInvalid());
  }

  onSubmit = () => {
    this.user = this.signUpForm.value;
    console.log(this.user);
    console.log(this.code);
    if (this.code == this.chCode) {
      const payload = {
        email: this.user.email,
        password: this.user.password,
        name: this.user.name,
        surname: this.user.surname,
        role: "administrator"
      };
      this.store.dispatch(new SignUp(payload));
    } else {
      console.log("Pogresan kod");
      alert("Your code is invalid");
    }
  };
}
