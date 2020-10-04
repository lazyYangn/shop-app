import { createConnection, createPool } from 'mysql'
const config = require('../config')

// export const connection = createConnection({
const configDb = {
  connectionLimit: config.db_limit,
  host: config.db_host,
  user: config.db_user,
  password: config.db_password,
  database: config.db_database,
}

const pool = createPool(configDb)

export const Do = (sql: any, params?: any) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err)
      }
      connection.query(sql, params, (err, rows) => {
        if (err) {
          reject(err)
        } else {
          resolve(rows)
          connection.release()
        }
      })
    })
  })
}

export const FindFrist = (sql: any, params?: any) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err)
      }
      connection.query(sql, params, (err, rows) => {
        if (err) {
          reject(err)
        } else {
          resolve(rows.length > 0 ? rows[0] : null)
          connection.release()
        }
      })
    })
  })
}
