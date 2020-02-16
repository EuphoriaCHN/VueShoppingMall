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
          <a href="javascript:void(0)" class="price" @click.prevent="sortGoods">Price
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
              <dd><a href="javascript:void(0)" @click.prevent="setPriceFilter('all')">All</a></dd>
              <dd>
                <a href="javascript:void(0)" @click.prevent="setPriceFilter(0)">0 - 100</a>
              </dd>
              <dd>
                <a href="javascript:void(0)" @click.prevent="setPriceFilter(1)">100 - 500</a>
              </dd>
              <dd>
                <a href="javascript:void(0)" @click.prevent="setPriceFilter(2)">500 - 1000</a>
              </dd>
              <dd>
                <a href="javascript:void(0)" @click.prevent="setPriceFilter(3)">1000 - 5000</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul v-lazy-container="{ selector: 'img', loading: '/static/loading-svg/loading-spin.svg' }">
                <li v-for="value in goodsList" :key="value._id">
                  <div class="pic">
                    <a href="#">
                      <img
                        src=""
                        :data-src="'/static/' + value.productImage"
                        :alt="value.productName"
                        :title="value.productName"/>
                    </a>
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
              <div
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="busy"
                infinite-scroll-distance="40"
                class="load-more">
                <img src="/static/loading-svg/loading-spinning-bubbles.svg" alt="" v-show="loading_svg" />
              </div>
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
    data() {
      return {
        goodsList: [],
        sortFlag: true, // true 代表升序, false 代表降序
        pageSize: 8,
        page: 1,
        busy: false,
        priceChecked: 'all',
        loading_svg: false,
      };
    },
    methods: {
      getGoodsList(flag) {
        this.loading_svg = true;
        const param = {
          page: this.page,
          pageSize: this.pageSize,
          sort: this.sortFlag ? '1' : '-1',
          priceChecked: this.priceChecked
        };
        axios.get('/goods', {
          params: param
        }).then(res => {
          if (res.status === 200) {
            if (flag) {
              // 如果 flag = true，则代表分页了，此时需要累加
              this.goodsList = this.goodsList.concat(res.data.result.list);
              if (res.data.result.count === 0) {
                this.busy = true; // 以及滚到了最后，没必要再滚了
              } else {
                this.busy = false; // 下次还要用
              }
            } else {
              this.goodsList = res.data.result.list;
            }
          } else {
            this.goodsList = [];
          }
          setTimeout(() => {
            this.loading_svg = false;
          }, 1000);
        });
      },
      sortGoods() {
        this.sortFlag = !(this.sortFlag);
        this.page = 1;
        this.getGoodsList();
      },
      loadMore() {
        this.busy = true;
        setTimeout(() => {
          this.page++;
          this.getGoodsList(true);
        }, 1000);
      },
      setPriceFilter(index) {
        this.priceChecked = index;
        this.page = 1;
        this.busy = false;
        this.getGoodsList();
      }
    },
    mounted() {
      this.getGoodsList();
    }
  }
</script>

<style scoped>
  .load-more {
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
</style>
