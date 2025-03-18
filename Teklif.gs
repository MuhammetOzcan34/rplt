class Teklif {
  static add(data) {
    try {
      if (!data.teklifTuru || !data.firmaAdi) {
        throw new Error('Teklif türü ve firma adı zorunludur');
      }

      const id = Utilities.getUuid();
      const teklifNo = Math.floor(100000 + Math.random() * 900000);

      const row = [
        id,
        teklifNo,
        data.teklifTuru,
        data.firmaAdi,
        data.teklifKonusu || '',
        data.yetkiliKisi || '',
        data.teklifDurumu || '',
        data.tarih || '',
        data.odemeSekli || '',
        data.gecerlilikSuresi || '',
        data.toplamTutar || 0
      ];

      if (Database.insert('Teklifler', row)) {
        return {
          success: true,
          message: 'Teklif başarıyla eklendi',
          id: id
        };
      } else {
        throw new Error('Veri eklenemedi');
      }
    } catch (e) {
      Logger.log('Hata:', e.toString());
      throw e;
    }
  }

  static update(id, data) {
    try {
      const row = Database.findById('Teklifler', id);
      if (!row) {
        throw new Error('Teklif bulunamadı');
      }

      const updatedRow = [
        id,
        row[1],
        data.teklifTuru,
        data.firmaAdi,
        data.teklifKonusu || '',
        data.yetkiliKisi || '',
        data.teklifDurumu || '',
        data.tarih || '',
        data.odemeSekli || '',
        data.gecerlilikSuresi || '',
        data.toplamTutar || 0
      ];

      Database.update('Teklifler', row.rowIndex, updatedRow);
      return { success: true, message: 'Teklif başarıyla güncellendi' };
    } catch (e) {
      Logger.log('Hata:', e.toString());
      throw e;
    }
  }

  static delete(id) {
    try {
      const row = Database.findById('Teklifler', id);
      if (!row) {
        throw new Error('Teklif bulunamadı');
      }

      Database.delete('Teklifler', row.rowIndex);
      return { success: true, message: 'Teklif başarıyla silindi' };
    } catch (e) {
      Logger.log('Hata:', e.toString());
      throw e;
    }
  }

  static getList(search = '', pageNumber = 1) {
    try {
      const sheet = Database.getSheet('Teklifler');
      const data = sheet.getDataRange().getValues();
      if(data.length <= 1) return [];

      const headers = data.shift();
      
      // Dinamik sütun indeksleri
      const columnIndex = {
        id: headers.indexOf('ID'),
        teklifNo: headers.indexOf('Teklif No'),
        teklifTuru: headers.indexOf('Teklif Türü'),
        firmaAdi: headers.indexOf('Firma Adı'),
        teklifKonusu: headers.indexOf('Teklif Konusu'),
        teklifDurumu: headers.indexOf('Teklif Durumu'),
        tarih: headers.indexOf('Tarih'),
        toplamTutar: headers.indexOf('Toplam Tutar')
      };

      const filteredData = data.filter(row => 
        row[columnIndex.firmaAdi]?.toLowerCase().includes(search.toLowerCase()) ||
        row[columnIndex.teklifNo]?.toString().includes(search) ||
        row[columnIndex.teklifKonusu]?.toLowerCase().includes(search.toLowerCase())
      );

      const pageSize = 25;
      const startIndex = (pageNumber - 1) * pageSize;
      const pageData = filteredData.slice(startIndex, startIndex + pageSize);

      return pageData.map(row => ({
        id: row[columnIndex.id],
        teklifNo: row[columnIndex.teklifNo],
        teklifTuru: row[columnIndex.teklifTuru],
        firmaAdi: row[columnIndex.firmaAdi],
        teklifKonusu: row[columnIndex.teklifKonusu],
        teklifDurumu: row[columnIndex.teklifDurumu],
        tarih: Utilities.formatDate(new Date(row[columnIndex.tarih]), 'GMT+3', 'dd.MM.yyyy'),
        toplamTutar: new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(row[columnIndex.toplamTutar])
      }));
    } catch (e) {
      Logger.log('Hata:', e.toString());
      throw e;
    }
  }

  static saveTeklif(genelBilgiler, urunHizmetBilgileri) {
    try {
      const id = Utilities.getUuid();
      const teklifNo = Math.floor(100000 + Math.random() * 900000);

      const teklifRow = [
        id,
        teklifNo,
        genelBilgiler.teklifTuru,
        genelBilgiler.firmaAdi,
        genelBilgiler.teklifKonusu,
        genelBilgiler.yetkiliKisi,
        genelBilgiler.teklifDurumu,
        genelBilgiler.tarih,
        genelBilgiler.odemeSekli,
        genelBilgiler.gecerlilikSuresi,
        genelBilgiler.toplamTutar
      ];

      if (Database.insert('Teklifler', teklifRow)) {
        urunHizmetBilgileri.forEach(urun => {
          const urunRow = [
            Utilities.getUuid(),
            id,
            urun.urunAdi,
            urun.ozellikler,
            urun.miktar,
            urun.birim,
            urun.birimFiyat,
            urun.paraBirimi,
            urun.tutar,
            urun.iskontoTutar,
            urun.kdvOrani,
            urun.netTutar
          ];
          Database.insert('TeklifUrunleri', urunRow);
        });
        return { success: true, message: 'Teklif başarıyla kaydedildi' };
      } else {
        throw new Error('Teklif kaydedilemedi');
      }
    } catch (e) {
      Logger.log('Hata:', e.toString());
      throw e;
    }
  }

  static getCariHesaplar() {
    try {
      const sheet = Database.getSheet('CariHesaplar');
      const data = sheet.getDataRange().getValues();
      data.shift();

      return data.map(row => ({
        id: row[0],
        firmaAdi: row[1],
        subeBolge: row[2],
        firmaTuru: row[3],
        yetkiliKisi: row[4],
        telefon: row[5],
        email: row[6],
        gorevSayisi: row[7],
        projeSayisi: row[8]
      }));
    } catch (e) {
      Logger.log('Hata:', e.toString());
      throw e;
    }
  }
}
