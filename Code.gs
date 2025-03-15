// Ana uygulama yönetimi
function doGet(e) {
  return HtmlService.createTemplateFromFile('index')
      .evaluate()
      .setTitle('İş Yönetim Sistemi')
      .setFaviconUrl('https://www.google.com/images/favicon.ico')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

// HTML dosyalarını dahil etmek için kullanılır
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// Sayfa yönlendirmesi
function handlePageLoad(page, search = "", pageNumber = 1) {
  try {
    if (!page) throw new Error("Sayfa parametresi geçersiz veya boş.");
    Logger.log('handlePageLoad çağrıldı: ' + page + ', search: ' + search);

    // HTML içeriğini yükle
    const html = HtmlService.createTemplateFromFile('templates/' + page)
                  .evaluate()
                  .getContent();

    // Sayfa verilerini al
    let pageData;
    switch (page) {
      case 'dashboard':
        pageData = null;
        break;
      case 'carihesap':
        pageData = CariHesap.getList(search, pageNumber);
        break;
      case 'teklif':
        pageData = Teklif.getList(search, pageNumber);
        break;
      case 'proje':
        pageData = Proje.getList(search, pageNumber);
        break;
      case 'gorev':
        pageData = Gorev.getList(search, pageNumber);
        break;
      case 'rapor':
        pageData = Rapor.getDashboardData();
        break;
      default:
        throw new Error("Geçersiz sayfa: " + page);
    }

    return { html: html, data: pageData };
  } catch (e) {
    Logger.log('handlePageLoad hatası: ' + e.toString());
    throw e;
  }
}

// Global ayarlar
const SHEET_ID = '10j6_p6gyTQfEW0OiQPJGljg7mg1XArwQvoOIviVCo34';
const DRIVE_FOLDER = '1CWD2kEdiNCDIt8cyU_8HUkw78JUIzHgn';

// Cari Hesap işlemleri
function addCariHesap(data) { return CariHesap.add(data); }
function updateCariHesap(data) { return CariHesap.update(data.id, data); }
function deleteCariHesap(id) { return CariHesap.delete(id); }

// Teklif işlemleri
function addTeklif(data) { return Teklif.add(data); }
function updateTeklif(data) { return Teklif.update(data.id, data); }
function deleteTeklif(id) { return Teklif.delete(id); }

// Proje işlemleri
function addProje(data) { return Proje.add(data); }
function updateProje(data) { return Proje.update(data.id, data); }
function deleteProje(id) { return Proje.delete(id); }

// Görev işlemleri
function addGorev(data) { return Gorev.add(data); }
function updateGorev(data) { return Gorev.update(data.id, data); }
function deleteGorev(id) { return Gorev.delete(id); }

// Rapor işlemleri
function getRaporData() { return Rapor.getDashboardData(); }

// Google Sheets bağlantı testi
function testSheetsConnection() {
  try {
    Logger.log('Sheets bağlantı testi başladı');
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName('CariHesaplar');
    if (sheet) {
      const data = sheet.getDataRange().getValues();
      Logger.log('CariHesaplar veri sayısı: ' + data.length);
      return true;
    }
    return false;
  } catch(e) {
    Logger.log('Hata: ' + e.toString());
    return false;
  }
}
