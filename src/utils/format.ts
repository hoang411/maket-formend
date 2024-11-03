// Định dạng số điện thoại
export function formatPhoneNumber(phone: string): string {
    const cleaned = phone.replace(/\D/g, ''); // Loại bỏ các ký tự không phải số
    const match = cleaned.match(/^(\d{4})(\d{3})(\d{3})$/); // Kiểm tra định dạng số điện thoại
    if (match) {
        return `${match[1]} ${match[2]} ${match[3]}`; // Trả về định dạng số điện thoại
    }
    return phone; // Nếu không khớp, trả về số điện thoại gốc
}

// Định dạng kích thước tệp
export function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes'; // Trả về "0 Bytes" nếu kích thước là 0
    const k = 1024; // Hệ số chuyển đổi
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']; // Các đơn vị
    const i = Math.floor(Math.log(bytes) / Math.log(k)); // Tính chỉ số đơn vị
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`; // Trả về kích thước đã định dạng
}

// Cắt văn bản theo độ dài
export function truncateText(text: string, length: number): string {
    if (text.length <= length) return text; // Nếu độ dài văn bản nhỏ hơn hoặc bằng yêu cầu, trả về văn bản gốc
    return text.slice(0, length) + '...'; // Cắt văn bản và thêm "..."
}

// Định dạng giá
export function formatPrice(price: number): string {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price); // Trả về giá đã định dạng theo VND
}

// Định dạng ngày tháng
export function formatDate(date: string | Date): string {
    return new Intl.DateTimeFormat('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).format(new Date(date)); // Trả về ngày đã định dạng
}
