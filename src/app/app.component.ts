import { Component } from "@angular/core";
import { AuthState } from "./store/reducers/auth.reducer";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "./store/state/app.states";
import { AuthActionTypes, CheckUser, LogOut } from "./store/actions/auth.actions";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "treciproj";

  authObs$: Observable<AuthState>;

  constructor(private store: Store<AppState>) {
    this.authObs$ = store.select("auth");
  }

  ngOninit() {
    let token = localStorage.getItem("token");
    if (token) this.store.dispatch(new CheckUser(token));
  }

  logout() {
    this.store.dispatch(new LogOut());
  }
}
