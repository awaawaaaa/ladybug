/* Data materi dan pertanyaan LadyBug. Silakan tambah soal/materi di file ini. */
window.LADYBUG_DATA = {
  lessons: {
    python: {
      label: "PYTHON DASAR", title: "Apa itu Python?", subtitle: "Kenalan dengan Python",
      icon: "🐍",
      description: "Python adalah bahasa pemrograman tingkat tinggi yang sintaksnya mudah dibaca. Python sering digunakan untuk membuat aplikasi, mengolah data, otomatisasi, dan kecerdasan buatan.",
      code: 'print("Hello, world!")',
      tip: "Fungsi print() digunakan untuk menampilkan teks atau nilai ke layar."
    },
    web: {
      label: "WEB DASAR", title: "Kenalan dengan HTML", subtitle: "Fondasi halaman web",
      icon: "🌐",
      description: "HTML (HyperText Markup Language) adalah bahasa markup untuk menyusun struktur halaman web. HTML menggunakan elemen yang ditulis dengan tag.",
      code: "<h1>Hello, world!</h1>",
      tip: "Tag <h1> digunakan untuk membuat judul utama pada halaman web."
    }
  },
  quiz: [
    {q:"Apa fungsi print() di Python?", options:["Menghapus file","Menampilkan output","Mengulang kode","Membuat variabel"], answer:1, explain:"Benar! print() menampilkan output ke layar."},
    {q:"Manakah contoh penulisan variabel yang benar di Python?", options:["2nama = 'Ayu'","nama siswa = 'Ayu'","nama = 'Ayu'","class = 'Ayu'"], answer:2, explain:"Tepat! Nama variabel tidak boleh diawali angka atau memakai spasi."},
    {q:"HTML digunakan untuk apa?", options:["Mengatur struktur halaman web","Mengolah database","Membuat sistem operasi","Mengedit video"], answer:0, explain:"Betul! HTML menyusun struktur dan konten halaman web."},
    {q:"Tag HTML untuk judul terbesar adalah ...", options:["<p>","<h1>","<img>","<br>"], answer:1, explain:"Benar! <h1> merupakan heading level pertama."},
    {q:"Tipe data untuk nilai True atau False disebut ...", options:["String","Integer","Boolean","Float"], answer:2, explain:"Yap! Boolean menyimpan nilai benar atau salah."}
  ],
  quick: [
    {q:"Ekstensi file Python adalah ...", options:[".html",".py",".css"], answer:1},
    {q:"HTML adalah singkatan dari ...", options:["HyperText Markup Language","HighText Machine Language","HyperTool Main Link"], answer:0},
    {q:"Simbol komentar satu baris di Python adalah ...", options:["//","#","<!-- -->"], answer:1},
    {q:"CSS digunakan untuk ...", options:["Mengatur tampilan","Menyimpan data","Menjalankan server"], answer:0},
    {q:"Tag untuk paragraf HTML adalah ...", options:["<h1>","<p>","<div>"], answer:1},
    {q:"Tipe data bilangan bulat Python adalah ...", options:["int","str","bool"], answer:0}
  ]
};