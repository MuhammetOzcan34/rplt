// Enums
const firmaTuruEnum = ["Alıcı", "Satıcı"];
const teklifDurumuEnum = ["Beklemede", "Onaylandı", "Kaybedildi", "İptal"];
const projeDurumuEnum = ["Açık", "Tamamlandı"];
const gorevDurumuEnum = ["Açık", "Yapılıyor", "Kapalı"];

// Cari Hesaplar
const cariHesaplar = [
  "id",
  "firmaAdi",
  "subeBolge",
  "firmaTuru",
  "yetkiliKisi",
  "gorevi",
  "telefon",
  "email",
  "createdAt"
];

// Teklifler
const teklifler = [
  "id",
  "teklifNo",
  "teklifTuru",
  "tarih",
  "cariHesapId",
  "teklifKonusu",
  "yetkiliKisi",
  "teklifDurumu",
  "odemeSekli",
  "gecerlilikSuresi",
  "toplamTutar"
];

// Teklif Kalemleri
const teklifKalemleri = [
  "id",
  "teklifId",
  "urunHizmet",
  "miktar",
  "birim",
  "birimFiyat",
  "paraBirimi",
  "tutar",
  "iskonto",
  "kdvOrani",
  "toplamTutar"
];

// Projeler
const projeler = [
  "id",
  "projeNo",
  "projeTarihi",
  "sonTeslimTarihi",
  "cariHesapId",
  "teklifId",
  "projeKonusu",
  "yetkiliKisi",
  "projeDurumu",
  "projeTutari",
  "odemeSekli"
];

// Proje Giderleri
const projeGiderleri = [
  "id",
  "projeId",
  "giderAdi",
  "firmaId",
  "aciklama",
  "miktar",
  "birim",
  "birimFiyat",
  "tutar",
  "iskonto",
  "kdvOrani",
  "toplamTutar"
];

// Görevler
const gorevler = [
  "id",
  "durum",
  "gorev",
  "projeId",
  "olusturmaTarihi",
  "not"
];

// İlişkiler (Google Apps Script'te ilişkiler manuel olarak işlenmelidir)
const cariHesaplarRelations = {
  teklifler: [],
  projeler: [],
  projeGiderleri: []
};

const tekliflerRelations = {
  cariHesap: {},
  kalemler: [],
  projeler: []
};

const projelerRelations = {
  cariHesap: {},
  teklif: {},
  giderler: [],
  gorevler: []
};
