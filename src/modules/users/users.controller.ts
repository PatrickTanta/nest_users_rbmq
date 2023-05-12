import { Controller, Get } from '@nestjs/common'
import { UsersService } from './users.service'
import { Ctx, EventPattern, RmqContext, Payload } from '@nestjs/microservices'
import { RmqService } from '../../infrastructure/amqp/amqp.service'

@Controller('test/users')
export class UsersController {
    constructor(private readonly userService: UsersService, private readonly rmqService: RmqService) {}

    @Get()
    async getAllUsers() {
        const users = await this.userService.findAll()
        return users
    }

    @EventPattern('send-users-filtered')
    async handleUsers(@Payload() data: any, @Ctx() context: RmqContext) {
        this.rmqService.ack(context)
    }
}
