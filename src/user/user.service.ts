import { Injectable, Logger } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    async createUser(userData: {accountId: string, firstName: string, lastName?: string}){
        const user = this.userRepository.create({...userData})
        this.userRepository.save(user);
        Logger.log(user,"user")
        return user;
    }
    async getUser(accountId: string){
        const user = this.userRepository.findOne({where: {accountId}})
        return user;
    }
}
