import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';


let productModal = {};
let delProductModel ={};

const app = createApp({
  //關注點分離
  data() {
    //function return
    return {
      url: 'https://vue3-course-api.hexschool.io/v2',
      path:'tatw',
      tempProduct:{
        imgsUrlArr:[],
      },
      products:[],
      isNew:false,
      addImg:true,
      pagination:{}
    }
  },
  methods: {
    checkLogin() {
      // 確認是否登入
      axios.post(`${this.url}/api/user/check`)
        .then((res) => {
          this.getProductList();
        })
        .catch((error) => {
          alert('請重新登入');
          window.location = "index.html";
        })
    },

    getProductList(page=1) { //傳入參數預設值
      // console.log(page);
      axios.get(`${this.url}/api/${this.path}/admin/products/?page=${page}`)
        .then((res) => {
          let { products ,pagination} = res.data
          this.products = products
          this.pagination = pagination
        })
        .catch((error) => {
          alert(error);
        })
    },
    openModal(status,item){
      if(status==='open'){
        console.log('open');
        this.tempProduct={
          imgsUrlArr:[],
        };//清空暫存
        this.isNew=true;
        productModal.show();
      }else if (status==='close'){
        productModal.hide();
      }else if (status==='edit'){
        this.tempProduct={...item};
        this.isNew=false;
        productModal.show();
      }else if (status==='delete'){
        this.tempProduct = {...item}
        delProductModel.show();
      }
    },
    deleteProduct(){
      const url = `${this.url}/api/${this.path}/admin/product/${this.tempProduct.id}`
      axios.delete(url, {data:this.tempProduct})
        .then((res)=>{
          delProductModel.hide();
          this.getProductList();
        })
    },
    addImgUrl(){
      this.addImg=false;
    }
    
  },
  created() {
    // 取得token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)tatw\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common['Authorization'] = token;
    this.checkLogin();
  },
  mounted() {
    this.getProductList();
  }
});


// 新增產品編輯元件
app.component('productModal',{
  template:'#productModal',
  props:['product','isNew'],
  data(){
    return {
      url: 'https://vue3-course-api.hexschool.io/v2',
      path:'tatw',
    }
  },
  mounted(){
    const modal = document.querySelector('#productModal');
    productModal = new bootstrap.Modal(modal);
  },
  methods:{
    updateProduct(){
      let method='post';
      let url = `${this.url}/api/${this.path}/admin/product`;
      if(this.isNew==false){
        url=`${this.url}/api/${this.path}/admin/product/${this.product.id}`;
        method='put';
      }
      axios[method](url, {data:this.product})
        .then((res)=>{
          productModal.hide();
          this.$emit('update');//重新抓產品列表
        })
    },
  },
})
// 新增分頁元件
app.component('pagination',{
  template:'#pagination',
  props:['pages'],
});


app.mount('#app');