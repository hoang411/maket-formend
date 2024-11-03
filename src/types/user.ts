// src/types/user.ts
export interface User {
    id: number;
    email: string;
    phoneNumber: string;
    address: string;
    dateOfBirth: Date;
    fullName: string;
    avatar?: string;
    role: 'ADMIN' | 'USER' | 'WAREHOUSE' | 'SALES';
}

// src/types/product.ts
export interface Product {
    id: number;
    productName: string;
    price: number;
    unit: string;
    categoryId: number;
    description?: string;
    quantity: number;
    images: ProductImage[];
}

export interface ProductImage {
    id: number;
    productId: number;
    imageUrl: string;
}

// src/types/order.ts
export interface Order {
    id: number;
    userId: number;
    paymentMethod: string;
    paymentStatus: string;
    shippingAddress: string;
    shippingDate: Date;
    orderDetails: OrderDetail[];
    status: string;
}

export interface OrderDetail {
    productId: number;
    numberOfProducts: number;
}

// src/types/receipt.ts
export interface Receipt {
    id: number;
    name: string;
    partnerId: number;
    userId: number;
    status: string;
    deliveryDate: Date;
    totalMoney: number;
    amountPaid: number;
    note?: string;
    receiptDetails: ReceiptDetail[];
}

// Thêm các interfaces khác...