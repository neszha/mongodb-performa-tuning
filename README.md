# MongoDB Performa Tuning

Performa tuning MongoDB menggunakan indexing dan caching adalah salah satu cara untuk meningkatkan kinerja database dan mengoptimalkan aplikasi yang menggunakan MongoDB sebagai backend. Dalam hal ini, indexing dan caching adalah dua teknik yang sangat penting untuk meningkatkan performa MongoDB.

Indexing adalah teknik untuk membuat struktur data tambahan yang membantu database dalam mengeksekusi query dengan lebih cepat dan efisien. Dalam MongoDB, indexing sangat penting karena query yang dilakukan pada database dapat menjadi sangat kompleks. Dengan membuat index pada field-field tertentu dalam sebuah collection, MongoDB dapat mengurangi jumlah data yang harus dicari, sehingga meningkatkan performa query secara signifikan.

Caching menggunakan Redis adalah teknik performa tuning yang digunakan untuk meningkatkan kinerja MongoDB dengan menggunakan Redis sebagai layer caching di atas MongoDB. Redis adalah database cache yang cepat dan dapat diakses secara in-memory, sehingga memungkinkan aplikasi untuk mengakses data yang disimpan dalam Redis dengan lebih cepat dibandingkan dengan mengakses data langsung dari MongoDB.

# Persiapaan

Adapun software dan tools yang dibutuhkan yaitu:
- <a href="https://nodejs.org/en/download">NodeJS</a>
- <a href="https://github.com/tporadowski/redis/releases/download/v5.0.14.1/Redis-x64-5.0.14.1.msi">Redis for Windows</a>
- <a href="https://www.mongodb.com/try/download/community">MongoDB Server & MongoDB Compass</a>
- <a href="https://www.mongodb.com/try/download/database-tools">MongoDBCommand Line Database Tools</a>
- <a href="db-tuning.mongo-data.rar">MongoDB Data for Test</a>

# Instalasi

Adapun proses instalasi yang harus dilakukan:
- Lakukan instalasi NodeJS, Redis, MongoDB, dan MongoDB Tools.
- Lakukan import data 'db-tuning.mongo-data.rar' menggunakan `mongorestore`.
- Buka project dan siapkan file `.env`
- Lakukan instalasi "dependencies" menggunakan perintah:
```
npm install
```

# Menjalankan Test

Untuk menjalankan tes, anda dapat menjalankan perintah ini:

```
npm run test
```
