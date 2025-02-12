import { eq } from 'drizzle-orm';
import { db } from './db';
import * as schema from '../shared/schema';

export class DatabaseStorage {
  // Cari Hesap İşlemleri
  async getCariHesap(id: number) {
    const [cariHesap] = await db
      .select()
      .from(schema.cariHesaplar)
      .where(eq(schema.cariHesaplar.id, id));
    return cariHesap;
  }

  async getCariHesaplar() {
    return await db.select().from(schema.cariHesaplar);
  }

  async createCariHesap(data: any) {
    const [cariHesap] = await db
      .insert(schema.cariHesaplar)
      .values(data)
      .returning();
    return cariHesap;
  }

  async updateCariHesap(id: number, data: any) {
    const [updated] = await db
      .update(schema.cariHesaplar)
      .set(data)
      .where(eq(schema.cariHesaplar.id, id))
      .returning();
    return updated;
  }

  async deleteCariHesap(id: number) {
    await db
      .delete(schema.cariHesaplar)
      .where(eq(schema.cariHesaplar.id, id));
    return true;
  }

  // Teklif İşlemleri
  async getTeklif(id: number) {
    const [teklif] = await db
      .select()
      .from(schema.teklifler)
      .where(eq(schema.teklifler.id, id));
    return teklif;
  }

  async getTeklifler() {
    return await db.select().from(schema.teklifler);
  }

  async createTeklif(data: any) {
    const [teklif] = await db
      .insert(schema.teklifler)
      .values(data)
      .returning();
    return teklif;
  }

  // Proje İşlemleri
  async getProje(id: number) {
    const [proje] = await db
      .select()
      .from(schema.projeler)
      .where(eq(schema.projeler.id, id));
    return proje;
  }

  async getProjeler() {
    return await db.select().from(schema.projeler);
  }

  async createProje(data: any) {
    const [proje] = await db
      .insert(schema.projeler)
      .values(data)
      .returning();
    return proje;
  }

  // Görev İşlemleri
  async getGorev(id: number) {
    const [gorev] = await db
      .select()
      .from(schema.gorevler)
      .where(eq(schema.gorevler.id, id));
    return gorev;
  }

  async getGorevler() {
    return await db.select().from(schema.gorevler);
  }

  async createGorev(data: any) {
    const [gorev] = await db
      .insert(schema.gorevler)
      .values(data)
      .returning();
    return gorev;
  }
}

export const storage = new DatabaseStorage();
