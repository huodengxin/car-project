export default function imitationShake(ck,ms=500){
    let timer=null;
    return function(){
        clearTimeout(timer);
        timer=setTimeout(()=>{
            ck()
        },ms)
    }
}