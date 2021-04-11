import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CarDetail } from 'src/app/models/car-detail';
import { Card } from 'src/app/models/card';
import { Customer } from 'src/app/models/customer';

import { Rental } from 'src/app/models/rental';
import { AuthService } from 'src/app/services/auth.service';
import { CarService } from 'src/app/services/car.service';
import { CardService } from 'src/app/services/card.service';
import { CustomerCardService } from 'src/app/services/customer-card.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  rental: Rental;
  nameOnTheCard: string;
  cardNumber: string;
  cardCvv: string;
  expirationDate:string;
  payment: Card;
  savedCards: Card[]=[];
  cardExist: Boolean = false;
  cardForm: FormGroup;
  selectedCard: Card;
 
  constructor(

    private cardService: CardService,
    private rentalService: RentalService,
    private router:Router,
    private toastrService: ToastrService,
    private customerCreditCardService:CustomerCardService,
    private authService:AuthService,
    private confirmationService: ConfirmationService,
    private config: DynamicDialogConfig,
    private formBuilder:FormBuilder,
    
  ) {}

  ngOnInit(): void {
    this.getRental()
    this.setCreditCardForm();
    this.getSavedCards()
    
  }
  getRental(){
    this.rental = this.config.data.rental
  }

  setCreditCardForm(){
    this.cardForm = this.formBuilder.group({
      savedCards: [""],
      nameOnTheCard: ["",Validators.required],
      cardNumber: ["", Validators.required],
      cardCvv: ["", Validators.required],
      expirationDate: ["", Validators.required],
    })
  }

  async rentACar(card:Card) {
    if(card.moneyInTheCard>=this.rental.totalRentPrice){
     
      this.updateCard(card)
      this.rentalService.addRental(this.rental)
      this.toastrService.success("Arabayı kiraladınız","Işlem başarılı")
      this.router.navigate([''])
      setTimeout(function(){
        location.reload()
      },0)
    
    }else {
      this.toastrService.error("Hata")
    }
  } 
  async rent(){
    if(this.cardForm.valid){
      let card:Card = Object.assign({},this.cardForm.value)
      this.cardExist = await this.isCardExist(card)
      if(this.cardExist){
        let newPayment = await((this.getFakeCardByCardNumber(this.cardNumber))) 
        let wannaSave = await this.isSaved(newPayment)
        if(!wannaSave){
          this.rentACar(newPayment)
        }
      }else{
        this.toastrService.error("Hesap bilgileriniz onaylanmadı","Hata")
      }
    }else{
      this.toastrService.error("Formu doldurmanız gerekli","Hata")
    }
    
  }
  
  async isSaved(card:Card):Promise<boolean>{
    let result = false
    let customerId = this.authService.getCurrentUserId();
    let customerCards = (await this.customerCreditCardService.getByCustomerId(customerId).toPromise()).data
    let isContains = customerCards.map(c => c.cardId).includes(card.id)
    if(!isContains){
      this.wannaSave(card)
      result =  true
    }
    return result
  }
  wannaSave(card:Card){
    this.confirmationService.confirm({
      message:'Kartınız sistemde kayıtlı değil kaydetmek ister misiniz?',
      accept: () => {
        this.saveCard(card)
        this.rentACar(card)
      },
      reject: () => {
        this.rentACar(card)
      }
    })
  }
  saveCard(card:Card){
    this.customerCreditCardService.saveCard(card).subscribe((response) => {
      this.toastrService.success(response.message, 'Başarılı');
    });
  }


  saveCreditCard(card:Card){
    this.customerCreditCardService.saveCard(card).subscribe((response)=>{
      this.toastrService.success(response.message,"Kaydedildi")
    })
  }
  async getSavedCards(){
    let customerId = this.authService.getCurrentUserId();
    let customerCards = (await this.customerCreditCardService.getByCustomerId(customerId).toPromise()).data
    customerCards.forEach(card => {
      this.cardService.getCardById(card.cardId).subscribe(response => {
        this.savedCards.push(response.data)
      })
    });
  }
  async isCardExist(card: Card) {
    return (await this.cardService.isCardExist(card).toPromise()).success;
  }
  setCardInfos(){
    this.cardForm.patchValue(
      this.selectedCard
    )
  }

  async getFakeCardByCardNumber(cardNumber:string):Promise<Card>{
    return (await (this.cardService.getCardByNumber(cardNumber)).toPromise()).data[0]
  }

  updateCard(card:Card){
    this.cardService.updateCard(card).subscribe();
  }
}