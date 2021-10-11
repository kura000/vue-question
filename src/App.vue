<template>
  <div class="wrapper">
    <header>
    </header>

<router-view v-slot="{ Component }">
  <transition name="page" mode="">
    <component :is="Component" />
  </transition>
</router-view>

    <!-- <transition name="page">
      <router-view/>
    </transition> -->

    <footer>
    </footer>
  </div>
</template>
<script>
import 'normalize.css'
export default {
}
</script>
<style lang="scss">

.page-enter-active {
  animation: fadeIn 0.5s;
  animation-delay: .5s;
  opacity: 0;
}

@keyframes fadeIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.page-leave-active {
  animation: fadeOut 0.5s;
}

@keyframes fadeOut {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-20px);
    opacity: 0;
  }
}
</style>