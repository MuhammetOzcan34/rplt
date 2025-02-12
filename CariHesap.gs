// Cari hesap işlemleri
class CariHesap {
  static getList(search = '') {
    try {
      Logger.log('CariHesap.getList çağrıldı, arama: ' + search);
      let data = Database.getAll('CariHesaplar');
      Logger.log('Veri alındı, satır sayısı: ' + data.length);

      if(search) {
        data = data.filter(row => 
          row[1].toLowerCase().includes(search.toLowerCase()) || 
          row[2].toLowerCase().includes(search.toLowerCase())
        );
        Logger.log('Filtrelenmiş veri sayısı: ' + data.length);
      }

      const mappedData = data.map(row => ({
        id: row[0],
        firmaAdi: row[1],
        subeBolge: row[2],
        firmaTuru: row[3],
        yetkiliKisi: row[4],
        telefon: row[5],
        email: row[6],
        gorevSayisi: row[7] || 0,
        projeSayisi: row[8] || 0
      }));

      Logger.log('Veri dönüştürüldü ve gönderiliyor');
      return mappedData;
    } catch(e) {
      Logger.log('CariHesap.getList hatası: ' + e.toString());
      throw e;
    }
  }

  static add(data) {
    try {
      Logger.log('CariHesap.add çağrıldı');
      Utilities.validateRequired(data, ['firmaAdi', 'firmaTuru']);

      const id = Utilities.generateId();
      const row = [
        id,
        data.firmaAdi,
        data.subeBolge || '',
        data.firmaTuru,
        data.yetkiliKisi || '',
        data.telefon || '',
        data.email || '',
        0, // Görev sayısı
        0  // Proje sayısı
      ];

      Database.insert('CariHesaplar', row);
      Logger.log('Yeni cari hesap eklendi, id: ' + id);
      return id;
    } catch(e) {
      Logger.log('CariHesap.add hatası: ' + e.toString());
      throw e;
    }
  }

  static update(id, data) {
    try {
      Logger.log('CariHesap.update çağrıldı, id: ' + id);
      const row = Database.findById('CariHesaplar', id);
      if(!row) {
        Logger.log('Cari hesap bulunamadı: ' + id);
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
        row[7], // Görev sayısı korunur
        row[8]  // Proje sayısı korunur
      ];

      Database.update('CariHesaplar', row.rowIndex, updatedRow);
      Logger.log('Cari hesap güncellendi');
      return true;
    } catch(e) {
      Logger.log('CariHesap.update hatası: ' + e.toString());
      throw e;
    }
  }

  static delete(id) {
    try {
      Logger.log('CariHesap.delete çağrıldı, id: ' + id);
      const row = Database.findById('CariHesaplar', id);
      if(!row) {
        Logger.log('Cari hesap bulunamadı: ' + id);
        throw new Error('Cari hesap bulunamadı');
      }

      Database.delete('CariHesaplar', row.rowIndex);
      Logger.log('Cari hesap silindi');
      return true;
    } catch(e) {
      Logger.log('CariHesap.delete hatası: ' + e.toString());
      throw e;
    }
  }
}