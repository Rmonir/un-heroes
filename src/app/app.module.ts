import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DynamicFiltersComponent } from './components/dynamic-filters/dynamic-filters.component';
import { FilterComponent } from './components/filter/filter.component';
import { FilterService } from './services/filter.service';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeroesSearchService } from './services/heroes-search.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClientModule } from '@angular/common/http';
import { CommonService } from './services/common.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  declarations: [
    AppComponent,
    DynamicFiltersComponent,
    FilterComponent,
    SearchPageComponent,
    SearchResultComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    Ng2SearchPipeModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [CommonService,FilterService, HeroesSearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
