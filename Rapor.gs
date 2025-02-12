class Rapor {
  static getMusteriDagilimi() {
    const data = Database.getAll('CariHesaplar');
    const alici = data.filter(row => row[3] === 'Alıcı').length;
    const satici = data.filter(row => row[3] === 'Satıcı').length;
    
    return {
      labels: ['Alıcı', 'Satıcı'],
      data: [alici, satici]
    };
  }
  
  static getTeklifDagilimi() {
    const data = Database.getAll('Teklifler');
    const beklemede = data.filter(row => row[7] === 'Beklemede').length;
    const onaylandi = data.filter(row => row[7] === 'Onaylandı').length;
    const kaybedildi = data.filter(row => row[7] === 'Kaybedildi').length;
    
    return {
      labels: ['Beklemede', 'Onaylandı', 'Kaybedildi'],
      data: [beklemede, onaylandi, kaybedildi]
    };
  }
  
  static getProjeDurumu() {
    const data = Database.getAll('Projeler');
    const acik = data.filter(row => row[8] === 'Açık').length;
    const tamamlandi = data.filter(row => row[8] === 'Tamamlandı').length;
    
    return {
      labels: ['Açık', 'Tamamlandı'],
      data: [acik, tamamlandi]
    };
  }
  
  static getGorevDagilimi() {
    const data = Database.getAll('Gorevler');
    const acik = data.filter(row => row[1] === 'Açık').length;
    const yapiliyor = data.filter(row => row[1] === 'Yapılıyor').length;
    const kapali = data.filter(row => row[1] === 'Kapalı').length;
    
    return {
      labels: ['Açık', 'Yapılıyor', 'Kapalı'],
      data: [acik, yapiliyor, kapali]
    };
  }
  
  static getAylikCiro() {
    const data = Database.getAll('Projeler');
    const aylar = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 
                   'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
    
    const ciro = new Array(12).fill(0);
    data.forEach(row => {
      if(row[8] === 'Tamamlandı') {
        const ay = new Date(row[2]).getMonth();
        ciro[ay] += parseFloat(row[9]);
      }
    });
    
    return {
      labels: aylar,
      data: ciro
    };
  }
}
