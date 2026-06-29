import express from "express";
import { login, logout, register, updateProfile, getProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

/**
 * @swagger
 * /api/v1/user/register:
 *   post:
 *     tags: [User]
 *     summary: Register a new user
 *     description: Create a new user account with profile photo upload
 *     security: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: fullname
 *         type: string
 *         required: true
 *         description: Full name of the user
 *         example: John Doe
 *       - in: formData
 *         name: email
 *         type: string
 *         format: email
 *         required: true
 *         description: Email address
 *         example: john@example.com
 *       - in: formData
 *         name: phoneNumber
 *         type: integer
 *         required: true
 *         description: Phone number
 *         example: 1234567890
 *       - in: formData
 *         name: password
 *         type: string
 *         required: true
 *         minLength: 6
 *         description: Password (minimum 6 characters)
 *         example: password123
 *       - in: formData
 *         name: role
 *         type: string
 *         required: true
 *         enum: [student, recruiter]
 *         description: User role
 *         example: student
 *       - in: formData
 *         name: file
 *         type: file
 *         required: true
 *         description: Profile photo
 *     responses:
 *       201:
 *         description: Account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Account created successfully.
 *       400:
 *         description: Bad request - missing fields or user already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/register", singleUpload, register);

/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     tags: [User]
 *     summary: Login to user account
 *     description: Authenticate user and return JWT token in cookie
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserLoginResponse'
 *         headers:
 *           Set-Cookie:
 *             description: JWT token cookie
 *             schema:
 *               type: string
 *       400:
 *         description: Invalid credentials or role mismatch
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/login", login);

/**
 * @swagger
 * /api/v1/user/logout:
 *   post:
 *     tags: [User]
 *     summary: Logout from user account
 *     description: Clear the authentication cookie
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Logged out successfully.
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/logout", logout);

/**
 * @swagger
 * /api/v1/user/profile:
 *   get:
 *     tags: [User]
 *     summary: Get current user profile
 *     description: Retrieve the authenticated user's profile information
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized - not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/profile", isAuthenticated, getProfile);

/**
 * @swagger
 * /api/v1/user/profile/update:
 *   put:
 *     tags: [User]
 *     summary: Update user profile
 *     description: Update authenticated user's profile information with optional resume upload
 *     security:
 *       - cookieAuth: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: fullname
 *         type: string
 *         description: Updated full name
 *         example: John Doe Updated
 *       - in: formData
 *         name: email
 *         type: string
 *         format: email
 *         description: Updated email
 *         example: john.updated@example.com
 *       - in: formData
 *         name: phoneNumber
 *         type: integer
 *         description: Updated phone number
 *         example: 9876543210
 *       - in: formData
 *         name: bio
 *         type: string
 *         description: User biography
 *         example: Software developer with 5 years experience
 *       - in: formData
 *         name: skills
 *         type: string
 *         description: Comma-separated list of skills
 *         example: JavaScript,React,Node.js
 *       - in: formData
 *         name: file
 *         type: file
 *         description: Resume file upload
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Profile updated successfully.
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized - not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put("/profile/update", isAuthenticated, singleUpload, updateProfile);

export default router;
