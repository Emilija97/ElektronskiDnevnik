import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

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
import { reducers } from "./store/state/app.states";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdministratorComponent,
    StudentComponent,
    SignupComponent,
    HomepageComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([AuthEffects])
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
