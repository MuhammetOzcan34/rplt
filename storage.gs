/**
 * Veritabanı işlemleri sınıfı
 */
function DatabaseStorage() {
  // Cari Hesap İşlemleri
  this.getCariHesap = function(id) {
    const data = selectFromTable('CariHesaplar');
    return data.find(row => row[0] == id); // id'nin bulunduğu sütun indeksi
  };

  this.getCariHesaplar = function() {
    return selectFromTable('CariHesaplar');
  };

  this.createCariHesap = function(data) {
    insertIntoTable('CariHesaplar', data);
  };

  this.updateCariHesap = function(id, data) {
    const existingData = selectFromTable('CariHesaplar');
    const rowIndex = existingData.findIndex(row => row[0] == id) + 1; // 1 tabanlı index
    if (rowIndex > 0) {
      updateTableRow('CariHesaplar', rowIndex, data);
    }
  };

  this.deleteCariHesap = function(id) {
    const existingData = selectFromTable('CariHesaplar');
    const rowIndex = existingData.findIndex(row => row[0] == id) + 1; // 1 tabanlı index
    if (rowIndex > 0) {
      deleteTableRow('CariHesaplar', rowIndex);
    }
  };

  // Teklif İşlemleri
  this.getTeklif = function(id) {
    const data = selectFromTable('Teklifler');
    return data.find(row => row[0] == id); // id'nin bulunduğu sütun indeksi
  };

  this.getTeklifler = function() {
    return selectFromTable('Teklifler');
  };

  this.createTeklif = function(data) {
    insertIntoTable('Teklifler', data);
  };

  // Proje İşlemleri
  this.getProje = function(id) {
    const data = selectFromTable('Projeler');
    return data.find(row => row[0] == id); // id'nin bulunduğu sütun indeksi
  };

  this.getProjeler = function() {
    return selectFromTable('Projeler');
  };

  this.createProje = function(data) {
    insertIntoTable('Projeler', data);
  };

  // Görev İşlemleri
  this.getGorev = function(id) {
    const data = selectFromTable('Gorevler');
    return data.find(row => row[0] == id); // id'nin bulunduğu sütun indeksi
  };

  this.getGorevler = function() {
    return selectFromTable('Gorevler');
  };

  this.createGorev = function(data) {
    insertIntoTable('Gorevler', data);
  };
}

const storage = new DatabaseStorage();
