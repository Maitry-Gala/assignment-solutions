import { client } from "..";

/*
 * Should insert into the users table
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */


export async function createUser(
  username: string,
  password: string,
  name: string
) {
  const query = `INSERT INTO users (username,password,name) values($1,$2,$3)`;
  const values = [username,password,name];
  const result = client.query(query, values);
  return (await result).rows[0];
}
/*
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */


export async function getUser(userId: number) {
  const query = `SELECT * FROM  users WHERE id = $1`
  const values = [userId];
  const result = await client.query(query,values);
  return result.rows[0];
 
}

