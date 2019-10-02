import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/state/app.states";
import { LogIn, ShowInvalid } from "src/app/store/actions/auth.actions";
import { Observable } from "rxjs";
import { AuthState } from "src/app/store/reducers/auth.reducer";
import { FormGroup, FormBuilder, Validators, AbstractControl } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  user: User = new User();

  loginForm: FormGroup;
  authObs$: Observable<AuthState>;
  constructor(private store: Store<AppState>, private fb: FormBuilder) {
    this.authObs$ = this.store.select("auth");
  }

  get email() {
    return this.loginForm.get("email");
  }

  get password() {
    return this.loginForm.get("password");
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });
  }

  showInvalid() {
    this.store.dispatch(new ShowInvalid());
  }

  onSubmit(): void {
    this.user = this.loginForm.value;
    console.log(this.user);
    const payload = {
      email: this.user.email,
      password: this.user.password
    };
    this.store.dispatch(new LogIn(payload));
  }
}
