class CariHesap {
  static add(data) {
    try {
      Logger.log('Gelen veri:', data);

      // Gerekli alanların kontrolü
      if (!data.firmaAdi || !data.firmaTuru) {
        throw new Error('Firma adı ve firma türü zorunludur');
      }

      // Yeni bir UUID oluştur
      const id = Utilities.getUuid();

      // Google Sheets'e eklenecek satır
      const row = [
        id,
        data.firmaAdi,
        data.subeBolge || '',
        data.firmaTuru,
        data.yetkiliKisi || '',
        data.telefon || '',
        data.email || '',
        0, // Görev sayısı (varsayılan değer)
        0  // Proje sayısı (varsayılan değer)
      ];

      Logger.log('Oluşturulan satır:', row);

      // Veritabanına ekleme işlemi
      if (Database.insert('CariHesaplar', row)) {
        return {
          success: true,
          message: 'Cari hesap başarıyla eklendi',
          id: id
        };
      } else {
        throw new Error('Veri eklenemedi');
      }
    } catch (e) {
      Logger.log('Hata:', e.toString());
      throw e;
    }
  }

  static update(id, data) {
    try {
      // Veritabanında ilgili satırı bul
      const row = Database.findById('CariHesaplar', id);
      if (!row) {
        throw new Error('Cari hesap bulunamadı');
      }

      // Güncellenecek satır
      const updatedRow = [
        id,
        data.firmaAdi,
        data.subeBolge || '',
        data.firmaTuru,
        data.yetkiliKisi || '',
        data.telefon || '',
        data.email || '',
        row[7], // Görev sayısı (değişmez)
        row[8]  // Proje sayısı (değişmez)
      ];

      // Veritabanını güncelle
      Database.update('CariHesaplar', row.rowIndex, updatedRow);
      return { success: true, message: 'Cari hesap başarıyla güncellendi' };
    } catch (e) {
      Logger.log('Hata:', e.toString());
      throw e;
    }
  }

  static delete(id) {
    try {
      // Veritabanında ilgili satırı bul
      const row = Database.findById('CariHesaplar', id);
      if (!row) {
        throw new Error('Cari hesap bulunamadı');
      }

      // Veritabanından satırı sil
      Database.delete('CariHesaplar', row.rowIndex);
      return { success: true, message: 'Cari hesap başarıyla silindi' };
    } catch (e) {
      Logger.log('Hata:', e.toString());
      throw e;
    }
  }

  static getList(search = '', pageNumber = 1) {
    try {
      // Google Sheets'ten verileri çek
      const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('CariHesaplar');
      const data = sheet.getDataRange().getValues();
      data.shift(); // Başlık satırını çıkar

      // Arama terimine göre filtreleme
      const filteredData = data.filter(row =>
        row[1].toLowerCase().includes(search.toLowerCase())
      );

      // Sayfalama işlemi
      const pageSize = 25;
      const startIndex = (pageNumber - 1) * pageSize;
      const pageData = filteredData.slice(startIndex, startIndex + pageSize);

      // Verileri JSON formatına dönüştür
      return pageData.map(row => ({
        id: row[0],
        firmaAdi: row[1],
        subeBolge: row[2],
        firmaTuru: row[3],
        yetkiliKisi: row[4],
        telefon: row[5],
        email: row[6],
        gorevSayisi: row[7],
        projeSayisi: row[8]
      }));
    } catch (e) {
      Logger.log('Hata:', e.toString());
      throw e;
    }
  }

  static getCariHesaplar() {
    try {
      // Google Sheets'ten tüm cari hesapları çek
      const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('CariHesaplar');
      const data = sheet.getDataRange().getValues();
      data.shift(); // Başlık satırını çıkar

      // Verileri JSON formatına dönüştür
      return data.map(row => ({
        id: row[0],
        firmaAdi: row[1],
        subeBolge: row[2],
        firmaTuru: row[3],
        yetkiliKisi: row[4],
        telefon: row[5],
        email: row[6],
        gorevSayisi: row[7],
        projeSayisi: row[8]
      }));
    } catch (e) {
      Logger.log('Hata:', e.toString());
      throw e;
    }
  }
}
