<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="bg-white shadow">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          Thanh toán
        </h3>
        <p class="mt-1 text-sm text-gray-500">
          Vui lòng điền thông tin giao hàng
        </p>
      </div>
    </div>

    <div class="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
      <!-- Shipping Form -->
      <div class="lg:col-span-7">
        <form @submit.prevent="handleSubmit" class="bg-white shadow rounded-lg p-6 space-y-6">
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Input
                v-model="form.full_name"
                label="Họ và tên"
                :error="errors.full_name"
                required
            />

            <Input
                v-model="form.phone_number"
                label="Số điện thoại"
                type="tel"
                :error="errors.phone_number"
                required
            />
          </div>

          <Input
              v-model="form.email"
              label="Email"
              type="email"
              :error="errors.email"
              required
          />

          <div class="space-y-4">
            <Input
                v-model="form.address"
                label="Địa chỉ"
                :error="errors.address"
                required
            />

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Select
                  v-model="form.province"
                  label="Tỉnh/Thành phố"
                  :options="provinces"
                  :error="errors.province"
                  required
                  @change="handleProvinceChange"
              />

              <Select
                  v-model="form.district"
                  label="Quận/Huyện"
                  :options="districts"
                  :error="errors.district"
                  required
                  :disabled="!form.province"
                  @change="handleDistrictChange"
              />

              <Select
                  v-model="form.ward"
                  label="Phường/Xã"
                  :options="wards"
                  :error="errors.ward"
                  required
                  :disabled="!form.district"
              />
            </div>
          </div>

          <Input
              v-model="form.note"
              label="Ghi chú"
              type="textarea"
              :error="errors.note"
              placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
          />

          <!-- Payment Methods -->
          <div class="space-y-4">
            <label class="text-sm font-medium text-gray-700">
              Phương thức thanh toán
            </label>

            <div class="space-y-4">
              <div
                  v-for="method in paymentMethods"
                  :key="method.value"
                  class="relative flex items-center p-4 border rounded-lg"
                  :class="[
                  form.payment_method === method.value
                    ? 'bg-indigo-50 border-indigo-200'
                    : 'border-gray-200'
                ]"
              >
                <div class="flex items-center h-5">
                  <input
                      :id="method.value"
                      v-model="form.payment_method"
                      name="payment_method"
                      type="radio"
                      :value="method.value"
                      class="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  />
                </div>
                <label
                    :for="method.value"
                    class="ml-3 flex flex-col cursor-pointer"
                >
                  <span class="block text-sm font-medium text-gray-900">
                    {{ method.label }}
                  </span>
                  <span class="block text-sm text-gray-500">
                    {{ method.description }}
                  </span>
                </label>
              </div>
            </div>
            <p
                v-if="errors.payment_method"
                class="mt-2 text-sm text-red-600"
            >
              {{ errors.payment_method }}
            </p>
          </div>
        </form>
      </div>

      <!-- Order Summary -->
      <div class="mt-6 lg:mt-0 lg:col-span-5">
        <div class="bg-white shadow rounded-lg p-6 space-y-4">
          <h4 class="text-lg font-medium text-gray-900">
            Đơn hàng của bạn
          </h4>

          <!-- Order Items -->
          <div class="divide-y divide-gray-200">
            <div
                v-for="item in cartItems"
                :key="item.id"
                class="py-4 flex items-center space-x-4"
            >
              <img
                  :src="item.product.image"
                  :alt="item.product.name"
                  class="h-16 w-16 rounded-md object-cover"
              />
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">
                  {{ item.product.name }}
                </p>
                <p class="text-sm text-gray-500">
                  {{ item.quantity }} x {{ formatPrice(item.product.price) }}
                </p>
              </div>
              <p class="text-sm font-medium text-gray-900">
                {{ formatPrice(item.product.price * item.quantity) }}
              </p>
            </div>
          </div>

          <!-- Order Total -->
          <div class="border-t border-gray-200 pt-4 space-y-4">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Tạm tính</span>
              <span class="font-medium text-gray-900">
                {{ formatPrice(subtotal) }}
              </span>
            </div>

            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Giảm giá</span>
              <span class="font-medium text-gray-900">
                {{ formatPrice(discount) }}
              </span>
            </div>

            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Phí vận chuyển</span>
              <span class="font-medium text-gray-900">
                {{ formatPrice(shippingFee) }}
              </span>
            </div>

            <div class="flex justify-between items-center pt-4 border-t border-gray-200">
              <span class="text-base font-medium text-gray-900">Tổng cộng</span>
              <span class="text-xl font-bold text-gray-900">
                {{ formatPrice(total) }}
              </span>
            </div>
          </div>

          <Button
              type="submit"
              full-width
              size="lg"
              :loading="isLoading"
              @click="handleSubmit"
          >
            Đặt hàng
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cart.store';
import { useOrderStore } from '@/stores/order.store';
import { useToastStore } from '@/stores/toast.store';
import { useAddressStore } from '@/stores/address.store';
import { formatPrice } from '@/utils/format';
import { validation } from '@/utils/validation';
import type { CartItem } from '@/types/cart.types';
import Button from '@/components/common/Button.vue';
import Input from '@/components/common/Input.vue';
import Select from '@/components/common/Select.vue';

