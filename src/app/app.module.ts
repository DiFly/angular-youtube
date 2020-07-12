import { YouTubeSearchService } from './service/you-tube-search.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { youTubeSearchInjectables } from './injectables/you-tube-search.injectables';
import { YouTubeSearchComponent } from './component/you-tube-search/you-tube-search.component';
import { SearchResultComponent } from './component/search-result/search-result.component';
import { SearchBoxComponent } from './component/search-box/search-box.component';

@NgModule({
  declarations: [
    AppComponent,
    YouTubeSearchComponent,
    SearchResultComponent,
    SearchBoxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    youTubeSearchInjectables, // How use this injection?
    YouTubeSearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
