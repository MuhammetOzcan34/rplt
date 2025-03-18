class CariHesap {
  static add(data) {
    try {
      Logger.log('Gelen veri:', data);

      if (!data.firmaAdi || !data.firmaTuru) {
        throw new Error('Firma adı ve firma türü zorunludur');
      }

      const id = Utilities.getUuid();

      const row = [
        id,
        data.firmaAdi,
        data.subeBolge || '',
        data.firmaTuru,
        data.yetkiliKisi || '',
        data.telefon || '',
        data.email || '',
        0,
        0
      ];

      Logger.log('Oluşturulan satır:', row);

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
      const row = Database.findById('CariHesaplar', id);
      if (!row) {
        throw new Error('Cari hesap bulunamadı');
      }

      const updatedRow = [
        id,
        data.firmaAdi,
        data.subeBolge || '',
        data.firmaTuru,
        data.yetkiliKisi || '',
        data.telefon || '',
        data.email || '',
        row[7],
        row[8]
      ];

      Database.update('CariHesaplar', row.rowIndex, updatedRow);
      return { success: true, message: 'Cari hesap başarıyla güncellendi' };
    } catch (e) {
      Logger.log('Hata:', e.toString());
      throw e;
    }
  }

  static delete(id) {
    try {
      const row = Database.findById('CariHesaplar', id);
      if (!row) {
        throw new Error('Cari hesap bulunamadı');
      }

      Database.delete('CariHesaplar', row.rowIndex);
      return { success: true, message: 'Cari hesap başarıyla silindi' };
    } catch (e) {
      Logger.log('Hata:', e.toString());
      throw e;
    }
  }

  static getList(search = '', pageNumber = 1) {
    try {
      const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('CariHesaplar');
      const data = sheet.getDataRange().getValues();
      data.shift();

      const filteredData = data.filter(row =>
        row[1].toLowerCase().includes(search.toLowerCase())
      );

      const pageSize = 25;
      const startIndex = (pageNumber - 1) * pageSize;
      const pageData = filteredData.slice(startIndex, startIndex + pageSize);

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
      const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('CariHesaplar');
      const data = sheet.getDataRange().getValues();
      data.shift();

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
