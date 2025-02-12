/**
 * Google Sheets'i veri tabanı olarak kullanmak için bağlantı fonksiyonu.
 * Google Sheets'in ID'sini kullanarak dosyaya bağlanır.
 * @returns {GoogleAppsScript.Spreadsheet.Spreadsheet} Google Sheets Spreadsheet nesnesi
 */
function getDatabaseConnection() {
  const spreadsheetId = '10j6_p6gyTQfEW0OiQPJGljg7mg1XArwQvoOIviVCo34'; // Buraya Google Sheets ID'sini yazın
  return SpreadsheetApp.openById(spreadsheetId);
}

/**
 * Belirtilen tablo adından verileri seçer.
 * @param {string} tableName Tablo adı
 * @returns {Array} Tablo verileri
 */
function selectFromTable(tableName) {
  const db = getDatabaseConnection();
  const sheet = db.getSheetByName(tableName);
  if (!sheet) return [];
  const data = sheet.getDataRange().getValues();
  return data;
}

/**
 * Belirtilen tabloya yeni veri ekler.
 * @param {string} tableName Tablo adı
 * @param {Array} values Eklenecek değerler (dizi şeklinde)
 */
function insertIntoTable(tableName, values) {
  const db = getDatabaseConnection();
  const sheet = db.getSheetByName(tableName);
  if (sheet) {
    sheet.appendRow(values);
  }
}

/**
 * Belirtilen tabloyu günceller.
 * @param {string} tableName Tablo adı
 * @param {number} rowIndex Güncellenecek satırın indeksi (1 tabanlı index)
 * @param {Array} values Güncellenecek değerler (dizi şeklinde)
 */
function updateTableRow(tableName, rowIndex, values) {
  const db = getDatabaseConnection();
  const sheet = db.getSheetByName(tableName);
  if (sheet) {
    const range = sheet.getRange(rowIndex, 1, 1, values.length);
    range.setValues([values]);
  }
}

/**
 * Belirtilen tablodan satır siler.
 * @param {string} tableName Tablo adı
 * @param {number} rowIndex Silinecek satırın indeksi (1 tabanlı index)
 */
function deleteTableRow(tableName, rowIndex) {
  const db = getDatabaseConnection();
  const sheet = db.getSheetByName(tableName);
  if (sheet) {
    sheet.deleteRow(rowIndex);
  }
}
