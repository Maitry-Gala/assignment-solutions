import { client } from '../index';

export async function createUser(username: string, password: string, name: string) {
    const result = client.query(`INSERT INTO users (username,password,name) values ($1,$2,$3) RETURNING *`,[username,password,name]);
    return (await result).rows[0];
}

export async function getUser(id: number) {
    const result = client.query(`SELECT * FROM users WHERE id=$1 `,[id]);
    return (await result).rows[0];
}