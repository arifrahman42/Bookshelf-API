/* TODO 2: Menyiapkan routes.js sebagai pemisah routes configuration
agar satu file JavaScript memiliki single responsibility principle. */

const {
  addBookHandler, getAllBooksHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler
} = require('./handler')

const routes = [
  {
    // TODO 3: Konfigurasi routing untuk menambahkan data buku dengan metode POST.
    method: 'POST',
    path: '/books',
    // TODO 13: Menggunakan fungsi addBookHandler dari handler.js.
    handler: addBookHandler
  },

  {
    // TODO 16: Konfigurasi routing untuk mendapatkan data semua buku dengan metode GET.
    method: 'GET',
    path: '/books',
    // TODO 20: Menggunakan fungsi getAllBooksHandler dari handler.js.
    handler: getAllBooksHandler
  },

  {
    // TODO 21: Konfigurasi routing untuk mendapatkan detail data buku dengan Id dengan metode GET.
    method: 'GET',
    path: '/books/{id}',
    // TODO 27: Menggunakan fungsi getBookByIdHandler dari handler.js
    handler: getBookByIdHandler
  },

  {
    // TODO 28: Konfigurasi routing untuk mengubah data buku dengan Id dengan metode PUT.
    method: 'PUT',
    path: '/books/{id}',
    // TODO 38: Menggunakan fungsi editBookByIdHandler dari handler.js
    handler: editBookByIdHandler
  },

  {
    // TODO 39: Konfigurasi routing untuk menghapus data buku dengan Id dengan metode DELETE.
    method: 'DELETE',
    path: '/books/{id}',
    // TODO 46: Menggunakan fungsi deleteBookByIdHandler dari handler.js
    handler: deleteBookByIdHandler
  }
]

module.exports = routes
