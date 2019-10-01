import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { SubjectService } from "src/app/services/subject.service";
import { Grades } from "src/app/models/grades";
import { Location } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { environment as env } from "src/environments/environment";

@Component({
  selector: "app-editing",
  templateUrl: "./editing.component.html",
  styleUrls: ["./editing.component.scss"]
})
export class EditingComponent implements OnInit {
  public grades: Grades;
  public studId: number;
  serbian: number = 0;
  math: number = 0;
  english: number = 0;
  biology: number = 0;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private subService: SubjectService,
    private location: Location,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.studId = params["studentId"];
      console.log("On init " + this.studId);
      if (!this.studId) {
        this.location.back();
      } else {
        this.subService.fetchSubjects(this.studId).subscribe(grades => {
          this.grades = grades;
          this.id = grades.id;
          console.log(this.id);
        });
      }
    });
  }

  onClick() {
    this.location.back();
  }

  onChange(subject: string, val: number) {
    if (subject == "serbian") {
      this.grades.serbianLanguage.push(val - 0);
      // this.serbian = "";
    } else if (subject == "english") {
      let grade = val - 0;
      this.grades.englishLanguage.push(grade);
      // this.english = "";
    } else if (subject == "math") {
      this.grades.math.push(val - 0);
      // this.math = "";
    } else {
      this.grades.biology.push(val - 0);
      // this.biology = "";
    }
    // if (this.serbian != "") {
    //   this.grades.serbianLanguage = this.serbian.valueOf();
    //   this.serbian = "";
    // } else if (this.english != "") {
    //   this.grades.englishLanguage = this.english.valueOf();
    //   this.english = "";
    // } else if (this.math != "") {
    //   this.grades.math = this.math.valueOf();
    //   this.math = "";
    // } else {
    //   this.grades.biology = this.biology.valueOf();
    //   this.biology = "";
    // }
    this.subService.changeGrade(this.grades).subscribe(grades => {
      console.log("New grades");
    });
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
        console.log(tmp);
        break;
      }
      default: {
        let tmp = this.grades.biology[index];
        console.log(tmp);
      }
    }
    this.subService.changeGrade(this.grades).subscribe(grades => {
      console.log("Deleted grade " + tmp + " from " + subject);
    });
  }
}
