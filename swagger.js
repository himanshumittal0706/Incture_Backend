import swaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "CareerWave Backend API",
            version: "1.0.0",
            description: `
## CareerWave - Job Portal Backend API

A comprehensive REST API for a job portal application supporting students, recruiters, and administrators.

### Features
- **User Management**: Registration, authentication, profile management
- **Company Management**: Company registration and profile management
- **Job Management**: Job posting, searching, and management
- **Application Management**: Job applications and status tracking

### Authentication
All protected endpoints require a JWT token sent via HTTP-only cookie. 
Use the \`/api/v1/user/login\` endpoint to obtain a token.

### Roles
- **student**: Can search jobs, apply for jobs, view applications
- **recruiter**: Can create companies, post jobs, manage applicants
            `,
            contact: {
                name: "API Support",
                email: "support@careerwave.com"
            },
            license: {
                name: "ISC",
                url: "https://opensource.org/licenses/ISC"
            }
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Development server"
            }
        ],
        components: {
            securitySchemes: {
                cookieAuth: {
                    type: "apiKey",
                    in: "cookie",
                    name: "token",
                    description: "JWT authentication token sent as HTTP-only cookie"
                }
            },
            schemas: {
                // Common response schemas
                SuccessResponse: {
                    type: "object",
                    properties: {
                        success: {
                            type: "boolean",
                            example: true
                        },
                        message: {
                            type: "string",
                            example: "Operation successful"
                        }
                    }
                },
                ErrorResponse: {
                    type: "object",
                    properties: {
                        success: {
                            type: "boolean",
                            example: false
                        },
                        message: {
                            type: "string",
                            example: "Error message"
                        }
                    }
                },
                // User schemas
                User: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            description: "User ID"
                        },
                        fullname: {
                            type: "string",
                            description: "Full name of the user"
                        },
                        email: {
                            type: "string",
                            format: "email",
                            description: "Email address"
                        },
                        phoneNumber: {
                            type: "number",
                            description: "Phone number"
                        },
                        role: {
                            type: "string",
                            enum: ["student", "recruiter"],
                            description: "User role"
                        },
                        profile: {
                            $ref: "#/components/schemas/UserProfile"
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time"
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time"
                        }
                    }
                },
                UserProfile: {
                    type: "object",
                    properties: {
                        bio: {
                            type: "string",
                            description: "User biography"
                        },
                        skills: {
                            type: "array",
                            items: {
                                type: "string"
                            },
                            description: "List of skills"
                        },
                        resume: {
                            type: "string",
                            description: "URL to resume file"
                        },
                        resumeOriginalName: {
                            type: "string",
                            description: "Original name of resume file"
                        },
                        company: {
                            type: "string",
                            description: "Company ID (for recruiters)"
                        },
                        profilePhoto: {
                            type: "string",
                            description: "URL to profile photo"
                        }
                    }
                },
                UserRegister: {
                    type: "object",
                    required: ["fullname", "email", "phoneNumber", "password", "role"],
                    properties: {
                        fullname: {
                            type: "string",
                            minLength: 2,
                            maxLength: 100,
                            description: "Full name of the user"
                        },
                        email: {
                            type: "string",
                            format: "email",
                            description: "Email address"
                        },
                        phoneNumber: {
                            type: "number",
                            description: "Phone number"
                        },
                        password: {
                            type: "string",
                            minLength: 6,
                            description: "Password"
                        },
                        role: {
                            type: "string",
                            enum: ["student", "recruiter"],
                            description: "User role"
                        }
                    }
                },
                UserLogin: {
                    type: "object",
                    required: ["email", "password", "role"],
                    properties: {
                        email: {
                            type: "string",
                            format: "email",
                            description: "Email address"
                        },
                        password: {
                            type: "string",
                            description: "Password"
                        },
                        role: {
                            type: "string",
                            enum: ["student", "recruiter"],
                            description: "User role"
                        }
                    }
                },
                UserLoginResponse: {
                    type: "object",
                    properties: {
                        success: {
                            type: "boolean",
                            example: true
                        },
                        message: {
                            type: "string",
                            example: "Welcome back John Doe"
                        },
                        user: {
                            $ref: "#/components/schemas/User"
                        }
                    }
                },
                // Company schemas
                Company: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            description: "Company ID"
                        },
                        name: {
                            type: "string",
                            description: "Company name"
                        },
                        description: {
                            type: "string",
                            description: "Company description"
                        },
                        website: {
                            type: "string",
                            description: "Company website URL"
                        },
                        location: {
                            type: "string",
                            description: "Company location"
                        },
                        logo: {
                            type: "string",
                            description: "URL to company logo"
                        },
                        userId: {
                            type: "string",
                            description: "Owner user ID"
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time"
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time"
                        }
                    }
                },
                CompanyRegister: {
                    type: "object",
                    required: ["companyName"],
                    properties: {
                        companyName: {
                            type: "string",
                            minLength: 2,
                            maxLength: 100,
                            description: "Company name"
                        }
                    }
                },
                CompanyUpdate: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string",
                            minLength: 2,
                            maxLength: 100,
                            description: "Company name"
                        },
                        description: {
                            type: "string",
                            maxLength: 1000,
                            description: "Company description"
                        },
                        website: {
                            type: "string",
                            format: "uri",
                            description: "Company website URL"
                        },
                        location: {
                            type: "string",
                            description: "Company location"
                        }
                    }
                },
                // Job schemas
                Job: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            description: "Job ID"
                        },
                        title: {
                            type: "string",
                            description: "Job title"
                        },
                        description: {
                            type: "string",
                            description: "Job description"
                        },
                        requirements: {
                            type: "array",
                            items: {
                                type: "string"
                            },
                            description: "Job requirements"
                        },
                        salary: {
                            type: "number",
                            description: "Salary amount"
                        },
                        experienceLevel: {
                            type: "number",
                            description: "Required experience level in years"
                        },
                        location: {
                            type: "string",
                            description: "Job location"
                        },
                        jobType: {
                            type: "string",
                            description: "Type of job (full-time, part-time, etc.)"
                        },
                        position: {
                            type: "number",
                            description: "Number of open positions"
                        },
                        company: {
                            $ref: "#/components/schemas/Company"
                        },
                        created_by: {
                            type: "string",
                            description: "Recruiter user ID"
                        },
                        applications: {
                            type: "array",
                            items: {
                                type: "string"
                            },
                            description: "List of application IDs"
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time"
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time"
                        }
                    }
                },
                JobCreate: {
                    type: "object",
                    required: ["title", "description", "requirements", "salary", "location", "jobType", "experience", "position", "companyId"],
                    properties: {
                        title: {
                            type: "string",
                            minLength: 3,
                            maxLength: 200,
                            description: "Job title"
                        },
                        description: {
                            type: "string",
                            minLength: 10,
                            maxLength: 5000,
                            description: "Job description"
                        },
                        requirements: {
                            type: "string",
                            description: "Comma-separated list of requirements"
                        },
                        salary: {
                            type: "number",
                            minimum: 0,
                            description: "Salary amount"
                        },
                        location: {
                            type: "string",
                            description: "Job location"
                        },
                        jobType: {
                            type: "string",
                            enum: ["full-time", "part-time", "contract", "internship", "remote"],
                            description: "Type of job"
                        },
                        experience: {
                            type: "number",
                            minimum: 0,
                            description: "Required experience in years"
                        },
                        position: {
                            type: "integer",
                            minimum: 1,
                            description: "Number of open positions"
                        },
                        companyId: {
                            type: "string",
                            description: "Company ID"
                        }
                    }
                },
                JobUpdate: {
                    type: "object",
                    properties: {
                        title: {
                            type: "string",
                            minLength: 3,
                            maxLength: 200,
                            description: "Job title"
                        },
                        description: {
                            type: "string",
                            minLength: 10,
                            maxLength: 5000,
                            description: "Job description"
                        },
                        requirements: {
                            type: "string",
                            description: "Comma-separated list of requirements"
                        },
                        salary: {
                            type: "number",
                            minimum: 0,
                            description: "Salary amount"
                        },
                        location: {
                            type: "string",
                            description: "Job location"
                        },
                        jobType: {
                            type: "string",
                            enum: ["full-time", "part-time", "contract", "internship", "remote"],
                            description: "Type of job"
                        },
                        experience: {
                            type: "number",
                            minimum: 0,
                            description: "Required experience in years"
                        },
                        position: {
                            type: "integer",
                            minimum: 1,
                            description: "Number of open positions"
                        }
                    }
                },
                // Application schemas
                Application: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            description: "Application ID"
                        },
                        job: {
                            $ref: "#/components/schemas/Job"
                        },
                        applicant: {
                            $ref: "#/components/schemas/User"
                        },
                        status: {
                            type: "string",
                            enum: ["pending", "accepted", "rejected"],
                            default: "pending",
                            description: "Application status"
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time"
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time"
                        }
                    }
                },
                ApplicationStatusUpdate: {
                    type: "object",
                    required: ["status"],
                    properties: {
                        status: {
                            type: "string",
                            enum: ["pending", "accepted", "rejected"],
                            description: "New application status"
                        }
                    }
                }
            }
        },
        security: [
            {
                cookieAuth: []
            }
        ],
        tags: [
            {
                name: "User",
                description: "User authentication and profile management"
            },
            {
                name: "Company",
                description: "Company registration and management"
            },
            {
                name: "Job",
                description: "Job posting and management"
            },
            {
                name: "Application",
                description: "Job application management"
            }
        ]
    },
    apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
