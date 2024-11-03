export const validation = {
    email: (value: string): boolean => {
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return regex.test(value);
    },

    phone: (value: string): boolean => {
        const regex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
        return regex.test(value);
    },

    password: (value: string): boolean => {
        // Ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        return regex.test(value);
    },

    required: (value: any): boolean => {
        if (typeof value === 'string') {
            return value.trim().length > 0;
        }
        return value !== null && value !== undefined;
    },

    minLength: (value: string, min: number): boolean => {
        return value.length >= min;
    },

    maxLength: (value: string, max: number): boolean => {
        return value.length <= max;
    },

    numeric: (value: string): boolean => {
        return /^\d+$/.test(value);
    },

    date: (value: string): boolean => {
        const date = new Date(value);
        return date instanceof Date && !isNaN(date.getTime());
    }
};

export const getValidationError = (field: string, type: string): string => {
    const errors: { [key: string]: { [key: string]: string } } = {
        email: {
            required: 'Email là bắt buộc',
            invalid: 'Email không hợp lệ'
        },
        phone_number: {
            required: 'Số điện thoại là bắt buộc',
            invalid: 'Số điện thoại không hợp lệ'
        },
        password: {
            required: 'Mật khẩu là bắt buộc',
            minLength: 'Mật khẩu phải có ít nhất 8 ký tự',
            invalid: 'Mật khẩu phải chứa chữ hoa, chữ thường và số'
        },
        full_name: {
            required: 'Họ tên là bắt buộc',
            minLength: 'Họ tên phải có ít nhất 2 ký tự'
        }
    };

    return errors[field]?.[type] || 'Trường này không hợp lệ';
};