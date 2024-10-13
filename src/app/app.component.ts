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

  constructor() {
    this.loadItems(); // Charger les éléments depuis le localStorage au démarrage
    window.addEventListener('storage', this.syncItems.bind(this)); // Écouter les changements de localStorage
  }

  onSubmit() {
    if (this.name && this.newItem.name && this.newItem.quantity > 0) {
      this.items.push({ ...this.newItem });
      this.saveItems(); // Sauvegarder les éléments dans le localStorage
      this.newItem = { name: '', category: 'Food', description: '', quantity: 1 };
    }
  }

  removeItem(item: Item) {
    this.items = this.items.filter(i => i !== item);
    this.saveItems(); // Sauvegarder les éléments après suppression
  }

  increaseQuantity(item: Item) {
    item.quantity++;
    this.saveItems(); // Sauvegarder les éléments après augmentation de quantité
  }

  saveItems() {
    localStorage.setItem('items', JSON.stringify(this.items)); // Convertir les éléments en JSON et les sauvegarder
  }

  loadItems() {
    const storedItems = localStorage.getItem('items'); // Récupérer les éléments du localStorage
    if (storedItems) {
      this.items = JSON.parse(storedItems); // Convertir le JSON en tableau d'objets
    }
  }

  syncItems(event: StorageEvent) {
    if (event.key === 'items') {
      this.items = JSON.parse(event.newValue || '[]'); // Mettre à jour les éléments avec les nouvelles données
    }
  }

}
