import{M}from"./bootstrap.esm-TTjMTX3M.js";import{L as $,a as x,l as y}from"./alertStore-FvkRcQaP.js";import{m as k,e as D,_ as L,o as d,c as n,a as t,t as _,g as c,j as m,h as b,F as S,f as E,q as C,b as h,w,d as f,r as P,n as A}from"./index-rQ1ecwA4.js";import{P as I}from"./PaginationComponent-hmKrfnKF.js";var R={VITE_URL:"https://ec-course-api.hexschool.io/v2",VITE_PATH:"jiayu",BASE_URL:"/2023-vue-week6/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:U,VITE_PATH:V}=R,B={components:{LoadingButton:$},props:["product","isNew"],data(){return{tempProduct:{},modal:null}},mounted(){this.modal=new M(this.$refs.modal),this.tempProduct=this.product},watch:{product(){this.tempProduct=this.product}},methods:{async uploadImg(l){try{const e=l.target.files[0],i=new FormData;i.append("file-to-upload",e);const g=`${U}/api/${V}/admin/upload`,{data:o}=await this.$http.post(g,i);this.tempProduct.imageUrl=o.imageUrl}catch(e){this.$swal(e.data.message)}},async uploadMultiImg(l){try{this.loadingStatus.imagesUrl=!0;const{files:e}=l.target,i=`${U}/api/${V}/admin/upload`,g=Object.values(e).map(async u=>{const s=new FormData;return s.append("file-to-upload",u),(await this.$http.post(i,s)).data.imageUrl}),o=await Promise.all(g);this.tempProduct.imagesUrl.push(...o);const a=l.target;a.value="",this.loadingStatus.imagesUrl=!1}catch(e){this.$swal(e.data.message)}},async updateProduct(){try{this.loadingStatus.updateProduct=!0;let l=`${U}/api/${V}/admin/product`,e="post";this.isNew||(l+=`/${this.tempProduct.id}`,e="put");const i=await this.$http[e](l,{data:this.tempProduct});this.modal.hide(),this.$emit("getData"),this.miniSwal(i.data.message),this.loadingStatus.updateProduct=!1}catch(l){this.$swal(l.data.message)}},...k(x,["miniSwal"])},computed:{...D(y,["loadingStatus"])}},N={id:"productModal",ref:"modal",class:"modal fade",tabindex:"-1","aria-labelledby":"productModalLabel","aria-hidden":"true"},j={class:"modal-dialog modal-xl"},O={class:"modal-content border-0"},H={class:"modal-header bg-dark text-white"},F={id:"productModalLabel",class:"modal-title"},G=t("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"},null,-1),q={class:"modal-body"},z={class:"row"},J={class:"col-sm-4"},K={class:"mb-2"},Q={class:"mb-3"},W=t("label",{for:"imageUrl",class:"form-label"},"請選擇圖片",-1),X=["src"],Y=t("label",{for:"imagesUrl",class:"form-label"},"請選擇圖片(可選多圖)",-1),Z=["disabled"],tt={class:"mb-3 d-flex align-items-center"},et=["onClick"],ot=["onUpdate:modelValue"],st=["src"],lt={key:1,class:"d-flex justify-content-center"},at=t("div",{class:"spinner-border my-5",role:"status"},[t("span",{class:"visually-hidden"},"Loading...")],-1),it=[at],dt=["disabled"],nt={class:"col-sm-8"},rt={class:"mb-3"},ct=t("label",{for:"title",class:"form-label"},"標題",-1),ut={class:"row"},mt={class:"mb-3 col-md-6"},pt=t("label",{for:"category",class:"form-label"},"分類",-1),ht={class:"mb-3 col-md-6"},_t=t("label",{for:"price",class:"form-label"},"單位",-1),gt={class:"row"},bt={class:"mb-3 col-md-6"},ft=t("label",{for:"origin_price",class:"form-label"},"原價",-1),Pt={class:"mb-3 col-md-6"},vt=t("label",{for:"price",class:"form-label"},"售價",-1),yt=t("hr",null,null,-1),wt={class:"mb-3"},Ut=t("label",{for:"description",class:"form-label"},"產品描述",-1),Vt={class:"mb-3"},St=t("label",{for:"content",class:"form-label"},"說明內容",-1),kt={class:"mb-3"},Dt={class:"form-check"},Lt=t("label",{class:"form-check-label",for:"is_enabled"},"是否啟用",-1),Mt={class:"modal-footer"};function $t(l,e,i,g,o,a){const u=P("LoadingButton");return d(),n("div",N,[t("div",j,[t("div",O,[t("div",H,[t("h5",F,[t("span",null,_(i.isNew?"新增":"編輯")+"產品",1)]),G]),t("div",q,[t("div",z,[t("div",J,[t("div",K,[t("div",Q,[W,t("input",{type:"file",accept:".png, .jpg, .jpeg",id:"imageUrl",ref:"imageFile",onChange:e[0]||(e[0]=s=>a.uploadImg(s))},null,544),c(t("input",{type:"text",class:"form-control",placeholder:"請輸入圖片連結","onUpdate:modelValue":e[1]||(e[1]=s=>o.tempProduct.imageUrl=s)},null,512),[[m,o.tempProduct.imageUrl]])]),o.tempProduct.imageUrl?(d(),n("img",{key:0,class:"img-fluid",src:o.tempProduct.imageUrl,alt:"產品圖"},null,8,X)):b("",!0)]),Y,t("input",{class:"mb-2 form-control",type:"file",accept:".png, .jpg, .jpeg",id:"imagesUrl",ref:"imageFile",onChange:e[2]||(e[2]=s=>a.uploadMultiImg(s)),multiple:"",disabled:l.loadingStatus.imagesUrl},null,40,Z),Array.isArray(o.tempProduct.imagesUrl)?(d(!0),n(S,{key:0},E(o.tempProduct.imagesUrl,(s,p)=>(d(),n("div",{class:"mb-2",key:`image${p}`},[t("div",tt,[o.tempProduct.imagesUrl[p]?(d(),n("button",{key:0,type:"button",class:"btn-close","aria-label":"Close",onClick:v=>o.tempProduct.imagesUrl.splice(p,1)},null,8,et)):b("",!0),c(t("input",{type:"text",class:"form-control",placeholder:"請輸入圖片連結","onUpdate:modelValue":v=>o.tempProduct.imagesUrl[p]=v},null,8,ot),[[m,o.tempProduct.imagesUrl[p]]])]),s?(d(),n("img",{key:0,class:"img-fluid",src:s,alt:"產品圖"},null,8,st)):b("",!0)]))),128)):b("",!0),l.loadingStatus.imagesUrl?(d(),n("div",lt,it)):b("",!0),!o.tempProduct.imagesUrl||o.tempProduct.imagesUrl[o.tempProduct.imagesUrl.length-1]?(d(),n("button",{key:2,class:"btn btn-outline-primary btn-sm d-block w-100",disabled:l.loadingStatus.imagesUrl,onClick:e[3]||(e[3]=s=>o.tempProduct.imagesUrl.push(""))}," 新增圖片 ",8,dt)):b("",!0)]),t("div",nt,[t("div",rt,[ct,c(t("input",{id:"title",type:"text",class:"form-control",placeholder:"請輸入標題","onUpdate:modelValue":e[4]||(e[4]=s=>o.tempProduct.title=s)},null,512),[[m,o.tempProduct.title]])]),t("div",ut,[t("div",mt,[pt,c(t("input",{id:"category",type:"text",class:"form-control",placeholder:"請輸入分類","onUpdate:modelValue":e[5]||(e[5]=s=>o.tempProduct.category=s)},null,512),[[m,o.tempProduct.category]])]),t("div",ht,[_t,c(t("input",{id:"unit",type:"text",class:"form-control",placeholder:"請輸入單位","onUpdate:modelValue":e[6]||(e[6]=s=>o.tempProduct.unit=s)},null,512),[[m,o.tempProduct.unit]])])]),t("div",gt,[t("div",bt,[ft,c(t("input",{id:"origin_price",type:"number",min:"0",class:"form-control",placeholder:"請輸入原價","onUpdate:modelValue":e[7]||(e[7]=s=>o.tempProduct.origin_price=s)},null,512),[[m,o.tempProduct.origin_price,void 0,{number:!0}]])]),t("div",Pt,[vt,c(t("input",{id:"price",type:"number",min:"0",class:"form-control",placeholder:"請輸入售價","onUpdate:modelValue":e[8]||(e[8]=s=>o.tempProduct.price=s)},null,512),[[m,o.tempProduct.price,void 0,{number:!0}]])])]),yt,t("div",wt,[Ut,c(t("textarea",{id:"description",type:"text",class:"form-control",placeholder:"請輸入產品描述","onUpdate:modelValue":e[9]||(e[9]=s=>o.tempProduct.description=s)},`
                `,512),[[m,o.tempProduct.description]])]),t("div",Vt,[St,c(t("textarea",{id:"description",type:"text",class:"form-control",placeholder:"請輸入說明內容","onUpdate:modelValue":e[10]||(e[10]=s=>o.tempProduct.content=s)},`
                `,512),[[m,o.tempProduct.content]])]),t("div",kt,[t("div",Dt,[c(t("input",{id:"is_enabled",class:"form-check-input",type:"checkbox","true-value":1,"false-value":0,"onUpdate:modelValue":e[11]||(e[11]=s=>o.tempProduct.is_enabled=s)},null,512),[[C,o.tempProduct.is_enabled]]),Lt])])])])]),t("div",Mt,[h(u,{class:"btn-outline-secondary","data-bs-dismiss":"modal","loading-status":l.loadingStatus.updateProduct},{default:w(()=>[f(" 取消")]),_:1},8,["loading-status"]),h(u,{class:"btn-primary","loading-status":l.loadingStatus.updateProduct,onClick:a.updateProduct},{default:w(()=>[f(" 確認")]),_:1},8,["loading-status","onClick"])])])])],512)}const xt=L(B,[["render",$t]]);var Et={VITE_URL:"https://ec-course-api.hexschool.io/v2",VITE_PATH:"jiayu",BASE_URL:"/2023-vue-week6/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:Tt,VITE_PATH:Ct}=Et,At={components:{LoadingButton:$},props:["product"],data(){return{tempProduct:{},modal:null}},mounted(){this.modal=new M(this.$refs.modal),this.tempProduct=this.product},watch:{product(){this.tempProduct=this.product}},methods:{async delProduct(){try{this.loadingStatus.delProduct=!0;const l=`${Tt}/api/${Ct}/admin/product/${this.tempProduct.id}`,{data:e}=await this.$http.delete(l);this.miniSwal(e.message),this.modal.hide(),this.$emit("getData"),this.loadingStatus.delProduct=!1}catch(l){this.$swals(l.data.message)}},...k(x,["miniSwal"])},computed:{...D(y,["loadingStatus"])}},It={id:"delProductModal",ref:"modal",class:"modal fade",tabindex:"-1","aria-labelledby":"delProductModalLabel","aria-hidden":"true"},Rt={class:"modal-dialog"},Bt={class:"modal-content border-0"},Nt=t("div",{class:"modal-header bg-danger text-white"},[t("h5",{id:"delProductModalLabel",class:"modal-title"},[t("span",null,"刪除產品")]),t("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),jt={class:"modal-body"},Ot={class:"text-danger"},Ht={class:"modal-footer"};function Ft(l,e,i,g,o,a){const u=P("LoadingButton");return d(),n("div",It,[t("div",Rt,[t("div",Bt,[Nt,t("div",jt,[f(" 是否刪除 "),t("strong",Ot,_(o.tempProduct.title),1),f(" 商品(刪除後將無法恢復)。 ")]),t("div",Ht,[h(u,{class:"btn-outline-secondary","data-bs-dismiss":"modal","loading-status":l.loadingStatus.delProduct},{default:w(()=>[f(" 取消")]),_:1},8,["loading-status"]),h(u,{class:"btn-danger","loading-status":l.loadingStatus.delProduct,onClick:a.delProduct},{default:w(()=>[f(" 確認刪除")]),_:1},8,["loading-status","onClick"])])])])],512)}const Gt=L(At,[["render",Ft]]);var qt={VITE_URL:"https://ec-course-api.hexschool.io/v2",VITE_PATH:"jiayu",BASE_URL:"/2023-vue-week6/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:zt,VITE_PATH:Jt}=qt,Kt={components:{ProductModal:xt,DelProductModal:Gt,PaginationComponent:I},data(){return{products:[],tempProduct:{imagesUrl:[]},isNew:!1,pagination:{}}},mounted(){this.showLoading(),this.getAdminProducts()},methods:{async getAdminProducts(l=1){try{const e=`${zt}/api/${Jt}/admin/products?page=${l}`,{data:i}=await this.$http.get(e);this.products=i.products,this.pagination=i.pagination}catch(e){this.$swel(e.data.message)}finally{this.hideLoading()}},openModal(l,e){switch(l){case"new":this.isNew=!0,this.tempProduct={imagesUrl:[]},this.$refs.productModalDom.modal.show();break;case"edit":this.isNew=!1,this.tempProduct=e,this.$refs.productModalDom.modal.show();break;case"del":this.tempProduct=e,this.$refs.delProductModalDom.modal.show();break}},...k(y,["showLoading","hideLoading"])},computed:{...D(y,["isLoading"])}},Qt={class:"container"},Wt={class:"text-end mt-4"},Xt={class:"table mt-4"},Yt=t("thead",null,[t("tr",null,[t("th",{width:"120"}," 分類 "),t("th",null,"產品名稱"),t("th",{width:"120"}," 原價 "),t("th",{width:"120"}," 售價 "),t("th",{width:"100"}," 是否啟用 "),t("th",{width:"120"}," 編輯 ")])],-1),Zt={class:"text-end"},te={class:"text-end"},ee={class:"btn-group"},oe=["onClick"],se=["onClick"];function le(l,e,i,g,o,a){const u=P("LoadingOverlay"),s=P("PaginationComponent"),p=P("ProductModal"),v=P("DelProductModal");return d(),n(S,null,[h(u,{active:l.isLoading},null,8,["active"]),t("div",Qt,[t("div",Wt,[t("button",{class:"btn btn-primary",onClick:e[0]||(e[0]=r=>a.openModal("new"))}," 建立新的產品 ")]),t("table",Xt,[Yt,t("tbody",null,[(d(!0),n(S,null,E(o.products,r=>(d(),n("tr",{key:r.id},[t("td",null,_(r.category),1),t("td",null,_(r.title),1),t("td",Zt,_(r.origin_price),1),t("td",te,_(r.price),1),t("td",null,[t("span",{class:A({"text-success":r.is_enabled})},_(r.is_enabled?"":"未")+"啟用",3)]),t("td",null,[t("div",ee,[t("button",{type:"button",class:"btn btn-outline-primary btn-sm",onClick:T=>a.openModal("edit",r)}," 編輯 ",8,oe),t("button",{type:"button",class:"btn btn-outline-danger btn-sm",onClick:T=>a.openModal("del",r)}," 刪除 ",8,se)])])]))),128))])]),h(s,{pagination:o.pagination,onGetData:a.getAdminProducts},null,8,["pagination","onGetData"])]),h(p,{product:o.tempProduct,"is-new":o.isNew,ref:"productModalDom",onGetData:a.getAdminProducts},null,8,["product","is-new","onGetData"]),h(v,{product:o.tempProduct,ref:"delProductModalDom",onGetData:a.getAdminProducts},null,8,["product","onGetData"])],64)}const re=L(Kt,[["render",le]]);export{re as default};
