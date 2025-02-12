class Proje {
  static getList(search = '') {
    let data = Database.getAll('Projeler');
    
    if(search) {
      data = data.filter(row => 
        row[1].toLowerCase().includes(search.toLowerCase()) || 
        row[4].toLowerCase().includes(search.toLowerCase())
      );
    }
    
    return data.map(row => ({
      id: row[0],
      projeNo: row[1],
      projeTarihi: row[2],
      sonTeslimTarihi: row[3],
      firmaAdi: row[4],
      teklifNo: row[5],
      projeKonusu: row[6],
      yetkiliKisi: row[7],
      projeDurumu: row[8],
      projeTutari: row[9],
      odemeSekli: row[10]
    }));
  }
  
  static add(data) {
    Utilities.validateRequired(data, ['firmaAdi', 'projeKonusu']);
    
    const id = Utilities.generateId();
    const projeNo = 'P' + (Database.getAll('Projeler').length + 1).toString().padStart(4, '0');
    
    const row = [
      id,
      projeNo,
      Utilities.formatDate(new Date()),
      data.sonTeslimTarihi,
      data.firmaAdi,
      data.teklifNo,
      data.projeKonusu,
      data.yetkiliKisi,
      'Açık', // Varsayılan durum
      data.projeTutari,
      data.odemeSekli
    ];
    
    Database.insert('Projeler', row);
    return id;
  }
  
  static update(id, data) {
    const row = Database.findById('Projeler', id);
    if(!row) throw new Error('Proje bulunamadı');
    
    const updatedRow = [
      id,
      row[1], // Proje no değişmez
      row[2], // Tarih değişmez
      data.sonTeslimTarihi,
      data.firmaAdi,
      data.teklifNo,
      data.projeKonusu,
      data.yetkiliKisi,
      data.projeDurumu,
      data.projeTutari,
      data.odemeSekli
    ];
    
    Database.update('Projeler', row.rowIndex, updatedRow);
    return true;
  }
  
  static delete(id) {
    const row = Database.findById('Projeler', id);
    if(!row) throw new Error('Proje bulunamadı');
    
    Database.delete('Projeler', row.rowIndex);
    return true;
  }
  
  static getGiderler(projeId) {
    const data = Database.getAll('ProjeGiderleri');
    return data.filter(row => row[0] === projeId).map(row => ({
      giderAdi: row[1],
      firmaAdi: row[2],
      aciklama: row[3],
      miktar: row[4],
      birim: row[5],
      birimFiyat: row[6],
      tutar: row[7],
      iskonto: row[8],
      netTutar: row[9],
      kdvOrani: row[10],
      toplamTutar: row[11]
    }));
  }
}
