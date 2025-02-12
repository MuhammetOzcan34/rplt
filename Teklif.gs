class Teklif {
  static getList(search = '') {
    let data = Database.getAll('Teklifler');
    
    if(search) {
      data = data.filter(row => 
        row[1].toLowerCase().includes(search.toLowerCase()) || 
        row[3].toLowerCase().includes(search.toLowerCase())
      );
    }
    
    return data.map(row => ({
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
    }));
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
    if(!row) throw new Error('Teklif bulunamadı');
    
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
    if(!row) throw new Error('Teklif bulunamadı');
    
    Database.delete('Teklifler', row.rowIndex);
    return true;
  }
  
  static getKalemler(teklifId) {
    const data = Database.getAll('TeklifKalemleri');
    return data.filter(row => row[0] === teklifId).map(row => ({
      urunHizmet: row[1],
      miktar: row[2],
      birim: row[3],
      birimFiyat: row[4],
      paraBirimi: row[5],
      tutar: row[6],
      iskonto: row[7],
      netTutar: row[8],
      kdvOrani: row[9],
      toplamTutar: row[10]
    }));
  }
}
