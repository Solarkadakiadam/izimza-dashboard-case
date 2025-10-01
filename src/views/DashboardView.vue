<template>
  <DashboardLayout>
    <template #title>Ana Sayfa</template>

    <div class="dashboard-welcome">
      <h1 class="welcome-title">Merhaba, {{ authStore.currentUser?.name }}</h1>
      <p class="welcome-subtitle">Bugün hangi belgelerinizi imzalamak istiyorsunuz?</p>
    </div>

    <div class="dashboard-stats">
      <Card class="stat-card">
        <template #content>
          <div class="stat-content">
            <div class="stat-icon stat-icon--primary">
              <i class="pi pi-pencil"></i>
            </div>
            <div class="stat-info">
              <h3 class="stat-title">Toplam İmzalama</h3>
              <p class="stat-value">{{ stats.totalSignatures }}</p>
            </div>
          </div>
        </template>
      </Card>

      <Card class="stat-card">
        <template #content>
          <div class="stat-content">
            <div class="stat-icon stat-icon--secondary">
              <i class="pi pi-folder"></i>
            </div>
            <div class="stat-info">
              <h3 class="stat-title">Arşivlenen Doküman</h3>
              <p class="stat-value">{{ stats.archivedDocuments }}</p>
            </div>
          </div>
        </template>
      </Card>

      <Card class="stat-card">
        <template #content>
          <div class="stat-content">
            <div class="stat-icon stat-icon--success">
              <i class="pi pi-credit-card"></i>
            </div>
            <div class="stat-info">
              <h3 class="stat-title">Kalan Kontör</h3>
              <p class="stat-value">{{ stats.remainingCredits }}</p>
            </div>
          </div>
        </template>
      </Card>

      <Card class="stat-card">
        <template #content>
          <div class="stat-content">
            <div class="stat-icon stat-icon--info">
              <i class="pi pi-cloud"></i>
            </div>
            <div class="stat-info">
              <h3 class="stat-title">Arşiv Alanı</h3>
              <p class="stat-value">
                {{ stats.archiveSpaceUsed }} / {{ stats.archiveSpaceTotal }} MB
              </p>
              <ProgressBar
                :value="stats.archiveSpacePercentage"
                :showValue="false"
                style="height: 6px; margin-top: 0.5rem"
              />
            </div>
          </div>
        </template>
      </Card>
    </div>

    <Divider />

    <div class="dashboard-section">
      <h2 class="section-title">Hemen İmzala</h2>
      <Card class="upload-card">
        <template #content>
          <FileUpload
            mode="basic"
            name="files"
            :multiple="true"
            accept=".pdf,.doc,.docx"
            :maxFileSize="10000000"
            @upload="handleFileUpload"
            @select="handleFileSelect"
            class="file-upload"
            chooseLabel="Dosya Seç"
            uploadLabel="Yükle"
            cancelLabel="İptal"
          >
            <template #empty>
              <div class="upload-placeholder">
                <i class="pi pi-plus upload-icon"></i>
                <p class="upload-text">
                  Dosyalarınızı yüklemek için buraya tıklayın ya da sürükleyip bırakın...
                </p>
                <small class="upload-hint">
                  PDF, DOC, DOCX formatları desteklenir (Max: 10MB)
                </small>
              </div>
            </template>
          </FileUpload>
        </template>
      </Card>
    </div>

    <Divider />

    <div class="dashboard-section">
      <div class="section-header">
        <h2 class="section-title">Son Arşivlenen Belgeler</h2>
        <Button
          label="Tümünü Gör"
          icon="pi pi-arrow-right"
          iconPos="right"
          text
          size="small"
          @click="viewAllDocuments"
        />
      </div>

      <Card class="documents-card">
        <template #content>
          <DataTable
            :value="recentDocuments"
            :paginator="false"
            :rows="5"
            class="documents-table"
            :emptyMessage="'Henüz işlem yapılmış bir dokümanınız yok.'"
          >
            <Column field="name" header="Dosya">
              <template #body="{ data }">
                <div class="file-info">
                  <i :class="getFileIcon(data.type)" class="file-icon"></i>
                  <span class="file-name">{{ data.name }}</span>
                  <Badge
                    :value="data.type.toUpperCase()"
                    :severity="getBadgeSeverity(data.type)"
                    style="margin-left: 0.5rem"
                  />
                </div>
              </template>
            </Column>
            <Column field="date" header="Tarih">
              <template #body="{ data }">
                <span class="file-date">{{ formatDate(data.date) }}</span>
              </template>
            </Column>
            <Column field="action" header="İşlem">
              <template #body="{ data }">
                <div class="file-actions">
                  <Button
                    icon="pi pi-eye"
                    text
                    rounded
                    size="small"
                    severity="secondary"
                    @click="viewDocument(data)"
                  />
                  <Button
                    icon="pi pi-download"
                    text
                    rounded
                    size="small"
                    severity="secondary"
                    @click="downloadDocument(data)"
                  />
                </div>
              </template>
            </Column>
          </DataTable>
        </template>
      </Card>
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import FileUpload from 'primevue/fileupload'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ProgressBar from 'primevue/progressbar'
import Badge from 'primevue/badge'
import Divider from 'primevue/divider'
import { useAuthStore } from '@/stores/auth'
import type { Document } from '@/types/auth'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

