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

function handlePageLoad(page, search = "", pageNumber = 1) {
  try {
    const html = HtmlService.createTemplateFromFile('templates/' + page)
                  .evaluate()
                  .getContent();

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

const SHEET_ID = '10j6_p6gyTQfEW0OiQPJGljg7mg1XArwQvoOIviVCo34';
const DRIVE_FOLDER = '1CWD2kEdiNCDIt8cyU_8HUkw78JUIzHgn';

// CARİ HESAP FONKSİYONLARI
function addCariHesap(data) { return CariHesap.add(data); }
function updateCariHesap(data) { return CariHesap.update(data.id, data); }
function deleteCariHesap(id) { return CariHesap.delete(id); }

// TEKLİF FONKSİYONLARI
function addTeklif(data) { return Teklif.add(data); }
function updateTeklif(data) { return Teklif.update(data.id, data); }
function deleteTeklif(id) { return Teklif.delete(id); }
function saveTeklif(genelBilgiler, urunHizmetBilgileri) { return Teklif.saveTeklif(genelBilgiler, urunHizmetBilgileri); }
function getCariHesaplar() { return Teklif.getCariHesaplar(); }
function getTeklifTurleri() { return Teklif.getTeklifTurleri(); }
function getNextTeklifNo(teklifTuru) { return Teklif.getNextTeklifNo(teklifTuru); }

// PROJE FONKSİYONLARI
function addProje(data) { return Proje.add(data); }
function updateProje(data) { return Proje.update(data.id, data); }
function deleteProje(id) { return Proje.delete(id); }

// GÖREV FONKSİYONLARI
function addGorev(data) { return Gorev.add(data); }
function updateGorev(data) { return Gorev.update(data.id, data); }
function deleteGorev(id) { return Gorev.delete(id); }

// RAPOR FONKSİYONLARI
function getRaporData() { return Rapor.getDashboardData(); }

function testSheetsConnection() {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    return ss ? true : false;
  } catch(e) {
    return false;
  }
}
