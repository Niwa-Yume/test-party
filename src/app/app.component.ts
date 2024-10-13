import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

interface Item {

  name: string;

  category: 'Food' | 'Drink' | 'Other';

  description: string;

  quantity: number;

}

@Component({

  selector: 'app-root',

  standalone: true,

  imports: [CommonModule, FormsModule],

  templateUrl: './app.component.html',

  styleUrls: ['./app.component.css']

})

export class AppComponent {

  name: string = '';

  newItem: Item = { name: '', category: 'Food', description: '', quantity: 1 };

  items: Item[] = [];

  onSubmit() {

    if (this.name && this.newItem.name && this.newItem.quantity > 0) {

      this.items.push({ ...this.newItem });

      this.newItem = { name: '', category: 'Food', description: '', quantity: 1 };

    }

  }

}