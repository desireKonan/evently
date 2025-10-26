import type { EventType } from "./event.model";

export interface PaymentDto {
    id: string;

    event: EventInfo;

    user: UserInfo;

    fullname: string;

    email: string;

    contacts: string[];

    ticket_prices: TicketPriceWithQuantity[];

    amount: number;

    status: PaymentStatus;

    created_at: Date;

    paid_at?: Date;

    updated_at?: Date;

    arrived_at?: Date;
}

type EventInfo = {
    id: string;
    name: string;
    type: EventType;
}


type UserInfo = {
    id: string;
    fullname: string;
    email: string;
}


export const PaymentStatusConst = {
    PENDING: 'PENDING',
    UNPAID: 'UNPAID',
    PAID: 'PAID'
}

export type PaymentStatus = (typeof PaymentStatusConst)[keyof typeof PaymentStatusConst];

export type TicketPriceWithQuantity = {
    name: string;
    price: number;
    description: string;
    quantity: number;
}