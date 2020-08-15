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
          123
        </h6>
        <ul class="nav flex-column">
          <li class="nav-item">
            <a class="nav-link active" href="#">
              <span>產品列標</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <span>訂單列表</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <span>優惠券</span>
            </a>
          </li>
        </ul>
        <h6
          class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
        >
          123
        </h6>
        <ul class="nav flex-column">
          <li class="nav-item">
            <router-link class="nav-link" to="/order">
              <span>模擬訂單</span>
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
