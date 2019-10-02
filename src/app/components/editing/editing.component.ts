import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { SubjectService } from "src/app/services/subject.service";
import { Grades } from "src/app/models/grades";
import { Location } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { environment as env } from "src/environments/environment";
import { StudentsService } from "src/app/services/students.service";
import { User } from "src/app/models/user";
import { AppState } from "src/app/store/state/app.states";
import { Store, select } from "@ngrx/store";
import { FetchSubjects } from "src/app/store/actions/subjects.actions";
import { Observable, pipe } from "rxjs";

@Component({
  selector: "app-editing",
  templateUrl: "./editing.component.html",
  styleUrls: ["./editing.component.scss"]
})
export class EditingComponent implements OnInit {
  // public gradesObs: Observable<SubjectState>;
  // public stateProba: SubjectState;
  public grades: Grades;
  public studId: string;
  public student: User;
  id: number;
  public averageGrades: number[] = [];
  public nameOfSub: string[] = [
    "Serbian language",
    "English language",
    "Math",
    "Biology"
  ];
  public averageGrade: string = "";

  constructor(
    private route: ActivatedRoute,
    private subService: SubjectService,
    private studService: StudentsService,
    private store: Store<AppState>,
    private location: Location,
    private http: HttpClient
  ) {
    // this.gradesObs = store.select("subjects");
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.studId = params["studentId"];
      console.log("On init " + this.studId);
      if (!this.studId) {
        this.location.back();
      } else {
        // this.store.dispatch(new FetchSubjects(this.studId));
        this.subService.fetchSubjects(this.studId).subscribe(grades => {
          this.grades = grades;
          this.id = grades.id;
          console.log(this.id);
          this.calculateAverageGrades();
        });
        this.http.get<User>(`${env.url}/users?id=${this.studId}`).subscribe(user => {
          this.student = user[0];
          this.averageGrade = user.averageGrade;
        });
      }
    });
  }

  onClick() {
    this.prepareStudentForUpdate();
    this.location.back();
  }

  onAdd(subject: string, val: number) {
    if (subject == "serbian") {
      this.grades.serbianLanguage.push(val - 0);
    } else if (subject == "english") {
      this.grades.englishLanguage.push(val - 0);
    } else if (subject == "math") {
      this.grades.math.push(val - 0);
    } else {
      this.grades.biology.push(val - 0);
    }
    this.calculateAverageGrades();
    this.subService.changeGrade(this.grades).subscribe(grades => {
      console.log("New grades");
    });
  }

  prepareStudentForUpdate() {
    let sum = 0;
    this.averageGrades.forEach(el => {
      if (el) sum += el;
    });
    this.student.averageGrade = (sum / this.averageGrades.length).toFixed(2);
    console.log(this.student.id + "provera");
    this.studService.updateUser(this.student).subscribe(user => {
      console.log("Updated");
    });
  }
  calculateAverageGrades() {
    let sum: number = 0;
    this.grades.serbianLanguage.forEach(el => {
      sum += el;
    });
    this.averageGrades[0] = sum / this.grades.serbianLanguage.length;
    sum = 0;
    this.grades.englishLanguage.forEach(el => {
      sum += el;
    });
    this.averageGrades[1] = sum / this.grades.englishLanguage.length;
    sum = 0;
    this.grades.math.forEach(el => {
      sum += el;
    });
    this.averageGrades[2] = sum / this.grades.math.length;
    sum = 0;
    this.grades.biology.forEach(el => {
      sum += el;
    });
    this.averageGrades[3] = sum / this.grades.biology.length;
  }

  deleteGradeFromArray(subject: string, index: number) {
    //studId ti treba isto da nadjes tog lika u bazi
    let tmp;
    switch (subject) {
      case "serbian": {
        tmp = this.grades.serbianLanguage.splice(index, 1);
        console.log(this.grades.serbianLanguage.splice(index, 1));
        break;
      }
      case "english": {
        let tmp = this.grades.englishLanguage[index];
        this.grades.englishLanguage.splice(index, 1);
        console.log(tmp);
        console.log(this.grades.englishLanguage);
        break;
      }
      case "math": {
        let tmp = this.grades.math[index];
        this.grades.math.splice(index, 1);
        console.log(tmp);
        break;
      }
      default: {
        let tmp = this.grades.biology[index];
        this.grades.biology.splice(index, 1);
        console.log(tmp);
      }
    }
    this.subService.changeGrade(this.grades).subscribe(grades => {
      console.log("Deleted grade " + tmp + " from " + subject);
    });
    this.calculateAverageGrades();
    // this.prepareStudentForUpdate();
  }
}
