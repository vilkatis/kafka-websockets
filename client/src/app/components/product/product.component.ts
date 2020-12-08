import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IEvent } from '../../models';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Output() public fireEvent = new EventEmitter<IEvent>();
  public filterForm: FormGroup;
  public addForm: FormGroup;

  constructor(private _fb: FormBuilder) {
  }

  public ngOnInit() {
    this.addForm = this._fb.group({
      productName: [null, Validators.required]
    });
  }

  public onAddFormSubmit() {
    this.fireEvent.emit({
      type: 'user',
      action: {
        type: 'addProduct',
        payload: this.addForm.value['productName']
      }
    });
    this.addForm.reset();
  }
}
