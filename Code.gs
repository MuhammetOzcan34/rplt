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
function handlePageLoad(page, search) {
  try {
    Logger.log('handlePageLoad çağrıldı: ' + page);

    // Önce HTML içeriğini yükle
    const html = loadPage(page + '.html');
    Logger.log('Sayfa HTML içeriği yüklendi');

    // Sonra verileri yükle
    let data;
    switch(page) {
      case 'carihesap':
        data = CariHesap.getList(search);
        break;
      case 'teklif': 
        data = Teklif.getList(search);
        break;
      case 'proje':
        data = Proje.getList(search);
        break;
      case 'gorev':
        data = Gorev.getList(search);
        break;
      case 'rapor':
        data = Rapor.getList(search);
        break;
      default:
        data = CariHesap.getList(search);
    }
    Logger.log('Sayfa verileri yüklendi');

    // Her ikisini birden döndür
    return {
      html: html,
      data: data
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
