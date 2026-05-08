import { Component, EventEmitter, inject, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormArray, FormGroup, FormGroupDirective, NgForm, Validators, ReactiveFormsModule } from '@angular/forms';

import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ShipmentService } from '../../core/services/shipment.service';
import { COST_TYPES, CostTypeName } from '../../core/models/cost.model';

// Shows errors only when the field has been explicitly touched —
// not when the form is in a "submitted" state. This prevents validation
// errors from flashing on the freshly-reset empty form after a successful submit.
class TouchedErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: AbstractControl | null, _form: FormGroupDirective | NgForm | null): boolean {
    return !!(control?.invalid && control?.touched);
  }
}

@Component({
  selector: 'app-create-shipment',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  providers: [{ provide: ErrorStateMatcher, useClass: TouchedErrorStateMatcher }],
  templateUrl: './create-shipment.component.html',
  styleUrl: './create-shipment.component.scss',
})
export class CreateShipmentComponent {
  private readonly fb = inject(FormBuilder);
  private readonly shipmentService = inject(ShipmentService);

  @Output() shipmentCreated = new EventEmitter<void>();

  readonly costTypes = COST_TYPES;

  form = this.fb.group({
    shipmentRef: ['', Validators.required],
    description: ['', Validators.required],
    incomeAmount: [null as number | null, Validators.min(0)],
    costs: this.fb.array([this.buildCostRow()]),
  });

  errorMessage = '';
  successMessage = '';
  submitting = false;

  get costsArray(): FormArray {
    return this.form.get('costs') as FormArray;
  }

  costRowAt(i: number): FormGroup {
    return this.costsArray.at(i) as FormGroup;
  }

  private buildCostRow(): FormGroup {
    return this.fb.group({
      amount: [null as number | null, [Validators.required, Validators.min(0)]],
      costTypeName: ['', Validators.required],
    });
  }

  addCost(): void {
    this.costsArray.push(this.buildCostRow());
  }

  removeCost(index: number): void {
    if (this.costsArray.length > 1) {
      this.costsArray.removeAt(index);
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const val = this.form.value;

    const shipment = {
      shipmentRef: val.shipmentRef!,
      description: val.description!,
      shipmentDate: new Date().toISOString().split('T')[0],
      incomes: val.incomeAmount != null && val.incomeAmount > 0
        ? [{ amount: val.incomeAmount }]
        : [],
      costs: (val.costs ?? []).map((c) => ({
        amount: c.amount ?? 0,
        additionalCost: 0,
        costTypeName: c.costTypeName as CostTypeName,
      })),
    };

    this.shipmentService.create(shipment).subscribe({
      next: (created) => {
        this.submitting = false;
        this.successMessage = `Shipment "${created.shipmentRef}" created successfully.`;
        this.shipmentCreated.emit();
        this.resetForm();
      },
      error: (err: Error) => {
        this.submitting = false;
        this.errorMessage = err.message || 'Failed to create shipment. Please try again.';
      },
    });
  }

  private resetForm(): void {
    this.form = this.fb.group({
      shipmentRef: ['', Validators.required],
      description: ['', Validators.required],
      incomeAmount: [null as number | null, Validators.min(0)],
      costs: this.fb.array([this.buildCostRow()]),
    });
  }
}
