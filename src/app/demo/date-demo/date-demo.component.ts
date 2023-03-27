import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-date-demo',
  templateUrl: './date-demo.component.html',
  styleUrls: ['./date-demo.component.less'],
})
export class DateDemoComponent implements OnInit {
  validateForm: FormGroup;
  configForm: FormArray;
  argumentTypes: any[] = [];

  entity: any;
  constructor(public fb: FormBuilder) {
    this.configForm = this.fb.array([this.createConfigForm()]);
    this.validateForm = this.fb.group({
      id: [null, [Validators.required]],
      config: this.configForm,
    });
    this.argumentTypes = [
      { tipsName: 'name', saveName: 'name' },
      { tipsName: 'week', saveName: 'week' },
    ];
  }

  ngOnInit(): void {
    this.entity = {
      id: 1,
      config: [
        { cKey: 'delay_minutes', cValue: 1698377226340 },
        { cKey: 'test_text', cValue: 1677900422226 },
        { cKey: 'Year', cValue: 1698377226340 },
      ],
    };
    this.keepAtLeast(this.entity.config.length);
    this.validateForm.patchValue(this.entity);
  }
  keepAtLeast(minHostsSize: number): void {
    if (this.configForm.length < minHostsSize) {
      const len = minHostsSize - this.configForm.length;
      for (let j = 0; j < len; j++) {
        this.newConfigForm();
      }
    }
  }
  createConfigForm(): FormGroup {
    return this.fb.group({
      cKey: [null, [Validators.required]],
      cValue: [null, [Validators.required]],
    });
  }
  newConfigForm(): void {
    this.configForm.push(this.createConfigForm());
  }
  removeConfigForm(i: number): void {
    this.configForm.removeAt(i);
  }
  submitForm(): void {
    this.validateForm.markAsDirty();
    this.validateForm.updateValueAndValidity();
    if (this.validateForm.invalid) {
      return;
    }
    const entity = this.validateForm.value;
    entity.config.map((item: any) => {
      const v = item.cValue as Date;

      if (v.getTime) {
        console.log(item, v.getTime());
      }
    });
    console.log('entity:', entity);
  }
  onChange(value: any): void {
    console.log('onChange', value, typeof value);
  }
  typeChange(saveName: string, index: number): void {}
}
