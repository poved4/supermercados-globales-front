import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-inventory-table',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './inventory-table.component.html',
  styleUrl: './inventory-table.component.css'
})
export class InventoryTableComponent {

  @Input() inventory!: any[];

}
