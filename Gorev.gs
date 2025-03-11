<div class="row">
  <div class="col-md-12">
    <!-- Filtreler -->
    <div class="card mb-3">
      <div class="card-body">
        <div class="row">
          <div class="col-md-3">
            <select class="form-select" id="taskStatusFilter" onchange="filterTasks()">
              <option value="">Tüm Durumlar</option>
              <option value="acik">Açık</option>
              <option value="yapiliyor">Yapılıyor</option>
              <option value="tamamlanmis">Tamamlanmış</option>
            </select>
          </div>
          <div class="col-md-3">
            <select class="form-select" id="taskProjectFilter" onchange="filterTasks()">
              <option value="">Tüm Projeler</option>
              <!-- Dinamik içerik burada yüklenir -->
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Görev Listesi -->
    <div class="card">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h4>Yapılacaklar Listesi</h4>
          <div class="btn-group">
            <button class="btn btn-primary" onclick="showNewTaskForm()">Yeni Görev</button>
            <button class="btn btn-outline-primary" onclick="printTasks()">Yazdır</button>
          </div>
        </div>
        
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Görev</th>
              <th>Durum</th>
              <th>Proje</th>
              <th>Firma</th>
              <th>Oluşturma Tarihi</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody id="taskListesiBody">
            <!-- Dinamik içerik burada yüklenir -->
          </tbody>
        </table>

        <!-- Sayfalama -->
        <nav aria-label="Page navigation">
          <ul class="pagination justify-content-center">
            <li class="page-item"><a class="page-link" href="#" onclick="changeTaskPage('previous')">Previous</a></li>
            <li class="page-item"><a class="page-link" href="#" onclick="changeTaskPage('next')">Next</a></li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- Yeni Görev Formu -->
    <div class="card" id="yeniGorevForm" style="display: none;">
      <div class="card-body">
        <h4>Yeni Görev</h4>
        <form id="newTaskForm">
          <div class="row">
            <div class="col-md-6">
              <div class="mb-3">
                <label class="form-label">Durum</label>
                <select class="form-select" id="taskStatus" required>
                  <option value="acik">Açık</option>
                  <option value="yapiliyor">Yapılıyor</option>
                  <option value="tamamlanmis">Tamamlanmış</option>
                </select>
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3">
                <label class="form-label">Görev</label>
                <input type="text" class="form-control" id="taskName" required>
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3">
                <label class="form-label">Bağlı Olduğu Proje</label>
                <select class="form-select" id="taskProject" required>
                  <!-- Dinamik içerik burada yüklenir -->
                </select>
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3">
                <label class="form-label">Firma</label>
                <select class="form-select" id="taskCompany" required>
                  <!-- Dinamik içerik burada yüklenir -->
                </select>
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3">
                <label class="form-label">Oluşturma Tarihi</label>
                <input type="date" class="form-control" id="taskDate" required>
              </div>
            </div>
            <div class="col-md-12">
              <div class="mb-3">
                <label class="form-label">Not</label>
                <textarea class="form-control" id="taskNote" rows="3"></textarea>
              </div>
            </div>
          </div>
          
          <button type="submit" class="btn btn-primary">Kaydet</button>
          <button type="button" class="btn btn-secondary" onclick="cancelTaskForm()">İptal</button>
        </form>
      </div>
    </div>

    <!-- Görev Detay Görünümü -->
    <div class="modal fade" id="taskDetailModal" tabindex="-1" aria-labelledby="taskDetailModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="taskDetailModalLabel">Görev Detayı</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Durum</label>
                  <select class="form-select" id="taskStatusDetail" disabled>
                    <option value="acik">Açık</option>
                    <option value="yapiliyor">Yapılıyor</option>
                    <option value="tamamlanmis">Tamamlanmış</option>
                  </select>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Görev</label>
                  <input type="text" class="form-control" id="taskNameDetail" disabled>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Bağlı Olduğu Proje</label>
                  <input type="text" class="form-control" id="taskProjectDetail" disabled>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Firma</label>
                  <input type="text" class="form-control" id="taskCompanyDetail" disabled>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Oluşturma Tarihi</label>
                  <input type="date" class="form-control" id="taskDateDetail" disabled>
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Not</label>
                  <textarea class="form-control" id="taskNoteDetail" rows="3" disabled></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Kapat</button>
          </div>
        </div>
      </div>
    </div>

    <script>
      // Yeni görev formunu gösterme
      function showNewTaskForm() {
        const form = document.getElementById('yeniGorevForm');
        form.style.display = 'block';
        document.getElementById('newTaskForm').reset();
      }

      // Form iptal
      function cancelTaskForm() {
        document.getElementById('yeniGorevForm').style.display = 'none';
      }

      // Sayfa değiştirme
      function changeTaskPage(direction) {
        google.script.run.changeTaskPage(direction);
      }

      // Filtreleme
      function filterTasks() {
        const status = document.getElementById('taskStatusFilter').value;
        const project = document.getElementById('taskProjectFilter').value;
        google.script.run.filterTasks(status, project);
      }

      // Görev detayını gösterme
      function showTaskDetail(taskId) {
        google.script.run.withSuccessHandler(function(taskData) {
          document.getElementById('taskStatusDetail').value = taskData.status;
          document.getElementById('taskNameDetail').value = taskData.name;
          document.getElementById('taskProjectDetail').value = taskData.project;
          document.getElementById('taskCompanyDetail').value = taskData.company;
          document.getElementById('taskDateDetail').value = taskData.date;
          document.getElementById('taskNoteDetail').value = taskData.note;
          
          const modal = new bootstrap.Modal(document.getElementById('taskDetailModal'));
          modal.show();
        }).getTaskDetail(taskId);
      }

      // Form gönderme
      document.getElementById('newTaskForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        google.script.run.saveTask(formData);
      });
    </script>
  </div>
</div>
