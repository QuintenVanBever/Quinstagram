import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { httpInterceptorProviders } from "./http-interceptors";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

//Modules
import { AppRoutingModule } from "./app-routing.module";
import { PostModule } from "./post/post.module";
import { UserModule } from "./user/user.module";
import { MaterialModule } from './material/material.module';

//Components
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './user/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    UserModule,
    PostModule,
    AppRoutingModule
  ],
  providers: [httpInterceptorProviders, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
