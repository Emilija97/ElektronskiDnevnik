import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/state/app.states";
import { LogIn } from "src/app/store/actions/auth.actions";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  user: User = new User();

  constructor(private store: Store<AppState>) {}

  ngOnInit() {}

  onSubmit(): void {
    console.log(this.user);
    const payload = {
      email: this.user.email,
      password: this.user.password
    };
    this.store.dispatch(new LogIn({ payload }));
  }
}
