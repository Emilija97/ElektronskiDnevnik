import { Component, OnInit, EventEmitter, Input, Output } from "@angular/core";
import { User } from "src/app/models/user";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/state/app.states";
import { Delete, FetchSubject } from "src/app/store/actions/subjects.actions";
import { Remove } from "src/app/store/actions/students.actions";
import { Router } from "@angular/router";

@Component({
  selector: "app-admin-student",
  templateUrl: "./admin-student.component.html",
  styleUrls: ["./admin-student.component.scss"]
})
export class AdminStudentComponent implements OnInit {
  @Input()
  public student: User;
  constructor(private store: Store<AppState>) {}

  ngOnInit() {}

  onDelete() {
    this.store.dispatch(new Remove(this.student.id));
    this.store.dispatch(new Delete(this.student.id));
  }
}
