const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('#main-nav');
menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Tutup menu' : 'Buka menu');
  menuButton.textContent = isOpen ? '×' : '☰';
});
function closeMenu() {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Buka menu');
  menuButton.textContent = '☰';
}
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

const solutions = {
  pmb: { icon: 'users', kicker: 'PENERIMAAN MAHASISWA BARU', title: 'Kesan pertama yang baik,\ndimulai dari pendaftaran.', description: 'Permudah calon mahasiswa bergabung dengan kampus Anda. Seluruh proses pendaftaran tersusun rapi, dari pengisian formulir hingga daftar ulang.', features: ['Formulir pendaftaran online', 'Seleksi & pengumuman hasil', 'Verifikasi berkas terpusat', 'Registrasi ulang mahasiswa'], cover: 'Masa depanmu,\ndimulai hari ini.', steps: ['Pendaftaran', 'Verifikasi', 'Seleksi', 'Daftar ulang'], notice: 'Selangkah lebih dekat dengan impianmu.', sub: 'Calon mahasiswa · Tahun ajaran 2026/2027' },
  akademik: { icon: 'book', kicker: 'SISTEM INFORMASI AKADEMIK', title: 'Perkuliahan lebih teratur.\nBelajar lebih maksimal.', description: 'Hubungkan mahasiswa, dosen, dan administrasi dalam satu sistem. Kelola aktivitas perkuliahan dan akses informasi akademik dengan lebih mudah.', features: ['Pengisian & persetujuan KRS', 'Jadwal kuliah & presensi', 'Pengelolaan nilai & KHS', 'Portal mahasiswa & dosen'], cover: 'Rencana terarah,\nprestasi lebih cerah.', steps: ['Registrasi', 'KRS', 'Perkuliahan', 'Hasil studi'], notice: 'Semua informasi akademik, dalam satu tempat.', sub: 'Mahasiswa aktif · Semester Ganjil 2026/2027' },
  spc: { icon: 'wallet', kicker: 'STUDENT PAYMENT CAMPUS', title: 'Pembayaran lebih mudah.\nAdministrasi lebih rapi.', description: 'Kelola tagihan pendidikan dan pantau pembayaran mahasiswa secara terpusat. Hubungkan administrasi keuangan dengan proses akademik kampus.', features: ['Pengelolaan tagihan kuliah', 'Riwayat pembayaran', 'Integrasi kanal pembayaran', 'Rekap & laporan keuangan'], cover: 'Bayar lebih praktis,\nkuliah lebih tenang.', steps: ['Tagihan', 'Pembayaran', 'Verifikasi', 'Selesai'], notice: 'Status pembayaran dapat dipantau melalui portal.', sub: 'Mahasiswa aktif · Administrasi keuangan' },
  wisuda: { icon: 'cap', kicker: 'KELULUSAN & WISUDA', title: 'Akhir studi yang berkesan.\nAwal perjalanan baru.', description: 'Bantu mahasiswa menuntaskan perjalanan studinya. Kelola persyaratan kelulusan, yudisium, dan pendaftaran wisuda melalui proses yang terstruktur.', features: ['Administrasi tugas akhir', 'Verifikasi syarat kelulusan', 'Yudisium & transkrip nilai', 'Pendaftaran peserta wisuda'], cover: 'Satu pencapaian,\njutaan kemungkinan.', steps: ['Tugas akhir', 'Verifikasi', 'Yudisium', 'Wisuda'], notice: 'Rayakan pencapaian, persiapkan masa depan.', sub: 'Mahasiswa tingkat akhir · Persiapan kelulusan' }
};
const tabs = [...document.querySelectorAll('[data-tab]')];
function multiline(element, value) {
  element.replaceChildren();
  value.split('\n').forEach((line, index) => { if (index) element.append(document.createElement('br')); element.append(document.createTextNode(line)); });
}
function selectTab(key) {
  const data = solutions[key];
  if (!data) return;
  tabs.forEach(tab => { const active = tab.dataset.tab === key; tab.classList.toggle('active', active); tab.setAttribute('aria-selected', String(active)); tab.tabIndex = active ? 0 : -1; });
  document.querySelector('#solution-panel').setAttribute('aria-labelledby', `tab-${key}`);
  document.querySelector('#solution-icon').setAttribute('href', `#${data.icon}`);
  document.querySelector('#solution-kicker').textContent = data.kicker;
  multiline(document.querySelector('#solution-title'), data.title);
  document.querySelector('#solution-description').textContent = data.description;
  document.querySelector('#solution-features').replaceChildren(...data.features.map(feature => { const span = document.createElement('span'); span.textContent = feature; return span; }));
  multiline(document.querySelector('.student-cover h4'), data.cover);
  document.querySelectorAll('.application-progress div span').forEach((span, index) => { span.textContent = data.steps[index]; });
  document.querySelector('.application-notice strong').textContent = data.notice;
  document.querySelector('.application-row small').textContent = data.sub;
}
tabs.forEach((tab, index) => {
  tab.id = `tab-${tab.dataset.tab}`;
  tab.setAttribute('aria-controls', 'solution-panel');
  tab.addEventListener('click', () => selectTab(tab.dataset.tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) { event.preventDefault(); selectTab(tabs[next].dataset.tab); tabs[next].focus(); }
  });
});
document.querySelectorAll('[data-go-tab]').forEach(link => link.addEventListener('click', () => selectTab(link.dataset.goTab)));
selectTab('pmb');
document.querySelector('#demo-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const campus = form.elements.campus.value.trim();
  const name = form.elements.name.value.trim();
  if (!campus || !name) { const input = !campus ? form.elements.campus : form.elements.name; input.setCustomValidity('Mohon isi informasi ini.'); input.reportValidity(); return; }
  const message = `Halo tim SIATO, saya ${name} dari ${campus}. Saya ingin menjadwalkan demo dan konsultasi untuk ${form.elements.interest.value}. Mohon informasi jadwal yang tersedia. Terima kasih.`;
  window.open(`https://wa.me/6285977258471?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
});
document.querySelectorAll('#demo-form input').forEach(input => input.addEventListener('input', () => input.setCustomValidity('')));
document.querySelector('#year').textContent = new Date().getFullYear();

// Dashboard previews remain on this page and use illustrative data only.
const dashboardDialog = document.querySelector('#dashboard-dialog');
const dashboardContent = document.querySelector('#dashboard-dialog-content');
const dashboardDemoLink = document.querySelector('#dashboard-demo-link');
let dashboardOpener;
const previewModules = {
  pmb: { title: 'Dashboard PMB', interest: 'Penerimaan Mahasiswa Baru' },
  akademik: { title: 'Dashboard Akademik', interest: 'Sistem Akademik' },
  spc: { title: 'Dashboard Pembayaran SPC', interest: 'Pembayaran & SPC' }
};

function chooseDemoModule(interest) {
  const select = document.querySelector('#interest');
  if ([...select.options].some(option => option.value === interest)) select.value = interest;
}

document.querySelectorAll('[data-preview]').forEach(button => {
  button.addEventListener('click', () => {
    const key = button.dataset.preview;
    const module = previewModules[key];
    const screen = document.querySelector(`[data-product="${key}"] .product-screen`);
    if (!module || !screen) return;
    dashboardOpener = button;
    document.querySelector('#dashboard-dialog-title').textContent = module.title;
    dashboardContent.className = `dialog-preview product-${key}`;
    dashboardContent.replaceChildren(screen.cloneNode(true));
    dashboardDemoLink.dataset.demoInterest = module.interest;
    dashboardDialog.showModal();
    document.body.classList.add('dashboard-open');
  });
});

dashboardDialog.querySelector('.dialog-close').addEventListener('click', () => dashboardDialog.close());
dashboardDialog.addEventListener('click', event => {
  const rect = dashboardDialog.getBoundingClientRect();
  if (event.target === dashboardDialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dashboardDialog.close();
});
dashboardDialog.addEventListener('close', () => {
  document.body.classList.remove('dashboard-open');
  if (dashboardOpener) dashboardOpener.focus({ preventScroll: true });
});
document.querySelectorAll('[data-demo-interest], #dashboard-demo-link').forEach(link => {
  link.addEventListener('click', () => {
    chooseDemoModule(link.dataset.demoInterest);
    if (dashboardDialog.open) dashboardDialog.close();
    // Wait for the dialog's close event before moving focus to the form.
    requestAnimationFrame(() => document.querySelector('#campus').focus({ preventScroll: true }));
  });
});
