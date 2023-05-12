import { Injectable, Inject, Logger } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { AxiosError } from 'axios'
import { User, UserWithoutAddress } from './interface/user.interface'
import { catchError, firstValueFrom } from 'rxjs'
import { ClientProxy } from '@nestjs/microservices'
import { USERS_SERVICE } from './constants/services'
import { ConfigService } from '@nestjs/config'
import { Message } from './helpers/message.event'

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name)
    constructor(
        private httpService: HttpService,
        private readonly configService: ConfigService,
        @Inject(USERS_SERVICE) private client: ClientProxy
    ) {}

    async findAll(): Promise<UserWithoutAddress[]> {
        const url = 'https://jsonplaceholder.typicode.com/users'
        const { data } = await firstValueFrom(
            this.httpService.get<User[]>(url).pipe(
                catchError((error: AxiosError) => {
                    this.logger.error(error.response.data)
                    throw 'An error happened!'
                })
            )
        )
        const usersSortedById = data.sort((a, b) => b.id - a.id)

        /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
        const usersWithoutAddress: UserWithoutAddress[] = usersSortedById.map(({ address, ...user }) => user)

        const usersEven = usersWithoutAddress.filter((item) => item.id % 2 === 0)

        console.log('usersEven ', usersEven)

        this.client.emit('send-users-filtered', new Message('Hello World'))

        return usersWithoutAddress
    }
}
