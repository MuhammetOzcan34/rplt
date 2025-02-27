class Rapor {
  static getDashboardData() {
    const cariHesaplar = Database.getAll('CariHesaplar');
    const teklifler = Database.getAll('Teklifler');
    const projeler = Database.getAll('Projeler');
    const gorevler = Database.getAll('Gorevler');

    // İstatistikler
    const cariHesapSayisi = cariHesaplar.length;
    const teklifSayisi = teklifler.length;
    const projeSayisi = projeler.length;
    const gorevSayisi = gorevler.length;

    // Son eklenen cari hesaplar
    const sonCariHesaplar = cariHesaplar.slice(-5).map(row => ({
      firmaAdi: row[1],
      yetkiliKisi: row[4],
      telefon: row[5]
    }));

    // Son eklenen projeler
    const sonProjeler = projeler.slice(-5).map(row => ({
      projeNo: row[1],
      projeKonusu: row[6],
      projeDurumu: row[8]
    }));

    // Aylık ciro verileri
    const aylar = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
    const ciroData = {
      labels: aylar,
      values: aylar.map((_, index) => {
        return projeler
          .filter(row => new Date(row[2]).getMonth() === index && row[8] === 'Tamamlandı')
          .reduce((sum, row) => sum + parseFloat(row[9]), 0);
      })
    };

    // Görev durumları
    const gorevDurumData = {
      labels: ['Açık', 'Yapılıyor', 'Tamamlandı'],
      values: [
        gorevler.filter(row => row[1] === 'Açık').length,
        gorevler.filter(row => row[1] === 'Yapılıyor').length,
        gorevler.filter(row => row[1] === 'Tamamlandı').length
      ]
    };

    return {
      cariHesapSayisi,
      teklifSayisi,
      projeSayisi,
      gorevSayisi,
      sonCariHesaplar,
      sonProjeler,
      ciroData,
      gorevDurumData
    };
  }
}
