import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { User } from '../../../user/user.type';
import { PG_CONNECTION } from '../../db.provider';
import { UserRepository } from '../../../user/user.repository';

@Injectable()
export class UserPgRepository implements UserRepository {
  constructor(@Inject(PG_CONNECTION) private connection: Pool) {}

  async findAll(): Promise<User[]> {
    return await this.connection
      .query<User>('SELECT * FROM test.api_user')
      .then((result) => result.rows);
  }

  async findById(id: number): Promise<User> {
    return await this.connection
      .query<User>('SELECT * FROM test.api_user WHERE id = $1', [id])
      .then((result) => result.rows[0]);
  }

  async create(user: User): Promise<bigint> {
    return await this.connection
      .query(
        'INSERT INTO test.api_user (username, email, password, role, create_time, update_time, version)' +
          ' values ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
        [
          user.username,
          user.email,
          user.password,
          user.role,
          user.create_date,
          user.update_date,
          user.version,
        ],
      )
      .then((result) => result.rows[0] as bigint);
  }

  async update(id: number, user: User): Promise<boolean> {
    return await this.connection
      .query(
        'UPDATE test.api_user SET username = $1, email = $2, password = $3, update_time = $4, version = $5 WHERE id = $6 RETURNING *',
        [
          user.username,
          user.email,
          user.password,
          user.update_date,
          user.version,
          id,
        ],
      )
      .then((result) => result.rows.length > 0);
  }

  async delete(id: number): Promise<boolean> {
    return await this.connection
      .query('DELETE FROM test.api_user WHERE id = $1 RETURNING *', [id])
      .then((result) => result.rows.length > 0);
  }

  async findByUsername(username: string): Promise<User> {
    return await this.connection
      .query('SELECT * FROM test.api_user WHERE username = $1', [username])
      .then((result) => result.rows[0] as User);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.connection
      .query('SELECT * FROM test.api_user WHERE email = $1', [email])
      .then((result) => result.rows[0] as User);
  }

  async updateUserRole(id: number, role: number): Promise<boolean> {
    return await this.connection
      .query('UPDATE test.api_user SET role = $1 WHERE id = $2 RETURNING *', [
        role,
        id,
      ])
      .then((result) => result.rows.length > 0);
  }
}
