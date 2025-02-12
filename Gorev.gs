class Gorev {
  static getList(filter = 'acik') {
    let data = Database.getAll('Gorevler');
    
    switch(filter) {
      case 'acik':
        data = data.filter(row => row[1] === 'Açık' || row[1] === 'Yapılıyor');
        break;
      case 'tamamlandi':
        data = data.filter(row => row[1] === 'Kapalı');
        break;
    }
    
    return data.map(row => ({
      id: row[0],
      durum: row[1],
      gorev: row[2],
      projeNo: row[3],
      firma: row[4],
      olusturmaTarihi: row[5],
      not: row[6]
    }));
  }
  
  static add(data) {
    Utilities.validateRequired(data, ['gorev']);
    
    const id = Utilities.generateId();
    const row = [
      id,
      data.durum || 'Açık',
      data.gorev,
      data.projeNo,
      data.firma,
      Utilities.formatDate(new Date()),
      data.not
    ];
    
    Database.insert('Gorevler', row);
    return id;
  }
  
  static update(id, data) {
    const row = Database.findById('Gorevler', id);
    if(!row) throw new Error('Görev bulunamadı');
    
    const updatedRow = [
      id,
      data.durum,
      data.gorev,
      data.projeNo,
      data.firma,
      row[5], // Oluşturma tarihi değişmez
      data.not
    ];
    
    Database.update('Gorevler', row.rowIndex, updatedRow);
    return true;
  }
  
  static delete(id) {
    const row = Database.findById('Gorevler', id);
    if(!row) throw new Error('Görev bulunamadı');
    
    Database.delete('Gorevler', row.rowIndex);
    return true;
  }
}
