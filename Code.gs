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
    if (!page) {
      throw new Error("Sayfa parametresi geçersiz veya boş.");
    }
    Logger.log('handlePageLoad çağrıldı: ' + page + ', search: ' + search);
    const html = HtmlService.createTemplateFromFile('templates/' + page)
                .evaluate().getContent();
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
    return {
      html: html,
      data: pageData ? pageData.data : null,
      pageSize: pageData ? pageData.pageSize : null,
      totalItems: pageData ? pageData.totalItems : null,
      pageNumber: pageData ? pageData.pageNumber : null
    };
  } catch (e) {
    Logger.log('handlePageLoad hatası: ' + e.toString());
    throw e;
  }
}

// Global ayarlar
const SHEET_ID = '10j6_p6gyTQfEW0OiQPJGljg7mg1XArwQvoOIviVCo34'; // Google Sheets ID'nizi girin
const DRIVE_FOLDER = '1CWD2kEdiNCDIt8cyU_8HUkw78JUIzHgn'; // Google Drive klasör ID'nizi girin

// Cari Hesap işlemlerini dışarıya açan global fonksiyonlar
function addCariHesap(data) {
  return CariHesap.add(data);
}

function updateCariHesap(data) {
  return CariHesap.update(data.id, data);
}

function deleteCariHesap(id) {
  return CariHesap.delete(id);
}

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
