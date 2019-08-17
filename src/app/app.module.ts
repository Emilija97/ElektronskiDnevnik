import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { AdministratorComponent } from "./components/administrator/administrator.component";
import { StudentComponent } from "./components/student/student.component";
import { SignupComponent } from "./components/signup/signup.component";
import { HomepageComponent } from "./components/homepage/homepage.component";
import { AuthService } from "./services/auth.service";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { AuthEffects } from "./store/effects/auth.effects";
import { reducers } from "./store/index";
import { HttpClientModule } from "@angular/common/http";
import { SignupStudComponent } from "./components/signup-stud/signup-stud.component";
import { EditingComponent } from "./components/editing/editing.component";
import { SubjectsEffects } from "./store/effects/subjects.effects";
import { StudentsEffects } from "./store/effects/students.effects";
import { StudentsService } from "./services/students.service";
import { SubjectService } from "./services/subject.service";

import { MDBBootstrapModule } from "angular-bootstrap-md";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdministratorComponent,
    StudentComponent,
    SignupComponent,
    HomepageComponent,
    SignupStudComponent,
    EditingComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 20
    }),
    EffectsModule.forRoot([AuthEffects, SubjectsEffects, StudentsEffects])
  ],
  providers: [AuthService, StudentsService, SubjectService],
  bootstrap: [AppComponent]
})
export class AppModule {}
