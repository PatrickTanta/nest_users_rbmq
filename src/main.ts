import { NestFactory } from '@nestjs/core'
import { PORT } from './shared/global'
import { UsersModule } from './modules/users/users.module'
import { RmqService } from './infrastructure/amqp/amqp.service'

async function bootstrap() {
    const app = await NestFactory.create(UsersModule)
    const rmqService = app.get<RmqService>(RmqService)
    app.connectMicroservice(rmqService.getOptions('USERS'))
    await app.startAllMicroservices()
    await app.listen(PORT)
}

bootstrap()
