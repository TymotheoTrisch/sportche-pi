import { BasicOrder, Order, OrderWithDetails} from '../types/Order'
import { db } from '../dist/db'
import { OkPacket, RowDataPacket } from 'mysql2'

export const create = (order: BasicOrder, callback: Function) => {
    const queryString = "INSERT INTO ProductOrder (product_id, customer_id, product_quantity) VALUES (?,?,?)"
}