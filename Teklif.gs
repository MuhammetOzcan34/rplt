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
    Utilities.validateRequired(data, ['teklifTuru', 'firmaAdi', 'teklifKonusu']);
    
    const id = Utilities.generateId();
    const teklifNo = data.teklifTuru === 'Verilen' ? 'FT' : 'ST' + 
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
    return id;
  }

  static update(id, data) {
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
    return true;
  }

  static delete(id) {
    const row = Database.findById('Teklifler', id);
    if (!row) throw new Error('Teklif bulunamadı');
    
    Database.delete('Teklifler', row.rowIndex);
    return true;
  }
}
