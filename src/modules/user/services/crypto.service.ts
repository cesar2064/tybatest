import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class CryptoService {


    encryptSha512Match(password: string, encryptedPassword: string, salt: string): boolean {
        const encryptedComingPasssword = this.encryptSha512(password, salt);
        return encryptedPassword === encryptedComingPasssword;
    }

    genRandomNumbers(lenght: number): string {
        let concatenated = '';
        for(let i = lenght; i--;){
            concatenated += Math.floor(Math.random() * 10)
        }
        return concatenated;
    }
 
    encryptSha512(password: string, salt: string): string {
        const hash = crypto.createHmac('sha512', salt);
        hash.update(password);
        return hash.digest('hex');
    }
}