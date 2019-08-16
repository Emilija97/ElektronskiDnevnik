import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SignupComponent } from "./components/signup/signup.component";
import { LoginComponent } from "./components/login/login.component";
import { HomepageComponent } from "./components/homepage/homepage.component";
import { AdministratorComponent } from "./components/administrator/administrator.component";
import { StudentComponent } from "./components/student/student.component";
import { SignupStudComponent } from "./components/signup-stud/signup-stud.component";
import { EditingComponent } from "./components/editing/editing.component";

const routes: Routes = [
  { path: "signup", component: SignupComponent },
  { path: "login", component: LoginComponent },
  { path: "", component: HomepageComponent },
  { path: "administrator", component: AdministratorComponent },
  { path: "student", component: StudentComponent },
  { path: "signup-stud", component: SignupStudComponent },
  { path: "editing", component: EditingComponent },
  { path: "editing/:studentId", component: EditingComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: "ignore"
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
