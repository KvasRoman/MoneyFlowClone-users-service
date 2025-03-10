import { Injectable, Logger } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    async createUser(userData: {accountId: string, firstName: string, lastName?: string}){
        const tempUser = this.userRepository.create({...userData})
        await this.userRepository.save(tempUser);
        const user = this.userRepository.findOne({where: {accountId: userData.accountId}})//PROBLEM
        
        return user;
    }
    async getUser(accountId: string){
        const user = this.userRepository.findOne({where: {accountId}})
        return user;
    }
    async updateUser(userData: {accountId: string, firstName: string}){
        const tempUser = await this.userRepository.findOne({where: {accountId: userData.accountId}});
        if(tempUser == null){
            throw new RpcException({statusCode: 404, message: 'user not found'});
        }
        tempUser.firstName = userData.firstName;
        return await this.userRepository.save(tempUser);
    }
}
