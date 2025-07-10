const { Router } = require("express")
const { addComment, removeComment } = require("../controller/comment.ctr")
const accesToken_middleware = require("../middleware/accesToken_middleware")

const commentRouter = Router()
/**
 * @swagger
 * tags:
 *   name: Comment
 *   description: Izohlar bilan ishlash API
 */

/**
 * @swagger
 * /comment/get_all_coments:
 *   post:
 *     summary: Barcha izohlarni olish
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Izohlar muvaffaqiyatli qaytarildi
 *       401:
 *         description: Token noto‘g‘ri yoki yo‘q
 */
commentRouter.get("/get_all_coments", accesToken_middleware)

/**
 * @swagger
 * /comment/add_Comment:
 *   post:
 *     summary: Yangi izoh qo‘shish
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookId
 *               - message
 *             properties:
 *               bookId:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Izoh qo‘shildi
 *       400:
 *         description: Ma’lumot to‘liq emas
 *       401:
 *         description: Avtorizatsiya xatosi
 */
commentRouter.post("/add_Comment", accesToken_middleware, addComment)

/**
 * @swagger
 * /comment/remove_Comment/{id}:
 *   delete:
 *     summary: Izohni o‘chirish
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Izoh IDsi
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Izoh o‘chirildi
 *       404:
 *         description: Izoh topilmadi
 *       401:
 *         description: Token noto‘g‘ri yoki yo‘q
 */
commentRouter.delete("/remove_Comment/:id", accesToken_middleware, removeComment)

module.exports = commentRouter