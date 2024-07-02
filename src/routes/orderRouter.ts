import express, {Request, Response} from 'express';
import * as orderModel from '../models/order';
import { Order, BasicOrder } from '../types/Order';

const orderRouter = express.Router()