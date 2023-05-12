import { HttpException, HttpStatus } from '@nestjs/common'

export class JsonplaceholderNotFoundException extends HttpException {
    constructor() {
        super(`https://jsonplaceholder.typicode.com/users no fue encontrado.`, HttpStatus.NOT_FOUND)
    }
}
