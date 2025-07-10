const { Router } = require("express")
const { getAllAuthors, addAuthor, getOneAuthor, updateAuthor, deleteAuthor, search } = require("../controller/author.ctr")
const authorValidateMiddleware = require("../middleware/author.validate.middleware")
const checkAdmin = require("../middleware/checkAdmin")
const accesToken_middleware = require("../middleware/accesToken_middleware")


const authorRouter = Router()
/**
 * @swagger
 * tags:
 *   name: Author
 *   description: Mualliflar bilan ishlash API
 */

/**
 * @swagger
 * /author/get_all_authors:
 *   get:
 *     summary: Barcha mualliflarni olish
 *     tags: [Author]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Mualliflar ro'yxati
 */
authorRouter.get("/get_all_authors", accesToken_middleware, getAllAuthors)

/**
 * @swagger
 * /author/search_author:
 *   get:
 *     summary: Muallifni ism yoki boshqa mezon bo‘yicha qidirish
 *     tags: [Author]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: q
 *         in: query
 *         required: false
 *         description: Qidiruv matni
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Mos keluvchi mualliflar ro'yxati
 */
authorRouter.get("/search_author", accesToken_middleware, search)

/**
 * @swagger
 * /author/get_one_author/{id}:
 *   get:
 *     summary: ID bo‘yicha bitta muallifni olish
 *     tags: [Author]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Muallif IDsi
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Muallif topildi
 *       404:
 *         description: Muallif topilmadi
 */
authorRouter.get("/get_one_author/:id", accesToken_middleware, getOneAuthor)

/**
 * @swagger
 * /author/add_author:
 *   post:
 *     summary: Yangi muallif qo‘shish
 *     tags: [Author]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fulName
 *               - dateOfBirth
 *               - period
 *             properties:
 *               fulName:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *               dateOfDeath:
 *                 type: string
 *                 format: date
 *               countOfBook:
 *                 type: number
 *               countOfAudioBook:
 *                 type: number
 *               period:
 *                 type: string
 *               bio:
 *                 type: string
 *               creativity:
 *                 type: string
 *               region:
 *                 type: string
 *     responses:
 *       201:
 *         description: Muallif muvaffaqiyatli qo‘shildi
 *       400:
 *         description: Xatolik mavjud
 *       403:
 *         description: Faqat admin ruxsatiga ega foydalanuvchilar
 */
authorRouter.post("/add_author", [accesToken_middleware, checkAdmin, authorValidateMiddleware], addAuthor)

/**
 * @swagger
 * /author/update_author/{id}:
 *   put:
 *     summary: Muallif ma’lumotlarini yangilash
 *     tags: [Author]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Muallif IDsi
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fulName:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *               dateOfDeath:
 *                 type: string
 *                 format: date
 *               countOfBook:
 *                 type: number
 *               countOfAudioBook:
 *                 type: number
 *               period:
 *                 type: string
 *               bio:
 *                 type: string
 *               creativity:
 *                 type: string
 *               region:
 *                 type: string
 *     responses:
 *       200:
 *         description: Ma'lumot yangilandi
 *       403:
 *         description: Ruxsat yo‘q (Admin kerak)
 *       404:
 *         description: Muallif topilmadi
 */
authorRouter.put("/update_author/:id", [checkAdmin, accesToken_middleware, authorValidateMiddleware], updateAuthor)

/**
 * @swagger
 * /author/delete_author/{id}:
 *   delete:
 *     summary: Muallifni o‘chirish
 *     tags: [Author]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Muallif IDsi
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: O‘chirish muvaffaqiyatli
 *       403:
 *         description: Ruxsat yo‘q (Admin kerak)
 *       404:
 *         description: Muallif topilmadi
 */
authorRouter.delete("/delete_author/:id", [checkAdmin, accesToken_middleware], deleteAuthor)

module.exports = authorRouter