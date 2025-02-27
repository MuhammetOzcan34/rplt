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

// Ana sayfa yükleme
function loadPage(page) {
  try {
    if (!page) {
      throw new Error("Sayfa parametresi geçersiz veya boş.");
    }

    Logger.log('Yüklenen sayfa: ' + page);
    const template = HtmlService.createTemplateFromFile('templates/' + page);
    const html = template.evaluate().getContent();
    Logger.log('Sayfa içeriği yüklendi');
    return html;
  } catch(e) {
    Logger.log('Sayfa yükleme hatası: ' + e.toString());
    throw e;
  }
}

// Global ayarlar
const SHEET_ID = '10j6_p6gyTQfEW0OiQPJGljg7mg1XArwQvoOIviVCo34'; // Google Sheets ID'si
const DRIVE_FOLDER = '1CWD2kEdiNCDIt8cyU_8HUkw78JUIzHgn'; // Google Drive klasör ID'si

// Sayfa yönlendirmeleri
function handlePageLoad(page, search = "", pageNumber = 1) {
  try {
    if (!page) {
      throw new Error("Sayfa parametresi geçersiz veya boş.");
    }

    Logger.log('handlePageLoad çağrıldı: ' + page + ', search: ' + search);

    // Sayfa yükleme işlemi
    const html = loadPage(page);
    Logger.log('Sayfa HTML içeriği yüklendi');

    // Verileri yükle
    let pageData;
    switch (page) {
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
        pageData = Rapor.getList(search);
        break;
      case 'dashboard':
        // Dashboard için özel veri yükleme gerekmiyor
        return { html: html, data: null };
      default:
        throw new Error("Geçersiz sayfa: " + page);
    }
    Logger.log('Sayfa verileri yüklendi');

    return {
      html: html,
      data: pageData.data // Sadece veri kısmını döndür
    };
  } catch (e) {
    Logger.log('handlePageLoad hatası: ' + e.toString());
    throw e; // Hata mesajını yeniden fırlat
  }
}

// Test fonksiyonu - Sheets bağlantısını kontrol et
function testSheetsConnection() {
  try {
    Logger.log('Sheets bağlantı testi başladı');
    Logger.log('SHEET_ID: ' + SHEET_ID);

    const ss = SpreadsheetApp.openById(SHEET_ID);
    Logger.log('Spreadsheet başarıyla açıldı');

    const sheet = ss.getSheetByName('CariHesaplar');
    if (sheet) {
      Logger.log('CariHesaplar sayfası mevcut');
      const data = sheet.getDataRange().getValues();
      Logger.log('Veri sayısı: ' + data.length);
      return true;
    } else {
      Logger.log('CariHesaplar sayfası bulunamadı');
      return false;
    }
  } catch(e) {
    Logger.log('Sheets bağlantı testi hatası: ' + e.toString());
    return false;
  }
}
