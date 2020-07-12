import { Component, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';

import { fromEvent } from 'rxjs';
import { debounceTime, map, filter, tap, switchMap, mergeAll } from 'rxjs/operators';

import { YouTubeSearchService } from './../../service/you-tube-search.service';
import { SearchResult } from './../../class/search-result';

@Component({
  selector: 'app-search-box',
  template: `<input type='text' class="form-control my-2 mr-sm-0" placeholder='Search...' autofocus />`,
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() results: EventEmitter<SearchResult[]> = new EventEmitter<SearchResult[]>();

  constructor(
    private youtube: YouTubeSearchService,
    private el: ElementRef
  ) { }

  ngOnInit(): void {
    fromEvent(this.el.nativeElement, 'keyup').pipe(
      tap((s: any) => console.log(s.target.value)),
      map((e: any) => e.target.value),
      filter((text: string) => text.length > 1),
      debounceTime(250),
      tap(() => this.loading.emit(true)),
      map((query: string) => this.youtube.search(query)),
      mergeAll() // switchMap((query: string) => this.youtube.search(query))
    ).subscribe(
      (results: SearchResult[]) => {
        this.loading.emit(false);
        this.results.emit(results);
      },
      (err: any) => {
        console.log(err);
        this.loading.emit(false);
      },
      () => {
        this.loading.emit(false);
      }
    );
  }
}
