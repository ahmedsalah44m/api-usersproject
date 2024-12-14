// class AppError extends Error{
//     constructor(){
//         super()
//     }
//     create(status,statusText,message){
//         this.status = status,
//         this.statusText = statusText,
//         this.message = message
//         return this
//     }
// }

class AppError extends Error{
    constructor(status,statusText,message){
        super()
        this.status = status,
        this.statusText = statusText,
        this.message = message
        
    }
}

// module.exports = new AppError()
module.exports =  AppError