import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { IRootState, REDUCERS } from './store';
import { EFFECTS } from './store/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { COMPONENTS } from './components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const metaReducers: MetaReducer<IRootState>[] = [];

@NgModule({
  declarations: [
    ...COMPONENTS,
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(REDUCERS, {
      metaReducers,
      runtimeChecks: {
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: true
      }
    }),
    StoreDevtoolsModule.instrument({
      name: 'Investing - Homework'
    }),
    EffectsModule.forRoot(EFFECTS)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
