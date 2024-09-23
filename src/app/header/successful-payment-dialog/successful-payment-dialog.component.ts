import { Component, HostBinding, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AppState } from '../../store/product.reducer';
import { Store } from '@ngrx/store';
import {   Observable, Subject, takeUntil } from 'rxjs';
import { CartComponent } from '../cart/cart/cart.component';
import { FormArray, FormBuilder, FormGroup,  Validators } from '@angular/forms';


@Component({
  selector: 'app-successful-payment-dialog',
  templateUrl: './successful-payment-dialog.component.html',
  styleUrl: './successful-payment-dialog.component.scss'
})
export class SuccessfulPaymentDialogComponent implements OnInit, OnDestroy{
  cardDatasIsTrue: boolean = false;
  cartList$! : Observable<any>;
  isTrue$ : Observable<boolean>;
  cart = inject(MatDialogRef<CartComponent>)
  cardTrue :Boolean = false;
  count :number = 0;
  isValid : boolean = false;
  protected formGroup!:FormGroup;
  private unsubscribeAll:Subject<void> = new Subject<void>();
  formData: any ;

  constructor(private store: Store<AppState>, private fb: FormBuilder){
    this.formGroup = this.fb.group({
      firstName: ['', Validators.required],
      secondName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      postCode: ['', Validators.required],
      cardUserName: ['', Validators.required],
      cardNumber: ['', Validators.required, ],
      cardDataDate: ['', Validators.required],
      cardDateMonthYear: ['', Validators.required],
      cardDateCvc: ['', Validators.required],
      withCardDatas: this.fb.array([]),
      withOutCardDatas: this.fb.array([])

    });



  }

  get withCardDatas(){
    return this.formGroup.controls["withCardDatas"] as FormArray;
  }
  get withOutCardDatas(){
    return this.formGroup.controls["withOutCardDatas"] as FormArray;
  }




  ngOnInit(): void {
    this.formGroup.get('cardNumber').valueChanges
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe((text:string) => {
      let formattedText = this.formatCardNumber(text);
      this.formGroup.get('cardNumber')?.setValue(formattedText, { emitEvent: false })

    });
    this.formGroup.get('cardDateMonthYear').valueChanges
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe((text:string) => {
      let formattedText = this.formatCardDateMonthYear(text);
      this.formGroup.get('cardDateMonthYear')?.setValue(formattedText, { emitEvent: false })
    });
    this.formGroup.get('cardDataDate').valueChanges
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe((text:string) => {
      let formattedText = this.formatCleaner(text);
      this.formGroup.get('cardDataDate')?.setValue(formattedText, { emitEvent: false })
    });
    this.formGroup.get('cardDateCvc').valueChanges
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe((text:string) => {
      let formattedText = this.formatCleaner(text);
      this.formGroup.get('cardDateCvc')?.setValue(formattedText, { emitEvent: false })
    });

    this.withCardDatas.push(this.fb.group({
      firstName: ['', Validators.required],
      secondName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      cardUserName: ['', Validators.required],
      cardNumber: ['', Validators.required, ],
      cardDataDate: ['', Validators.required],
      cardDateMonthYear: ['', Validators.required],
      cardDateCvc: ['', Validators.required],
    })
  )

    this.withOutCardDatas.push(this.fb.group({
      firstName: ['', Validators.required],
      secondName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      postCode: ['', Validators.required],
    })
  )

  }

  formatCardNumber(text: string): string {
    const cleaned = text.replace(/\D+/g, ''); //a nem számjegy karakterek eltávolítása az input mezőbe beírt szövegből.

    return cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
  }
  formatCardDateMonthYear(text: string): string {
    const cleaned = text.replace(/\D+/g, ''); //a nem számjegy karakterek eltávolítása az input mezőbe beírt szövegből.

    return cleaned.match(/.{1,2}/g)?.join('/') || cleaned;
  }
  formatCleaner(text: string): string {
    const cleaned = text.replace(/\D+/g, ''); //a nem számjegy karakterek eltávolítása az input mezőbe beírt szövegből.

    return  cleaned;
  }
  ngOnDestroy(): void {

  }

  cardDatas(){
    this.cardDatasIsTrue = true;
  }

  payment(){
    console.log(this.formGroup.value);
    /* this.store.dispatch(deleteAllProductsFromCart());
    this.cartList$ = this.store.select(cartProductList).pipe();
    this.isTrue$ = this.cartList$.pipe(
      map(cartList => cartList.length === 0)
    );
    this.cardTrue = false; */
  }

  close(){
    this.cart.close()
    this.cardTrue = false
  }

  isCardTrue(){
    this.cardTrue = true
  }
  isCardNotTrue(){
    this.cardTrue = false


  }




}
