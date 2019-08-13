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
import { ChangeComponent } from "./components/change/change.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdministratorComponent,
    StudentComponent,
    SignupComponent,
    HomepageComponent,
    SignupStudComponent,
    EditingComponent,
    ChangeComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 5
    }),
    EffectsModule.forRoot([AuthEffects])
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
