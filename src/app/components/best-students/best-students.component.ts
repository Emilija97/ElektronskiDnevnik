import { Component, OnInit } from "@angular/core";
import { StudentsService } from "src/app/services/students.service";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/state/app.states";
import { FindBestStudents } from "src/app/store/actions/students.actions";
import { User } from "src/app/models/user";
import { Observable } from "rxjs";
import { Location } from "@angular/common";
import * as fromStudent from "../../store/reducers/students.reducer";

@Component({
  selector: "app-best-students",
  templateUrl: "./best-students.component.html",
  styleUrls: ["./best-students.component.scss"]
})
export class BestStudentsComponent implements OnInit {
  public bestStudents$: Observable<User[]>;
  constructor(
    private location: Location,
    private studService: StudentsService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.store.dispatch(new FindBestStudents());
    this.bestStudents$ = this.store.select(fromStudent.selectAllStudents);
  }

  onClick() {
    this.location.back();
  }
}
