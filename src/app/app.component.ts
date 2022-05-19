import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Person } from './person';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  persons = null;
  filter: string = '';
  nbrow: number = 0;
  filters: string[] = [];
  constructor(private http: HttpClient) {
    this.getData();
  }
  async changeFilter(e: any) {
    this.filter = e.value;
    this.getData();
  }
  async getData() {
    this.http.get<Person[]>(`http://localhost:3000/informations/${this.filter}`)
    .subscribe((data) => {
      // @ts-ignore
      this.persons = data.data;
      // @ts-ignore
      this.nbrow = data.count?.total_rows;
      this.getFilters();
    })
  }
  getFilters() {
    // @ts-ignore
    Object.keys(this.persons[0]).map((key, value) => {
      this.filters.push(key)
    })
  }
}
