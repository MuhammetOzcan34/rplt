import { relations } from "drizzle-orm";
import {
  date,
  decimal,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  varchar,
} from "drizzle-orm/pg-core";

// Enums
export const firmaTuruEnum = pgEnum("firma_turu", ["Alıcı", "Satıcı"]);
export const teklifDurumuEnum = pgEnum("teklif_durumu", [
  "Beklemede",
  "Onaylandı",
  "Kaybedildi",
  "İptal",
]);
export const projeDurumuEnum = pgEnum("proje_durumu", ["Açık", "Tamamlandı"]);
export const gorevDurumuEnum = pgEnum("gorev_durumu", [
  "Açık",
  "Yapılıyor",
  "Kapalı",
]);

// Cari Hesaplar
export const cariHesaplar = pgTable("cari_hesaplar", {
  id: serial("id").primaryKey(),
  firmaAdi: varchar("firma_adi", { length: 255 }).notNull(),
  subeBolge: varchar("sube_bolge", { length: 255 }),
  firmaTuru: firmaTuruEnum("firma_turu").notNull(),
  yetkiliKisi: varchar("yetkili_kisi", { length: 255 }),
  gorevi: varchar("gorevi", { length: 255 }),
  telefon: varchar("telefon", { length: 50 }),
  email: varchar("email", { length: 255 }),
  createdAt: date("created_at").defaultNow(),
});

// Teklifler
export const teklifler = pgTable("teklifler", {
  id: serial("id").primaryKey(),
  teklifNo: varchar("teklif_no", { length: 50 }).notNull().unique(),
  teklifTuru: varchar("teklif_turu", { length: 50 }).notNull(),
  tarih: date("tarih").notNull(),
  cariHesapId: integer("cari_hesap_id").references(() => cariHesaplar.id),
  teklifKonusu: text("teklif_konusu"),
  yetkiliKisi: varchar("yetkili_kisi", { length: 255 }),
  teklifDurumu: teklifDurumuEnum("teklif_durumu").default("Beklemede"),
  odemeSekli: varchar("odeme_sekli", { length: 255 }),
  gecerlilikSuresi: varchar("gecerlilik_suresi", { length: 50 }),
  toplamTutar: decimal("toplam_tutar", { precision: 15, scale: 2 }).default(
    "0",
  ),
});

// Teklif Kalemleri
export const teklifKalemleri = pgTable("teklif_kalemleri", {
  id: serial("id").primaryKey(),
  teklifId: integer("teklif_id").references(() => teklifler.id),
  urunHizmet: varchar("urun_hizmet", { length: 255 }).notNull(),
  miktar: decimal("miktar", { precision: 15, scale: 2 }),
  birim: varchar("birim", { length: 50 }),
  birimFiyat: decimal("birim_fiyat", { precision: 15, scale: 2 }),
  paraBirimi: varchar("para_birimi", { length: 10 }),
  tutar: decimal("tutar", { precision: 15, scale: 2 }),
  iskonto: decimal("iskonto", { precision: 15, scale: 2 }),
  kdvOrani: decimal("kdv_orani", { precision: 5, scale: 2 }),
  toplamTutar: decimal("toplam_tutar", { precision: 15, scale: 2 }),
});

// Projeler
export const projeler = pgTable("projeler", {
  id: serial("id").primaryKey(),
  projeNo: varchar("proje_no", { length: 50 }).notNull().unique(),
  projeTarihi: date("proje_tarihi").notNull(),
  sonTeslimTarihi: date("son_teslim_tarihi"),
  cariHesapId: integer("cari_hesap_id").references(() => cariHesaplar.id),
  teklifId: integer("teklif_id").references(() => teklifler.id),
  projeKonusu: text("proje_konusu"),
  yetkiliKisi: varchar("yetkili_kisi", { length: 255 }),
  projeDurumu: projeDurumuEnum("proje_durumu").default("Açık"),
  projeTutari: decimal("proje_tutari", { precision: 15, scale: 2 }),
  odemeSekli: varchar("odeme_sekli", { length: 255 }),
});

// Proje Giderleri
export const projeGiderleri = pgTable("proje_giderleri", {
  id: serial("id").primaryKey(),
  projeId: integer("proje_id").references(() => projeler.id),
  giderAdi: varchar("gider_adi", { length: 255 }).notNull(),
  firmaId: integer("firma_id").references(() => cariHesaplar.id),
  aciklama: text("aciklama"),
  miktar: decimal("miktar", { precision: 15, scale: 2 }),
  birim: varchar("birim", { length: 50 }),
  birimFiyat: decimal("birim_fiyat", { precision: 15, scale: 2 }),
  tutar: decimal("tutar", { precision: 15, scale: 2 }),
  iskonto: decimal("iskonto", { precision: 15, scale: 2 }),
  kdvOrani: decimal("kdv_orani", { precision: 5, scale: 2 }),
  toplamTutar: decimal("toplam_tutar", { precision: 15, scale: 2 }),
});

// Görevler
export const gorevler = pgTable("gorevler", {
  id: serial("id").primaryKey(),
  durum: gorevDurumuEnum("durum").default("Açık"),
  gorev: text("gorev").notNull(),
  projeId: integer("proje_id").references(() => projeler.id),
  olusturmaTarihi: date("olusturma_tarihi").defaultNow(),
  not: text("not"),
});

// İlişkiler
export const cariHesaplarRelations = relations(cariHesaplar, ({ many }) => ({
  teklifler: many(teklifler),
  projeler: many(projeler),
  projeGiderleri: many(projeGiderleri),
}));

export const tekliflerRelations = relations(teklifler, ({ one, many }) => ({
  cariHesap: one(cariHesaplar, {
    fields: [teklifler.cariHesapId],
    references: [cariHesaplar.id],
  }),
  kalemler: many(teklifKalemleri),
  projeler: many(projeler),
}));

export const projelerRelations = relations(projeler, ({ one, many }) => ({
  cariHesap: one(cariHesaplar, {
    fields: [projeler.cariHesapId],
    references: [cariHesaplar.id],
  }),
  teklif: one(teklifler, {
    fields: [projeler.teklifId],
    references: [teklifler.id],
  }),
  giderler: many(projeGiderleri),
  gorevler: many(gorevler),
}));
