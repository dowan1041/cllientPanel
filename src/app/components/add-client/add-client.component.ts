import { SettingsService } from './../../services/settings.service';
import { ClientService } from './../../services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from './../../models/Client';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  }

  @ViewChild('clientForm', {static: false}) form: any;
  disableBalanceOnAdd: boolean;
  constructor(
    private flashMessage: FlashMessagesService,
    private clientService: ClientService,
    private router: Router,
    private settingsService: SettingsService
    ) { }

  ngOnInit() {
    this.disableBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAdd;
  }
  onSubmit({value, valid} : {value: Client, valid: boolean}) {
    if(this.disableBalanceOnAdd) {
      value.balance = 0
    }

    if(!valid) {
      //show error
      this.flashMessage.show('Pelase fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 4000
      })

    } else {
      //Add new Client
      this.clientService.newClient(value);
      //Show message
      this.flashMessage.show('New client is added', {
        cssClass: 'alert-success', timeout: 4000
      })
      //Redirect to dash
      this.router.navigate(['/'])
    }
  }
}
