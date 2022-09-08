// const { response } = require('@hapi/hapi/lib/validation')
const { nanoid } = require('nanoid')
const books = require('./books')

/* TODO 5: Membuat fungsi untuk menambahkan buku.
   TODO 7: Data buku akan disimpan dalam bentuk JSON melalui body request. */
const addBookHandler = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload
  /* TODO 15: Menambahkan response pada server jika nama buku kosong &
  jumlah halaman yang dibaca lebih besar dari jumlah halaman buku. */
  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'
    })
    response.code(400)
    return response
  }

  if (pageCount < readPage) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    })
    response.code(400)
    return response
  }

  // TODO 8: Menggunakan library nanoid untuk generate nomor ID yang acak.
  const id = nanoid(16)
  // TODO 9: Menambahkan properti insertedAt & updatedAt.
  const insertedAt = new Date().toISOString()
  const updatedAt = insertedAt
  /* TODO 14: Menambahkan properti finsihed dimana jumlah halaman buku sama dengan
  jumlah halaman yang dibaca. */
  const finished = (pageCount === readPage)

  // TODO 10 : Memasukkan nilai properti ke dalam array books menggunakan method push().
  const addBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt
  }
  books.push(addBook)

  /* TODO 11: Menggunakan method filter() untuk mengetahui apakah addBook sudah masuk ke dalam
  array books. */
  const isSuccess = books.filter((book) => book.id).length > 0

  // TODO 12: Menambahkan response pada server baik data buku berhasil ditambahkan ataupun gagal.
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id
      }
    })
    response.code(201)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan'
  })
  response.code(500)
  return response
}

// TODO 17: Membuat fungsi untuk menampilkan data semua buku.
const getAllBooksHandler = (request, h) => {
  const booksData = books
  // TODO 19: Menambahkan response pada server baik data buku berhasil didapatkan ataupun kosong.
  const response = h.response({
    status: 'success',
    data: {
      books: booksData.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher
      }))
    }
  })
  response.code(200)
  return response
}

/* TODO 22: Membuat fungsi untuk menampilkan detail data buku berdasarkan Id.
   TODO 23: Mendapatkan nilai id dari request.params dan mendapatkan objek
   book dengan id dari objek array books. */
const getBookByIdHandler = (request, h) => {
  const { id } = request.params
  const book = books.filter((b) => b.id === id)[0]
  // TODO 24: Menambahkan response pada server jika data Id sesuai.
  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book
      }
    }
  }

  // TODO 25: Menambahkan response pada server jika data Id tidak sesuai.
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan'
  })
  response.code(404)
  return response
}

/* TODO 29: Membuat fungsi untuk menampilkan data buku berdasarkan Id.
   TODO 30: Mendapatkan nilai id dari request.params dan mendapatkan objek
   book dengan id dari objek array books. */
const editBookByIdHandler = (request, h) => {
  const { id } = request.params
  // TODO 31: Data buku yang baru akan disimpan dalam bentuk JSON melalui body request.
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload
  // TODO 32: Menambahkan properti updatedAt.
  const updatedAt = new Date().toISOString()
  /* TODO 33: Menambahkan properti finsihed untuk buku yang datanya diubah,
  dimana jumlah halaman buku harus sama dengan jumlah halaman yang dibaca. */
  const finished = (pageCount === readPage)
  const index = books.findIndex((book) => book.id === id)

  /* TODO 36: Menambahkan response pada server jika nama buku kosong &
  jumlah halaman yang dibaca lebih besar dari jumlah halaman buku. */
  if (index !== -1) {
    if (name === undefined) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku'
      })
      response.code(400)
      return response
    }

    if (pageCount < readPage) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
      })
      response.code(400)
      return response
    }

    // TODO 34: Memasukkan nilai indeks untuk buku yang datanya akan diubah.
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      updatedAt
    }

    // TODO 35: Menambahkan response pada server baik data buku berhasil diubah ataupun gagal.
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui'
    })
    response.code(200)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan'
  })
  response.code(404)
  return response
}

/* TODO 40: Membuat fungsi untuk menghapus data buku berdasarkan Id.
   TODO 41: Mendapatkan nilai id dari request.params dan mendapatkan objek
   book dengan id dari objek array books. */
const deleteBookByIdHandler = (request, h) => {
  const { id } = request.params
  const index = books.findIndex((book) => book.id === id)

  /* TODO 42: Jika nilai index bukan -1, maka data buku akan dihapus
  dengan menggunakan method slice(). */
  if (index !== -1) {
    books.splice(index, 1)
    // TODO 43: Menambahkan response pada server jika data buku berhasil dihapus.
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus'
    })
    response.code(200)
    return response
  }

  // TODO 44: Menambahkan response pada server jika data buku gagal dihapus.
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan'
  })
  response.code(404)
  return response
}

/* TODO 6: Pastikan fungsi addBookHandler sudah terekspor.
   TODO 18: Pastikan fungsi get AllBookHandler sudah terekspor.
   TODO 26: Pastikan fungsi getBookByIdHandler sudah terekspor.
   TODO 37: Pastikan fungsi editBookByIdHandler sudah tereskpor.
   TODO 45: Pastikan fungsi deleteBookByIdHandler sudah terekspor. */
module.exports = { addBookHandler, getAllBooksHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler }
