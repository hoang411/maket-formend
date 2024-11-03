<!-- src/components/common/AppFooter.vue -->
<template>
  <footer class="bg-gray-800 text-white">
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Company Info -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Về chúng tôi</h3>
          <p class="text-gray-300">
            Supermarket - Hệ thống siêu thị trực tuyến hàng đầu Việt Nam
          </p>
          <div class="mt-4 flex space-x-4">
            <a
                v-for="social in socialLinks"
                :key="social.name"
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-400 hover:text-white"
            >
              <i :class="['fab', social.icon]"></i>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Liên kết nhanh</h3>
          <ul class="space-y-2">
            <li v-for="link in quickLinks" :key="link.path">
              <router-link
                  :to="link.path"
                  class="text-gray-300 hover:text-white"
              >
                {{ link.name }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Categories -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Danh mục</h3>
          <ul class="space-y-2">
            <li v-for="category in categories" :key="category.id">
              <router-link
                  :to="`/products?category=${category.id}`"
                  class="text-gray-300 hover:text-white"
              >
                {{ category.name }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Liên hệ</h3>
          <ul class="space-y-2 text-gray-300">
            <li class="flex items-center">
              <i class="fas fa-map-marker-alt w-5"></i>
              <span>123 Đường ABC, Quận XYZ</span>
            </li>
            <li class="flex items-center">
              <i class="fas fa-phone w-5"></i>
              <span>1900 1234</span>
            </li>
            <li class="flex items-center">
              <i class="fas fa-envelope w-5"></i>
              <span>contact@supermarket.com</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="mt-8 pt-8 border-t border-gray-700">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-gray-300">
            © {{ new Date().getFullYear() }} Supermarket. All rights reserved.
          </p>
          <div class="mt-4 md:mt-0">
            <router-link
                v-for="link in legalLinks"
                :key="link.path"
                :to="link.path"
                class="text-gray-300 hover:text-white mx-2"
            >
              {{ link.name }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const socialLinks = [
  { name: 'Facebook', icon: 'fa-facebook', url: '#' },
  { name: 'Instagram', icon: 'fa-instagram', url: '#' },
  { name: 'Youtube', icon: 'fa-youtube', url: '#' }
]

const quickLinks = [
  { path: '/about', name: 'Về chúng tôi' },
  { path: '/contact', name: 'Liên hệ' },
  { path: '/faq', name: 'FAQ' },
  { path: '/shipping', name: 'Chính sách vận chuyển' }
]

const categories = [
  { id: 1, name: 'Thực phẩm' },
  { id: 2, name: 'Đồ uống' },
  { id: 3, name: 'Gia dụng' },
  { id: 4, name: 'Điện tử' }
]

const legalLinks = [
  { path: '/privacy', name: 'Chính sách bảo mật' },
  { path: '/terms', name: 'Điều khoản sử dụng' }
]
</script>