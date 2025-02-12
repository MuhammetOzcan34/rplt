class CariHesap {
  static getList(search = '') {
    try {
      let data = Database.getAll('CariHesaplar');

      if (search) {
        data = data.filter(row => 
          row[1].toLowerCase().includes(search.toLowerCase()) || 
          row[2].toLowerCase().includes(search.toLowerCase())
        );
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

      return mappedData;
    } catch(e) {
      throw e;
    }
  }

  static add(data) {
    try {
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
        0, 
        0
      ];

      Database.insert('CariHesaplar', row);
      return id;
    } catch(e) {
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
      return true;
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
      return true;
    } catch(e) {
      throw e;
    }
  }
}
