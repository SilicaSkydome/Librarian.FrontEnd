import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  form!: FormGroup;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(),
    });
  }

  onSubmit() {
    this.router.navigate(['books'], {
      queryParams: {
        name: this.form.value.name,
      },
    });
  }
}
