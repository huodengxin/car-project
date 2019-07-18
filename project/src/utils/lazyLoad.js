
export default function LazyLoad(el,y=0){
   this.el=el;
   this.y=Math.abs(y)+window.innerHeight;
   this.init()
}

LazyLoad.prototype.init=function(){
    if(this.y>window.innerHeight){
        this.loading()
        return 
    }
    this.loading()
}

LazyLoad.prototype.loading=function(){
    this.el.forEach((item,index)=>{
        if(item.src==item.getAttribute('data-src')){
            return 
        }
        if(item.offsetTop<this.y){
            item.src=item.getAttribute('data-src');
        }
    })
}
