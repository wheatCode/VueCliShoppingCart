<template>
  <div>
    <nav
      id="sidebarMenu"
      class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
    >
      <div class="sidebar-sticky pt-3">
        <h6
          class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
        >
          管理員
        </h6>
        <ul class="nav flex-column">
          <li class="nav-item">
            <router-link
              class="nav-link"
              :class="{ active: $route.path === '/admin/product' }"
              to="/admin/product"
            >
              <span>產品列表</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :class="{ active: $route.path === '/admin/order' }"
              to="/admin/order"
            >
              <span>訂單列表</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :class="{ active: $route.path === '/admin/coupon' }"
              to="/admin/coupon"
            >
              <span>優惠券</span>
            </router-link>
          </li>
        </ul>
        <h6
          class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
        >
          客戶
        </h6>
        <ul class="nav flex-column">
          <li class="nav-item">
            <router-link
              class="nav-link"
              :class="{ active: $route.path === '/customer/product' }"
              to="/customer/product"
            >
              <span>購物畫面</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :class="{ active: $route.path === '/customer/order' }"
              to="/customer/order"
            >
              <span>訂單畫面</span>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {};
</script>
