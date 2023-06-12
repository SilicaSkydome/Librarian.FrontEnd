import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select'
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { BookPageComponent } from './components/book-page/book-page.component';
import { BookCardComponent } from './components/book-card/book-card.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { UserLibraryComponent } from './components/user-library/user-library.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { AddBookPageComponent } from './components/add-book-page/add-book-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChapterLineComponent } from './components/chapter-line/chapter-line.component';
import { ChapterPageComponent } from './components/chapter-page/chapter-page.component';
import { BookSearchComponent } from './components/book-search/book-search.component';
import { BookLineComponent } from './components/book-line/book-line.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainPageComponent,
    SearchBarComponent,
    FooterComponent,
    BookPageComponent,
    BookCardComponent,
    LoginPageComponent,
    RegisterPageComponent,
    UserPageComponent,
    UserLibraryComponent,
    UserEditComponent,
    AddBookPageComponent,
    ChapterLineComponent,
    ChapterPageComponent,
    BookSearchComponent,
    BookLineComponent
  ],
  imports: [
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
