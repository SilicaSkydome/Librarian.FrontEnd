import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookPageComponent } from './components/book-page/book-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { UserLibraryComponent } from './components/user-library/user-library.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'books/id/:id', component: BookPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'register', component: RegisterPageComponent},
  {path: 'user/:id/profile', component: UserPageComponent},
  {path: 'user/:id/profile/edit', component: UserEditComponent},
  {path: 'user/:id/library', component: UserLibraryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
