import { HttpException, HttpStatus } from '@nestjs/common'

export class UserNotFoundException extends HttpException {
    constructor() {
        super(`Usuario no fue encontrado.`, HttpStatus.NOT_FOUND)
    }
}
