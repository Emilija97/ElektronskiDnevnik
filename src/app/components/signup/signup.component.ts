import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user";
import { Location } from "@angular/common";
import { AuthService } from "src/app/services/auth.service";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/state/app.states";
import { SignUp } from "src/app/store/actions/auth.actions";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})
export class SignupComponent implements OnInit {
  public user: User = new User();
  chCode: string = "administrator2019";
  code: string = "";
  constructor(
    private location: Location,
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {}

  onSubmit = () => {
    console.log("User is sign up: " + this.user);
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
      this.location.back();
    }
  };
}
