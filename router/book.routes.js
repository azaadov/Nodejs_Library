const { Router } = require("express")
const { getAllBooks, getOneBook, addBook, updateBook, deleteBook, searchBook } = require("../controller/book.ctr")
const checkAdmin = require("../middleware/checkAdmin")
const bookValidate = require("../middleware/bookValidate")
const accesToken_middleware = require("../middleware/accesToken_middleware")


const BookRouter = Router()
/**
 * @swagger
 * tags:
 *   name: Book
 *   description: Kitoblar bilan ishlash API
 */

/**
 * @swagger
 * /book/get_all_books:
 *   get:
 *     summary: Barcha kitoblarni olish
 *     tags: [Book]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Kitoblar ro'yxati muvaffaqiyatli qaytarildi
 */
BookRouter.get("/get_all_books", accesToken_middleware, getAllBooks)

/**
 * @swagger
 * /book/search_book:
 *   get:
 *     summary: Kitoblarni qidirish
 *     tags: [Book]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: q
 *         in: query
 *         required: false
 *         description: Qidiruv matni (kitob nomi, muallif va h.k.)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Qidiruv natijalari
 */
BookRouter.get("/search_book", accesToken_middleware, searchBook)

/**
 * @swagger
 * /book/get_one_book/{id}:
 *   get:
 *     summary: ID orqali kitobni olish
 *     tags: [Book]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Kitob IDsi
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Kitob topildi
 *       404:
 *         description: Kitob topilmadi
 */
BookRouter.get("/get_one_book/:id", accesToken_middleware, getOneBook)

/**
 * @swagger
 * /book/add_book:
 *   post:
 *     summary: Yangi kitob qo‘shish
 *     tags: [Book]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *               - year
 *               - genre
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               year:
 *                 type: number
 *               genre:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Kitob muvaffaqiyatli qo‘shildi
 *       400:
 *         description: Noto‘g‘ri ma’lumotlar
 *       403:
 *         description: Faqat admin ruxsati kerak
 */
BookRouter.post("/add_book", [accesToken_middleware, checkAdmin, bookValidate], addBook)

/**
 * @swagger
 * /book/update_book/{id}:
 *   put:
 *     summary: Kitobni yangilash
 *     tags: [Book]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Kitob IDsi
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               year:
 *                 type: number
 *               genre:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Kitob ma’lumotlari yangilandi
 *       403:
 *         description: Admin ruxsati kerak
 *       404:
 *         description: Kitob topilmadi
 */
BookRouter.put("/update_book/:id", [accesToken_middleware, checkAdmin, bookValidate], updateBook)

/**
 * @swagger
 * /book/delete_book/{id}:
 *   delete:
 *     summary: Kitobni o‘chirish
 *     tags: [Book]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Kitob IDsi
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Kitob o‘chirildi
 *       403:
 *         description: Faqat admin o‘chira oladi
 *       404:
 *         description: Kitob topilmadi
 */
BookRouter.delete("/delete_book/:id", [accesToken_middleware, checkAdmin], deleteBook)

module.exports = BookRouter