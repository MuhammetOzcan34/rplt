// Yardımcı fonksiyonlar
class Utilities {
  static generateId() {
    return Utilities.getUuid();
  }
  
  static formatDate(date) {
    return Utilities.formatDate(date, "GMT+3", "dd.MM.yyyy");
  }
  
  static formatCurrency(amount) {
    return amount.toLocaleString('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    });
  }
  
  static validateRequired(data, fields) {
    for(const field of fields) {
      if(!data[field]) {
        throw new Error(`${field} alanı zorunludur`);
      }
    }
    return true;
  }
  
  static uploadFile(blob, filename) {
    const folder = DriveApp.getFolderById(DRIVE_FOLDER);
    const file = folder.createFile(blob);
    file.setName(filename);
    return file.getId();
  }
}
