const {body} =require("express-validator")
const nameSchema = ()=>[
    body(["name"]).notEmpty().withMessage("Name IS Required").isLength({min:2}).withMessage("Minimum Length Is 2")
];

const flNameSchema = ()=>[
    body(["firstName","lastName"]).notEmpty().withMessage("FirstName And LastName IS Required").isLength({min:2}).withMessage("Minimum Length Is 2")
];
const ageSchema =()=>[
    body("age").isNumeric().withMessage("Age Must Be Number")
];
const passwordSchema =()=>[
    body("password").notEmpty().withMessage("Password IS Required").isLength({min:5}).withMessage("Password Length Must  be 5 Characters At Liest")
]
const emaildSchema =()=>[
    body("email").notEmpty().withMessage("Email IS Required")
]

module.exports = {
    flNameSchema,
    nameSchema,
    ageSchema ,
    passwordSchema,
    emaildSchema
    
}