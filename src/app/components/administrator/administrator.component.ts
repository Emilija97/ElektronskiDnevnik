import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/state/app.states";
import { LogOut } from "src/app/store/actions/auth.actions";
import { Router } from "@angular/router";

@Component({
  selector: "app-administrator",
  templateUrl: "./administrator.component.html",
  styleUrls: ["./administrator.component.scss"]
})
export class AdministratorComponent implements OnInit {
  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {}

  onSubmit() {
    console.log("zavrsavam");
    this.store.dispatch(new LogOut());
    this.router.navigate(["/login"]);
  }
}
