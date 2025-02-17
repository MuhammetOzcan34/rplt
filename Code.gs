// Ana uygulama yönetimi
function doGet(e) {
  return HtmlService.createTemplateFromFile('index')
      .evaluate()
      .setTitle('İş Yönetim Sistemi')
      .setFaviconUrl('https://www.google.com/images/favicon.ico')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// Ana sayfa yükleme
function loadPage(page) {
  try {
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
const SHEET_ID = '10j6_p6gyTQfEW0OiQPJGljg7mg1XArwQvoOIviVCo34'; // Buraya Google Sheets ID'sini yazın
const DRIVE_FOLDER = '1CWD2kEdiNCDIt8cyU_8HUkw78JUIzHgn'; // Buraya Google Drive klasör ID'sini yazın

// Sayfa yönlendirmeleri
function handlePageLoad(page, action = '', data = null) {
  try {
    Logger.log('handlePageLoad çağrıldı: ' + page + ', action: ' + action);

    if (action === 'add') {
      switch(page) {
        case 'carihesap':
          return CariHesap.add(data);
        case 'teklif':
          return Teklif.add(data);
        case 'proje':
          return Proje.add(data);
        case 'gorev':
          return Gorev.add(data);
        default:
          throw new Error('Geçersiz işlem');
      }
    }

    // Sayfa yükleme işlemi
    const html = loadPage(page + '.html');
    Logger.log('Sayfa HTML içeriği yüklendi');

    // Verileri yükle
    let pageData;
    switch(page) {
      case 'carihesap':
        pageData = CariHesap.getList();
        break;
      case 'teklif': 
        pageData = Teklif.getList();
        break;
      case 'proje':
        pageData = Proje.getList();
        break;
      case 'gorev':
        pageData = Gorev.getList();
        break;
      case 'rapor':
        pageData = Rapor.getList();
        break;
      default:
        pageData = CariHesap.getList();
    }
    Logger.log('Sayfa verileri yüklendi');

    return {
      html: html,
      data: pageData
    };
  } catch(e) {
    Logger.log('handlePageLoad hatası: ' + e.toString());
    throw e;
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
