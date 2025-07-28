import { hashPassword, comparePassword } from '@/utils/hash';
import { randomUUID } from 'node:crypto';

export interface UserProps {
    id: string;
    name: string;
    email: string;
    password: string;
}

export class User implements UserProps {
    public id: string;
    public name: string;
    public email: string;
    public password: string;
    constructor(props: Omit<UserProps, 'id'>, id?: string) {
        this.id = id || randomUUID();
        this.name = props.name;
        this.email = props.email;
        this.password = props.password;
    }

    async comparePassword(plain: string): Promise<boolean> {
        return comparePassword(plain, this.password);
    }

    static async create(
        props: Omit<UserProps, 'id' | 'password'> & { password: string }
    ): Promise<User> {
        const hashedPassword = await hashPassword(props.password);

        return new User({ ...props, password: hashedPassword });
    }
}
