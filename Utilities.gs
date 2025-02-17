
class Utilities {
  static generateId() {
    return Utilities.getUuid();
  }

  static getUuid() {
    return Utilities.generateUuid();
  }

  static generateUuid() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  static validateRequired(data, requiredFields) {
    requiredFields.forEach(field => {
      if (!data[field]) {
        throw new Error(`${field} alanı zorunludur`);
      }
    });
  }

  static formatDate(date) {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('tr-TR');
  }
}
