import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { SubjectService } from "src/app/services/subject.service";
import { Grades } from "src/app/models/grades";
import { Location } from "@angular/common";

@Component({
  selector: "app-editing",
  templateUrl: "./editing.component.html",
  styleUrls: ["./editing.component.scss"]
})
export class EditingComponent implements OnInit {
  public grades: Grades;
  public studId: number;
  // serbian: string = "";
  // math: string = "";
  // english: string = "";
  // biology: string = "";

  constructor(
    private route: ActivatedRoute,
    private subService: SubjectService,
    private location: Location
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
        });
      }
    });
  }

  onClick() {
    this.location.back();
  }

  onChange(subject: string, val: string) {
    if (subject == "serbian") {
      this.grades.serbianLanguage = val;
      // this.serbian = "";
    } else if (subject == "english") {
      this.grades.englishLanguage = val;
      // this.english = "";
    } else if (subject == "math") {
      this.grades.math = val;
      // this.math = "";
    } else {
      this.grades.biology = val;
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
}
