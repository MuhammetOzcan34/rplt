class CariHesap {
  static getList(search = '', pageNumber = 1) {
    try {
      const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('CariHesaplar');
      if (!sheet) {
        throw new Error("CariHesaplar sayfası bulunamadı!");
      }
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
          firmaAdi: row[1],
          subeBolge: row[2],
          firmaTuru: row[3],
          yetkiliKisi: row[4],
          telefon: row[5],
          email: row[6],
          gorevSayisi: row[7],
          projeSayisi: row[8]
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
        0, // Görev sayısı
        0  // Proje sayısı
      ];
      Logger.log('Oluşturulan satır:', row);
      const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('CariHesaplar');
      if (!sheet) {
        throw new Error("CariHesaplar sayfası bulunamadı!");
      }
      sheet.appendRow(row);
      return {
        success: true,
        message: 'Cari hesap başarıyla eklendi',
        id: id
      };
    } catch (e) {
      Logger.log('Hata:', e.toString());
      throw e;
    }
  }
}
