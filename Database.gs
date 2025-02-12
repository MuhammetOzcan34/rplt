// Veritabanı işlemleri
class Database {
  static getSheet(sheetName) {
    try {
      Logger.log('getSheet çağrıldı: ' + sheetName);
      Logger.log('SHEET_ID: ' + SHEET_ID);

      // Google Sheets'e erişimi kontrol et
      if (!SHEET_ID) {
        throw new Error('SHEET_ID tanımlanmamış');
      }

      // Spreadsheet'i aç
      const ss = SpreadsheetApp.openById(SHEET_ID);
      if (!ss) {
        throw new Error('Spreadsheet açılamadı');
      }
      Logger.log('Spreadsheet başarıyla açıldı');

      // Sayfayı kontrol et
      const sheet = ss.getSheetByName(sheetName);
      if (!sheet) {
        Logger.log(`Hata: "${sheetName}" sayfası bulunamadı`);
        // Sayfayı otomatik oluştur
        const newSheet = ss.insertSheet(sheetName);
        // Başlık satırını ekle
        const headers = ['ID', 'Firma Adı', 'Şube/Bölge', 'Firma Türü', 'Yetkili Kişi', 'Telefon', 'Email', 'Görev Sayısı', 'Proje Sayısı'];
        newSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
        Logger.log(`"${sheetName}" sayfası oluşturuldu`);
        return newSheet;
      }

      Logger.log(`"${sheetName}" sayfası başarıyla açıldı`);
      return sheet;
    } catch (e) {
      Logger.log('getSheet Hatası: ' + e.toString());
      throw new Error('Google Sheets bağlantısı kurulamadı: ' + e.message);
    }
  }

  static getAll(sheetName) {
    try {
      Logger.log(`getAll çağrıldı: ${sheetName}`);
      const sheet = this.getSheet(sheetName);

      // Veri aralığını kontrol et
      const lastRow = sheet.getLastRow();
      const lastCol = sheet.getLastColumn();
      Logger.log(`Son satır: ${lastRow}, Son sütun: ${lastCol}`);

      if (lastRow <= 1) {
        Logger.log('Tabloda veri yok, sadece başlık var');
        return [];
      }

      const data = sheet.getDataRange().getValues();
      Logger.log(`${sheetName} verisi yüklendi: ${data.length} satır`);
      Logger.log('İlk satır örneği: ' + JSON.stringify(data[0]));

      // Header hariç tüm verileri döndür
      if (data.length > 1) {
        const rows = data.slice(1);
        Logger.log(`Döndürülen veri sayısı: ${rows.length}`);
        return rows;
      }
      return [];
    } catch (e) {
      Logger.log('getAll Hatası: ' + e.toString());
      throw new Error('Veri yüklenemedi: ' + e.message);
    }
  }

  static insert(sheetName, data) {
    try {
      Logger.log(`insert çağrıldı: ${sheetName}`);
      Logger.log('Eklenecek veri: ' + JSON.stringify(data));
      const sheet = this.getSheet(sheetName);
      sheet.appendRow(data);
      Logger.log('Veri başarıyla eklendi');
      return true;
    } catch (e) {
      Logger.log('insert Hatası: ' + e.toString());
      throw e;
    }
  }

  static update(sheetName, rowIndex, data) {
    try {
      Logger.log(`update çağrıldı: ${sheetName}, satır: ${rowIndex}`);
      Logger.log('Güncellenecek veri: ' + JSON.stringify(data));
      const sheet = this.getSheet(sheetName);
      const range = sheet.getRange(rowIndex, 1, 1, data.length);
      range.setValues([data]);
      Logger.log('Veri başarıyla güncellendi');
      return true;
    } catch (e) {
      Logger.log('update Hatası: ' + e.toString());
      throw e;
    }
  }

  static delete(sheetName, rowIndex) {
    try {
      Logger.log(`delete çağrıldı: ${sheetName}, satır: ${rowIndex}`);
      const sheet = this.getSheet(sheetName);
      sheet.deleteRow(rowIndex);
      Logger.log('Satır başarıyla silindi');
      return true;
    } catch (e) {
      Logger.log('delete Hatası: ' + e.toString());
      throw e;
    }
  }

  static findById(sheetName, id) {
    try {
      Logger.log(`findById çağrıldı: ${sheetName}, id: ${id}`);
      const data = this.getAll(sheetName);
      const row = data.find(row => row[0] === id);
      if (row) {
        row.rowIndex = data.indexOf(row) + 2; // Header + 0-based index düzeltmesi
      }
      return row;
    } catch (e) {
      Logger.log('findById Hatası: ' + e.toString());
      throw e;
    }
  }
}