const router = useRouter();
const cartStore = useCartStore();
const orderStore = useOrderStore();
const toastStore = useToastStore();
const addressStore = useAddressStore();

const isLoading = ref(false);

const form = ref({
  full_name: '',
  phone_number: '',
  email: '',
  address: '',
  province: '',
  district: '',
  ward: '',
  note: '',
  payment_method: 'cod'
});

const errors = ref({
  full_name: '',
  phone_number: '',
  email: '',
  address: '',
  province: '',
  district: '',
  ward: '',
  note: '',
  payment_method: ''
});

const paymentMethods = [
  {
    value: 'cod',
    label: 'Thanh toán khi nhận hàng',
    description: 'Thanh toán bằng tiền mặt khi nhận được hàng'
  },
  {
    value: 'bank_transfer',
    label: 'Chuyển khoản ngân hàng',
    description: 'Chuyển khoản qua tài khoản ngân hàng'
  },
  {
    value: 'momo',
    label: 'Ví MoMo',
    description: 'Thanh toán qua ví điện tử MoMo'
  },
  {
    value: 'vnpay',
    label: 'VNPay',
    description: 'Thanh toán qua cổng thanh toán VNPay'
  }
];

// Computed properties from cart store
const cartItems = computed(() => cartStore.items);
const subtotal = computed(() => cartStore.subtotal);
const discount = computed(() => cartStore.discount);
const shippingFee = computed(() => cartStore.shippingFee);
const total = computed(() => cartStore.total);

// Address selects
const provinces = computed(() => addressStore.provinces);
const districts = computed(() => addressStore.districts);
const wards = computed(() => addressStore.wards);

const handleProvinceChange = async () => {
  form.value.district = '';
  form.value.ward = '';
  if (form.value.province) {
    await addressStore.fetchDistricts(form.value.province);
  }
};

const handleDistrictChange = async () => {
  form.value.ward = '';
  if (form.value.district) {
    await addressStore.fetchWards(form.value.district);
  }
};

const validateForm = () => {
  let isValid = true;
  errors.value = {
    full_name: '',
    phone_number: '',
    email: '',
    address: '',
    province: '',
    district: '',
    ward: '',
    note: '',
    payment_method: ''
  };

  if (!validation.required(form.value.full_name)) {
    errors.value.full_name = 'Vui lòng nhập họ tên';
    isValid = false;
  }

  if (!validation.required(form.value.phone_number)) {
    errors.value.phone_number = 'Vui lòng nhập số điện thoại';
    isValid = false;
  } else if (!validation.phone(form.value.phone_number)) {
    errors.value.phone_number = 'Số điện thoại không hợp lệ';
    isValid = false;
  }

  if (!validation.required(form.value.email)) {
    errors.value.email = 'Vui lòng nhập email';
    isValid = false;
  } else if (!validation.email(form.value.email)) {
    errors.value.email = 'Email không hợp lệ';
    isValid = false;
  }

  if (!validation.required(form.value.address)) {
    errors.value.address = 'Vui lòng nhập địa chỉ';
    isValid = false;
  }

  if (!validation.required(form.value.province)) {
    errors.value.province = 'Vui lòng chọn tỉnh/thành phố';
    isValid = false;
  }

  if (!validation.required(form.value.district)) {
    errors.value.district = 'Vui lòng chọn quận/huyện';
    isValid = false;
  }

  if (!validation.required(form.value.ward)) {
    errors.value.ward = 'Vui lòng chọn phường/xã';
    isValid = false;
  }

  if (!validation.required(form.value.payment_method)) {
    errors.value.payment_method = 'Vui lòng chọn phương thức thanh toán';
    isValid = false;
  }

  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) {
    toastStore.showError('Vui lòng kiểm tra lại thông tin');
    return;
  }

  isLoading.value = true;
  try {
    const order = await orderStore.createOrder({
      ...form.value,
      items: cartItems.value,
      subtotal: subtotal.value,
      discount: discount.value,
      shipping_fee: shippingFee.value,
      total: total.value
    });

    // Clear cart after successful order
    await cartStore.clearCart();

    // Redirect based on payment method
    if (form.value.payment_method === 'cod') {
      router.push(`/orders/${order.id}/success`);
    } else {
      // Redirect to payment gateway
      window.location.href = order.payment_url;
    }
  } catch (error: any) {
    toastStore.showError(error.message || 'Có lỗi xảy ra khi đặt hàng');
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  if (!cartItems.value.length) {
    router.push('/cart');
    return;
  }

  try {
    // Load user profile if authenticated
    const user = cartStore.user;
    if (user) {
      form.value.full_name = user.full_name;
      form.value.phone_number = user.phone_number;
      form.value.email = user.email;
    }

    // Load provinces
    await addressStore.fetchProvinces();
  } catch (error: any) {
    toastStore.showError(error.message || 'Có lỗi xảy ra khi tải dữ liệu');
  }
});
</script>
// ... (tiếp tục phần script)