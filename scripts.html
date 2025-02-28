<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Cari Hesaplar</title>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.1.3/css/bootstrap.min.css"
    />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
    />
  </head>
  <body>
    <div class="container mt-5">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h3>Cari Hesaplar</h3>
        <input type="text" id="searchInput" class="form-control" placeholder="Ara...">
      </div>
      <div class="row">
        <div class="col">
          <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
              <button
                class="nav-link active"
                id="cariHesaplar-tab"
                data-bs-toggle="tab"
                data-bs-target="#cariHesaplar"
                type="button"
                role="tab"
                aria-controls="cariHesaplar"
                aria-selected="true"
              >
                Cari Hesap Listesi
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="yeniHesap-tab"
                data-bs-toggle="tab"
                data-bs-target="#yeniHesap"
                type="button"
                role="tab"
                aria-controls="yeniHesap"
                aria-selected="false"
              >
                Yeni Hesap Ekle
              </button>
            </li>
          </ul>
          <div class="tab-content" id="myTabContent">
            <div
              class="tab-pane fade show active"
              id="cariHesaplar"
              role="tabpanel"
              aria-labelledby="cariHesaplar-tab"
            >
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>Firma Adı</th>
                    <th>Şube/Bölge</th>
                    <th>Firma Türü</th>
                    <th>Yetkili Kişi</th>
                    <th>Telefon</th>
                    <th>E-posta</th>
                    <th>Görev Sayısı</th>
                    <th>Proje Sayısı</th>
                    <th>İşlemler</th>
                  </tr>
                </thead>
                <tbody id="cariHesapList">
                  <!-- JavaScript ile doldurulacak -->
                </tbody>
              </table>
            </div>
            <div
              class="tab-pane fade"
              id="yeniHesap"
              role="tabpanel"
              aria-labelledby="yeniHesap-tab"
            >
              <form id="cariHesapForm">
                <div class="mb-3">
                  <label class="form-label">Firma Adı</label>
                  <input
                    type="text"
                    class="form-control"
                    name="firmaAdi"
                    required
                  />
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Şube/Bölge</label>
                      <input
                        type="text"
                        class="form-control"
                        name="subeBolge"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Firma Türü</label>
                      <select class="form-select" name="firmaTuru" required>
                        <option value="">Seçiniz...</option>
                        <option value="Alıcı">Alıcı</option>
                        <option value="Satıcı">Satıcı</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Yetkili Kişi</label>
                      <input
                        type="text"
                        class="form-control"
                        name="yetkiliKisi"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Telefon</label>
                      <input
                        type="tel"
                        class="form-control"
                        name="telefon"
                      />
                    </div>
                  </div>
                </div>
                <div class="mb-3">
                  <label class="form-label">E-posta</label>
                  <input
                    type="email"
                    class="form-control"
                    name="email"
                  />
                </div>
                <button
                  type="button"
                  class="btn btn-primary"
                  onclick="submitForm(document.getElementById('cariHesapForm'), 'addCariHesap')"
                >
                  Kaydet
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- jQuery ve Bootstrap -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Ana JavaScript Fonksiyonları -->
    <script>
      // Sayfa yükleme ve diğer ortak işlemler
      $(document).ready(function () {
        loadPage("carihesap"); // Varsayılan sayfa

        // Menü tıklama (opsiyonel, inline onclick'ler kullanılabiliyor)
        $(".nav-link").click(function (e) {
          e.preventDefault();
          const page = $(this).data("page");
          loadPage(page);
        });

        // Arama (eğer searchInput varsa)
        $("#searchInput").on("keyup", function () {
          const searchTerm = $(this).val();
          const currentPage = $(".nav-link.active").data("page");
          loadPage(currentPage, searchTerm);
        });
      });

      function loadPage(page, search = "") {
        console.log("Sayfa yükleniyor:", page);
        $("#content").html(
          '<div class="text-center"><i class="fas fa-spinner fa-spin fa-2x"></i></div>'
        );

        google.script.run
          .withSuccessHandler(function (result) {
            console.log("Sayfa içeriği ve veriler alındı");
            if (result && result.html) {
              $("#content").html(result.html);
              $(".nav-link").removeClass("active");
              $(`[data-page="${page}"]`).addClass("active");

              // Veri yüklüyorsa (örneğin cari hesap listesi)
              if (result.data) {
                switch (page) {
                  case "carihesap":
                    loadCariHesapList(result.data);
                    break;
                  // Diğer sayfalar için benzer işlemler
                  default:
                    console.error("Geçersiz sayfa:", page);
                }
              }
            } else {
              console.error("Sayfa içeriği boş");
              $("#content").html(
                '<div class="alert alert-danger">Sayfa içeriği yüklenemedi</div>'
              );
            }
          })
          .withFailureHandler(function (error) {
            console.error("Sayfa yükleme hatası:", error);
            $("#content").html(
              `<div class="alert alert-danger">Hata: ${error.message}</div>`
            );
          })
          .handlePageLoad(page, search);
      }

      // Form işlemleri
      function submitForm(form, handler) {
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
          if (key.endsWith("[]")) {
            const cleanKey = key.slice(0, -2);
            if (!data[cleanKey]) {
              data[cleanKey] = [];
            }
            data[cleanKey].push(value);
          } else {
            data[key] = value;
          }
        });
        console.log("Gönderilen veri:", data);
        google.script.run
          .withSuccessHandler(function (result) {
            if (result.success) {
              alert(result.message);
              form.reset();
              loadPage("carihesap");
            } else {
              alert(result.message);
            }
          })
          .withFailureHandler(function (error) {
            alert("Hata: " + error.message);
          })
          [handler](data);
      }

      // Cari Hesap Düzenleme ve Silme Fonksiyonları
      function deleteCariHesap(id) {
        if (!confirm("Bu cari hesabı silmek istediğinize emin misiniz?")) return;
        google.script.run
          .withSuccessHandler(function (response) {
            if (response) {
              alert("Cari hesap başarıyla silindi.");
              loadPage("carihesap");
            } else {
              alert("Silme işlemi başarısız!");
            }
          })
          .deleteCariHesap(id);
      }

      function editCariHesap(id) {
        const row = document.querySelector(`tr[data-id='${id}']`);
        if (!row) {
          alert("Kayıt bulunamadı!");
          return;
        }
        const updatedData = {
          id: id,
          firmaAdi: row.querySelector(".firmaAdi") ? row.querySelector(".firmaAdi").innerText : "",
          subeBolge: row.querySelector(".subeBolge") ? row.querySelector(".subeBolge").innerText : "",
          firmaTuru: row.querySelector(".firmaTuru") ? row.querySelector(".firmaTuru").innerText : "",
          yetkiliKisi: row.querySelector(".yetkiliKisi") ? row.querySelector(".yetkiliKisi").innerText : "",
          telefon: row.querySelector(".telefon") ? row.querySelector(".telefon").innerText : "",
          email: row.querySelector(".email") ? row.querySelector(".email").innerText : ""
        };
        google.script.run
          .withSuccessHandler(function (response) {
            if (response) {
              alert("Cari hesap başarıyla güncellendi.");
              loadPage("carihesap");
            } else {
              alert("Güncelleme başarısız!");
            }
          })
          .updateCariHesap(updatedData);
      }
    </script>
  </body>
</html>
