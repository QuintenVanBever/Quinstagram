import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { LoginComponent } from "./user/login/login.component";
import { HomeComponent } from "./home/home.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { RegisterComponent } from "./user/register/register.component";
import { AddPostComponent } from "./post/add-post/add-post.component";
import { SelectivePreloadStrategy } from "./selective-preload-strategy";
import { AuthGuard } from "./user/auth.guard";
import { ContentContainerComponent } from "./content-container/content-container.component";
import { PostDetailComponent } from "./post/post-detail/post-detail.component";

const appRoutes: Routes = [
  { path: "posts", component: ContentContainerComponent },
  {
    path: "posts/upload",
    component: AddPostComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "posts/:id",
    component: PostDetailComponent,
    data: { preload: true }
  },
 
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },

  { path: "", component: HomeComponent },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      preloadingStrategy: SelectivePreloadStrategy
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
