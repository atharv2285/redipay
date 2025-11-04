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
      { name: "Mousami Juice", price: 4000 },
      { name: "Orange Juice", price: 4000 },
      { name: "Apple Shake", price: 5000 },
      { name: "Badam Milk", price: 4000 },
      { name: "Rose Milk", price: 4000 },
      { name: "Khus Milk", price: 4000 },
      { name: "Chocolate Milk", price: 4000 },
      { name: "Cold Coffee", price: 4000 },
      { name: "Mango Shake", price: 5000 },
      { name: "Ice Masala Tea", price: 4000 },
      { name: "Masala Cold Drink", price: 3000 },
      { name: "Rose Sarbat", price: 3000 },
      { name: "Khus Sarbat", price: 3000 },
      { name: "Shakanji", price: 2500 },
      { name: "Lemon Soda", price: 3000 },
      { name: "Sweet Lassi", price: 4000 },
      { name: "Namkin Lassi", price: 4000 },
      { name: "Banana Shake", price: 3000 },
      { name: "Aam Panna", price: 5000 },
      { name: "Papaya Shake", price: 5000 },
      { name: "Watermelon", price: 5000 },
      { name: "Plain Samosa", price: 1500 },
      { name: "Paneer Samosa", price: 2000 },
      { name: "Single Samosa Chat", price: 3000 },
      { name: "Double Samosa Chat", price: 5000 },
      { name: "Chola Samosa Chat", price: 4000 },
      { name: "Papadi Chat", price: 4000 },
      { name: "Paneer Samosa Chat", price: 4000 },
      { name: "Single Bread Samosa", price: 2500 },
      { name: "Double Bread Samosa", price: 5000 },
      { name: "Plain Maggi", price: 3000 },
      { name: "Paneer Maggi", price: 5000 },
      { name: "Butter Maggi", price: 4000 },
      { name: "Milk Maggi", price: 4500 },
      { name: "Extra Masala Maggi", price: 4000 },
      { name: "Atta Maggi", price: 4000 },
      { name: "Atta Maggi Cheese", price: 4500 },
      { name: "Cheese Maggi", price: 5000 },
      { name: "Veg Cheese Maggi", price: 6500 },
      { name: "Plain Chola Kulcha", price: 4000 },
      { name: "Cheese Chola Kulcha", price: 7000 },
      { name: "Peanut Butter Sandwich", price: 4000 },
      { name: "Peanut Sandwich Combo", price: 5000 },
      { name: "Masala Sandwich", price: 4000 },
      { name: "Masala Cheese Sandwich", price: 5000 },
      { name: "Malai Sandwich", price: 4000 },
      { name: "Bread Toast", price: 3000 },
      { name: "Poha", price: 3000 },
      { name: "Chola Poha", price: 5000 },
      { name: "Rabdi", price: 4000 },
      { name: "Gulab Jamun Rabdi", price: 5000 },
      { name: "Pasta", price: 5000 },
      { name: "Pakaudi", price: 4000 },
      { name: "Chips Chat", price: 5000 },
      { name: "Fruit Chat", price: 5000 },
      { name: "Pav Bhaji", price: 4000 },
      { name: "Bhal Puri", price: 2500 },
      { name: "Bread Pakora", price: 3000 },
      { name: "Masala Kachori", price: 4000 },
      { name: "Chat Kachori", price: 3500 },
      { name: "Paneer Patties", price: 4000 },
      { name: "Cheese Patties", price: 3000 },
      { name: "Masala Patties", price: 3000 },
      { name: "Ice Gola", price: 1000 },
      { name: "Tea", price: 1000 },
      { name: "Coffee", price: 2000 },
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