const authStore = useAuthStore()

const stats = ref({
  totalSignatures: 127,
  archivedDocuments: 45,
  remainingCredits: 23,
  archiveSpaceUsed: 156.8,
  archiveSpaceTotal: 1024,
  archiveSpacePercentage: 15,
})

const recentDocuments = ref<Document[]>([
  {
    id: '1',
    name: 'Sözleşme_2024.pdf',
    type: 'pdf',
    date: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Evrak_Onay.docx',
    type: 'docx',
    date: new Date('2024-01-10'),
  },
  {
    id: '3',
    name: 'Proje_Raporu.pdf',
    type: 'pdf',
    date: new Date('2024-01-05'),
  },
  {
    id: '4',
    name: 'İmza_Belgesi.pdf',
    type: 'pdf',
    date: new Date('2024-01-02'),
  },
])

const handleFileUpload = (event: { files: File | File[] }) => {
  const files = Array.isArray(event.files) ? event.files : [event.files]
  console.log('Files uploaded:', files)
}

const handleFileSelect = (event: { files: File | File[] }) => {
  const files = Array.isArray(event.files) ? event.files : [event.files]
  console.log('Files selected:', files)
}

const viewAllDocuments = () => {
  console.log('View all documents clicked')
}

const getFileIcon = (type: string) => {
  switch (type) {
    case 'pdf':
      return 'pi pi-file-pdf'
    case 'doc':
    case 'docx':
      return 'pi pi-file-word'
    default:
      return 'pi pi-file'
  }
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('tr-TR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

const viewDocument = (document: Document) => {
  console.log('View document:', document)
}

const downloadDocument = (document: Document) => {
  console.log('Download document:', document)
}

const getBadgeSeverity = (type: string) => {
  switch (type) {
    case 'pdf':
      return 'danger'
    case 'docx':
      return 'info'
    default:
      return 'secondary'
  }
}
</script>

<style scoped>
.dashboard-welcome {
  margin-bottom: 2rem;
}

.welcome-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #495057;
  margin: 0 0 0.5rem 0;
}

.welcome-subtitle {
  font-size: 1rem;
  color: #6c757d;
  margin: 0;
}

.dashboard-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.stat-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: white;
}

.stat-icon--primary {
  background: #1976d2;
}

.stat-icon--secondary {
  background: #9c27b0;
}

.stat-icon--success {
  background: #4caf50;
}

.stat-icon--info {
  background: #00bcd4;
}

.stat-info {
  flex: 1;
}

.stat-title {
  font-size: 0.8rem;
  font-weight: 500;
  color: #6c757d;
  margin: 0 0 0.25rem 0;
}

.stat-value {
  font-size: 1rem;
  font-weight: 700;
  color: #495057;
  margin: 0;
}

.dashboard-section {
  margin-bottom: 2rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #495057;
  margin: 0;
}

.upload-card {
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.file-upload {
  width: 100%;
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  border: 2px dashed #dee2e6;
  border-radius: 12px;
  background: #f8f9fa;
  cursor: pointer;
  transition: all 0.2s ease;
}

.upload-placeholder:hover {
  border-color: #1976d2;
  background: #e3f2fd;
}

.upload-icon {
  font-size: 3rem;
  color: #6c757d;
  margin-bottom: 1rem;
}

.upload-text {
  font-size: 1rem;
  color: #495057;
  margin: 0 0 0.5rem 0;
  text-align: center;
}

.upload-hint {
  color: #6c757d;
  font-size: 0.875rem;
}

.documents-card {
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.documents-table {
  border: none;
}

.file-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.file-icon {
  font-size: 1.25rem;
  color: #dc3545;
}

.file-name {
  font-weight: 500;
  color: #495057;
}

.file-date {
  color: #6c757d;
  font-size: 0.875rem;
}

.file-actions {
  display: flex;
  gap: 0.5rem;
}

/* Responsive */
@media (max-width: 768px) {
  .dashboard-welcome {
    margin-bottom: 1.5rem;
  }

  .welcome-title {
    font-size: 1.5rem;
  }

  .welcome-subtitle {
    font-size: 0.9rem;
  }

  .dashboard-stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }

  .stat-content {
    gap: 0.75rem;
  }

  .stat-icon {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1rem;
  }

  .stat-title {
    font-size: 0.7rem;
  }

  .stat-value {
    font-size: 0.9rem;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .section-title {
    font-size: 1.1rem;
  }

  .upload-placeholder {
    padding: 1.5rem 1rem;
  }

  .upload-icon {
    font-size: 2rem;
  }

  .upload-text {
    font-size: 0.875rem;
  }

  .upload-hint {
    font-size: 0.75rem;
  }
}

@media (max-width: 480px) {
  .dashboard-stats {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }

  .stat-content {
    gap: 0.5rem;
  }

  .stat-icon {
    width: 2rem;
    height: 2rem;
    font-size: 0.875rem;
  }

  .stat-title {
    font-size: 0.65rem;
  }

  .stat-value {
    font-size: 0.8rem;
  }

  .upload-placeholder {
    padding: 1rem;
  }

  .upload-icon {
    font-size: 1.5rem;
  }

  .upload-text {
    font-size: 0.8rem;
  }
}
</style>
