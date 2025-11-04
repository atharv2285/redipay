import { type MenuItem, type InsertMenuItem } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getAllMenuItems(): Promise<MenuItem[]>;
  getMenuItem(id: string): Promise<MenuItem | undefined>;
  searchMenuItems(query: string): Promise<MenuItem[]>;
}

export class MemStorage implements IStorage {
  private menuItems: Map<string, MenuItem>;

  constructor() {
    this.menuItems = new Map();
    this.seedMenuItems();
  }

  private seedMenuItems() {
    const items: Omit<MenuItem, "id">[] = [
      { name: "Masala Maggi", price: 4000 },
      { name: "Cheese Maggi", price: 5000 },
      { name: "Plain Maggi", price: 3500 },
      { name: "Bread Omelette", price: 5000 },
      { name: "Bread Butter", price: 3000 },
      { name: "Bread Jam", price: 3500 },
      { name: "Cheese Sandwich", price: 6000 },
      { name: "Veg Sandwich", price: 5000 },
      { name: "Grilled Sandwich", price: 7000 },
      { name: "Tea", price: 2000 },
      { name: "Coffee", price: 2500 },
      { name: "Cold Coffee", price: 8000 },
      { name: "Hot Chocolate", price: 9000 },
      { name: "Lemon Tea", price: 2500 },
      { name: "Green Tea", price: 3000 },
      { name: "Coca Cola", price: 4000 },
      { name: "Pepsi", price: 4000 },
      { name: "Sprite", price: 4000 },
      { name: "Fanta", price: 4000 },
      { name: "Thumbs Up", price: 4000 },
      { name: "Mineral Water", price: 2000 },
      { name: "Pakoda", price: 4500 },
      { name: "Samosa", price: 3000 },
      { name: "Vada Pav", price: 3500 },
      { name: "Pav Bhaji", price: 8000 },
      { name: "Misal Pav", price: 7000 },
      { name: "Poha", price: 5000 },
      { name: "Upma", price: 4500 },
      { name: "Idli Sambar", price: 6000 },
      { name: "Dosa", price: 7000 },
      { name: "Uttapam", price: 7500 },
      { name: "Paratha", price: 6000 },
      { name: "Aloo Paratha", price: 7000 },
      { name: "Paneer Paratha", price: 9000 },
      { name: "Bhel Puri", price: 5000 },
      { name: "Pani Puri", price: 4000 },
      { name: "Sev Puri", price: 5500 },
      { name: "Dahi Puri", price: 6000 },
    ];

    items.forEach(item => {
      const id = randomUUID();
      this.menuItems.set(id, { ...item, id });
    });
  }

  async getAllMenuItems(): Promise<MenuItem[]> {
    return Array.from(this.menuItems.values());
  }

  async getMenuItem(id: string): Promise<MenuItem | undefined> {
    return this.menuItems.get(id);
  }

  async searchMenuItems(query: string): Promise<MenuItem[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.menuItems.values()).filter(item =>
      item.name.toLowerCase().includes(lowerQuery)
    );
  }
}

export const storage = new MemStorage();
