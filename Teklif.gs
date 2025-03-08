class Teklif {
  static getList(search = '', pageNumber = 1) {
    try {
      const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('Teklifler');
      const data = sheet.getDataRange().getValues();
      data.shift(); // Başlık satırını çıkar

      // Filtreleme
      const filteredData = data.filter(row =>
        row[1].toString().toLowerCase().includes(search.toLowerCase())
      );

      // Sayfalama
      const pageSize = 25;
      const startIndex = (pageNumber - 1) * pageSize;
      const pageData = filteredData.slice(startIndex, startIndex + pageSize);

      return {
        data: pageData.map(row => ({
          id: row[0],
          teklifNo: row[1],
          teklifTuru: row[2],
          tarih: row[3],
          firmaAdi: row[4],
          teklifKonusu: row[5],
          yetkiliKisi: row[6],
          teklifDurumu: row[7],
          odemeKosulu: row[8],
          gecerlilikSuresi: row[9],
          toplamTutar: row[10]
        })),
        totalItems: filteredData.length,
        pageNumber: pageNumber,
        pageSize: pageSize
      };
    } catch (e) {
      Logger.log('Hata:', e.toString());
      throw e;
    }
  }

  static add(data) {
    try {
      // Gerekli alanların kontrolü
      if (!data.teklifTuru || !data.firmaAdi || !data.teklifKonusu) {
        throw new Error('Zorunlu alanlar eksik: teklifTuru, firmaAdi, teklifKonusu');
      }

      const id = Utilities.getUuid();
      const teklifNo = (data.teklifTuru === 'Verilen' ? 'FT' : 'ST') +
        (Database.getAll('Teklifler').length + 1).toString().padStart(4, '0');

      const row = [
        id,
        teklifNo,
        data.teklifTuru,
        Utilities.formatDate(new Date()),
        data.firmaAdi,
        data.teklifKonusu,
        data.yetkiliKisi,
        'Beklemede', // Varsayılan durum
        data.odemeKosulu,
        data.gecerlilikSuresi,
        data.toplamTutar
      ];

      Database.insert('Teklifler', row);
      return { success: true, message: 'Teklif başarıyla eklendi', id: id };
    } catch (e) {
      Logger.log('Hata:', e.toString());
      return { success: false, message: e.message };
    }
  }

  static update(id, data) {
    try {
      const row = Database.findById('Teklifler', id);
      if (!row) throw new Error('Teklif bulunamadı');

      const updatedRow = [
        id,
        row[1], // Teklif no değişmez
        data.teklifTuru,
        row[3], // Tarih değişmez
        data.firmaAdi,
        data.teklifKonusu,
        data.yetkiliKisi,
        data.teklifDurumu,
        data.odemeKosulu,
        data.gecerlilikSuresi,
        data.toplamTutar
      ];

      Database.update('Teklifler', row.rowIndex, updatedRow);
      return { success: true, message: 'Teklif başarıyla güncellendi' };
    } catch (e) {
      Logger.log('Hata:', e.toString());
      return { success: false, message: e.message };
    }
  }

  static delete(id) {
    try {
      const row = Database.findById('Teklifler', id);
      if (!row) throw new Error('Teklif bulunamadı');

      Database.delete('Teklifler', row.rowIndex);
      return { success: true, message: 'Teklif başarıyla silindi' };
    } catch (e) {
      Logger.log('Hata:', e.toString());
      return { success: false, message: e.message };
    }
  }
}

function loadTeklifVerileri() {
  try {
    const firmalarSheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('CariHesaplar');
    const firmalar = firmalarSheet.getDataRange().getValues().map(row => ({ id: row[0], ad: row[1] }));

    const yetkililerSheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('CariHesaplar');
    const yetkililer = yetkililerSheet.getDataRange().getValues().map(row => ({ id: row[0], ad: row[4] }));

    const alinanTekliflerSheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('Teklifler');
    const alinanTeklifler = alinanTekliflerSheet.getDataRange().getValues().map(row => ({ id: row[0], ad: row[5] }));

    return { firmalar, yetkililer, alinanTeklifler };
  } catch (e) {
    Logger.log('Hata:', e.toString());
    throw e;
  }
}
