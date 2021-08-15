
<!--axios-->
/*Akryum*/
Vue.use(VueObserveVisibility)

const vm = new Vue ({
    el: '.container',
    data(){
        return{
            beforeItem:{},
            items: [],
            searchVal: '',
            page: 1,
            categoryName: '홈인테리어',
            isTheEnd: false
        }
    },

    methods: {
        async fetch() {
            try {
                let items = await axios.get(`http://localhost:8080/test/product-list-category?categoryName=${this.categoryName}&page=${this.page}`);
                if (items.data.theEnd != true) {
                    // if (items.data.jsoupTestVoList.length === 0) {
                    //     console.log("Fetch does not complete,Therefore one more time trying");
                    //     this.fetch();
                    //     return;
                    // }
                    // this.items = items.data.jsoupTestVoList
                    this.items.push(...items.data.jsoupTestVoList);
                    console.log("Fetch complete");
                } else {
                    this.isTheEnd = items.data.theEnd;
                }
            } catch (error){
                console.log(error)
            }
        },
        handleScrolledToBottom(){
            // if (isvisible){return}
            if (this.isTheEnd === false) {
                this.page++
                this.fetch()
            }

        },
        apple(){
            this.searchVal = '애플'
            this.isTheEnd = false
            this.items = []
            this.page = 1
            this.categoryName = '애플'
            this.searchMethod()
        },
        samsung(){
            this.searchVal = '삼성'
            this.isTheEnd = false
            this.items = []
            this.page = 1
            this.categoryName = '삼성'
            this.searchMethod()
        },
        resetData(event){
            this.isTheEnd = false
            this.categoryName = ''
            this.searchVal = event.target.value.trim()
            this.items = []
            this.page = 1
            if (!this.searchVal) {
                this.fetch()
                return
            }
            this.searchMethod()
        },
        async searchMethod() {
            try{
                let items = await axios.get(`http://localhost:8080/test/product-list-search?query=${this.searchVal}&page=${this.page}`)
                if (items.data.theEnd != true) {
                    // if (items.data.jsoupTestVoList.length === 0) {
                    //     console.log("SearchMethod does not complete,Therefore one more time trying");
                    //     this.searchMethod()
                    //     return;
                    // }
                    this.items.push(...items.data.jsoupTestVoList);
                    console.log("SearchMethod complete");
                } else {
                    this.isTheEnd = items.data.theEnd
                }
            }catch (error){
                console.log(error)
            }
        },
        searchHandleScrolledToBottom(){
            if (this.isTheEnd === false) {
                this.page++;
                this.searchMethod()
            }
        },
        categoryFetch(categoryName, event) {
            this.isTheEnd = false
            this.searchVal = ''
            this.items = []
            this.page = 1
            this.categoryName = categoryName

            this.fetch()

        }
    },
    mounted() {
        this.fetch()
    }
})

const swiper = new Swiper('.swiper-container', {
    // Optional parameters
    autoplay:{
        display: 5000,
        disableOnInteraction: false
    },
    touchStartPreventDefault: false,
    effect: 'slide',
    direction: 'horizontal',

    slidesPerView: 5,
    slideBetween: 10,
    centerSlides: true,

    // // If we need pagination
    // pagination: {
    //     el: '.swiper-pagination',
    //     clickable: true
    // },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

});


<!--gsap scroll-->
const toTopEl = document.querySelector('#to-top')

window.addEventListener('scroll', _.throttle(function () {
    if (window.scrollY > 800) {
        gsap.to(toTopEl, .2, {
            x: 0
        });
    } else {
        gsap.to(toTopEl, .2, {
            x: 100
        })
    }
},300))
toTopEl.addEventListener('click', function () {
    gsap.to(window, .2, {
        scrollTo: 0
    })
})