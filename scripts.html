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
                <button class="btn btn-primary" onclick="showYeniHesapEkle()">
                    Yeni Hesap Ekle
                </button>
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
                                            <label class="form-label"
                                                >Şube/Bölge</label
                                            >
                                            <input
                                                type="text"
                                                class="form-control"
                                                name="subeBolge"
                                            />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mb-3">
                                            <label class="form-label"
                                                >Firma Türü</label
                                            >
                                            <select
                                                class="form-select"
                                                name="firmaTuru"
                                                required
                                            >
                                                <option value="">
                                                    Seçiniz...
                                                </option>
                                                <option value="Alıcı">
                                                    Alıcı
                                                </option>
                                                <option value="Satıcı">
                                                    Satıcı
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="mb-3">
                                            <label class="form-label"
                                                >Yetkili Kişi</label
                                            >
                                            <input
                                                type="text"
                                                class="form-control"
                                                name="yetkiliKisi"
                                            />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mb-3">
                                            <label class="form-label"
                                                >Telefon</label
                                            >
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
                                    onclick="submitForm('cariHesapForm')"
                                >
                                    Kaydet
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
        <script>
            // Sayfa yükleme ve yönlendirme
            $(document).ready(function () {
                loadPage("carihesap"); // Varsayılan sayfa

                // Menü tıklama
                $(".nav-link").click(function (e) {
                    e.preventDefault();
                    const page = $(this).data("page");
                    loadPage(page);
                });

                // Arama
                $("#searchInput").on("keyup", function () {
                    const searchTerm = $(this).val();
                    const currentPage = $(".nav-link.active").data("page");
                    loadPage(currentPage, searchTerm);
                });
            });

            function loadPage(page, search = "") {
                console.log("Sayfa yükleniyor:", page);
                $("#content").html(
                    '<div class="text-center"><i class="fas fa-spinner fa-spin fa-2x"></i></div>',
                );

                google.script.run
                    .withSuccessHandler(function (result) {
                        console.log("Sayfa içeriği ve veriler alındı");
                        if (result && result.html) {
                            // Önce HTML içeriğini yükle
                            $("#content").html(result.html);
                            $(".nav-link").removeClass("active");
                            $(`[data-page="${page}"]`).addClass("active");

                            // Sonra verileri tabloya yükle
                            if (result.data) {
                                switch (page) {
                                    case "carihesap":
                                        $("#cariHesapListTable").empty();
                                        result.data.forEach(function (item) {
                                            $("#cariHesapListTable").append(`
                              <tr>
                                <td>${item.firmaAdi}</td>
                                <td>${item.subeBolge || "-"}</td>
                                <td>${item.firmaTuru}</td>
                                <td>${item.yetkiliKisi || "-"}</td>
                                <td>${item.telefon || "-"}</td>
                                <td>${item.email || "-"}</td>
                                <td>${item.gorevSayisi || 0}</td>
                                <td>${item.projeSayisi || 0}</td>
                                <td>
                                  <button class="btn btn-sm btn-icon btn-warning" onclick="editCariHesap('${item.id}')">
                                    <i class="fas fa-edit"></i>
                                  </button>
                                  <button class="btn btn-sm btn-icon btn-danger" onclick="deleteCariHesap('${item.id}')">
                                    <i class="fas fa-trash"></i>
                                  </button>
                                </td>
                              </tr>
                            `);
                                        });
                                        break;
                                    // Diğer sayfalar için benzer işlemler yapılacak
                                }
                            }
                        } else {
                            console.error("Sayfa içeriği boş");
                            $("#content").html(
                                '<div class="alert alert-danger">Sayfa içeriği yüklenemedi</div>',
                            );
                        }
                    })
                    .withFailureHandler(function (error) {
                        console.error("Sayfa yükleme hatası:", error);
                        $("#content").html(
                            `<div class="alert alert-danger">Hata: ${error.message}</div>`,
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
                        // Array tipindeki form alanları için
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
                            // Formu sıfırla
                            form.reset();
                            // Sayfayı yeniden yükle
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

            // Yeni cari hesap ekleme
            function showYeniHesapEkle() {
                // Yeni hesap ekleme formu göster
                $("#yeniHesap").show();
                $("#cariHesaplar").hide();
            }

            // Yeni cari hesap ekleme
            function addCariHesap(data) {
                // Yeni cari hesap verilerini Google Sheets'e ekle
                console.log("Yeni cari hesap eklenecek:", data);
                // ... Google Sheets işlemi ...
                // Sayfayı yeniden yükle
                loadPage("carihesap");
            }

            // Cari hesap düzenleme
            function editCariHesap(id) {
                // ... Cari hesap düzenleme işlemi ...
            }

            // Cari hesap silme
            function deleteCariHesap(id) {
                // ... Cari hesap silme işlemi ...
            }
        </script>
    </body>
</html>
