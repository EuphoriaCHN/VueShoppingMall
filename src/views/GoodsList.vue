<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <span>Goods</span>
    </nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price">Price
            <svg class="icon icon-arrow-short">
              <use xlink:href="#icon-arrow-short"></use>
            </svg>
          </a>
          <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd><a href="javascript:void(0)">All</a></dd>
              <dd>
                <a href="javascript:void(0)">0 - 100</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul v-lazy-container="{ selector: 'img', loading: '/static/loading-svg/loading-spin.svg' }">
                <li v-for="value in goodsList" :key="value._id">
                  <div class="pic">
                    <a href="#"><img :data-src="'/static/' + value.productImage" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name" v-text="value.productName + '￥'"></div>
                    <div class="price" v-text="value.salePrice + '￥'"></div>
                    <div class="btn-area">
                      <a href="javascript:void(0);" class="btn btn--m">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
  import '@/assets/css/base.css'
  import '@/assets/css/product.css'

  import NavHeader from '@/components/NavHeader'
  import NavFooter from '@/components/NavFooter'
  import NavBread from '@/components/NavBread'

  import axios from 'axios'

  export default {
    name: "GoodsList",
    components: {
      NavHeader,
      NavFooter,
      NavBread
    },
    data () {
      return {
        goodsList: []
      };
    },
    mounted () {
      axios.get('/goods').then(res => {
        if (res.status === 200) {
          this.goodsList = res.data.result.list;
          console.log(this.goodsList[0]);
        } else {
          this.goodsList = [];
        }
      });
    }
  }
</script>

<style scoped>

</style>
