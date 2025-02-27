class CariHesap {
  static getList(search = '', pageNumber = 1) {
    try {
      let data = Database.getAll('CariHesaplar');
      const ITEMS_PER_PAGE = 25;
      const startIndex = (pageNumber - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;

      if (search) {
        data = data.filter(row => 
          row[1].toLowerCase().includes(search.toLowerCase()) || 
          row[2].toLowerCase().includes(search.toLowerCase())
        );
      }

      const mappedData = data.slice(startIndex, endIndex).map(row => ({
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

      return {
        data: mappedData,
        totalItems: data.length,
        currentPage: pageNumber,
        itemsPerPage: ITEMS_PER_PAGE
      };
    } catch(e) {
      Logger.log('CariHesap.getList hatası: ' + e.toString());
      throw e;
    }
  }

  static add(data) {
    try {
      Logger.log('Gelen veri:', data);
      
      if (!data.firmaAdi || !data.firmaTuru) {
        throw new Error('Firma adı ve firma türü zorunludur');
      }
      
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
    } catch(e) {
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
    } catch(e) {
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
    } catch(e) {
      throw e;
    }
  }
}
