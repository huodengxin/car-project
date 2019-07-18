<template>
    <div class="success">
        <div class="wrap">
            <img src="../assets/q-icon.png" alt="">
            <p>询价成功</p>
            <p class="color">稍后有专业汽车顾问为你服务<br>请保持手机畅通</p>
            <div>
                <button @click="$emit('successEmit')">确定</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.success{
    position: fixed;
    z-index: 101;
    top: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    background: rgba(0,0,0,.5);
    display: -webkit-box;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    .wrap{
        animation: e .3s ease forwards;
        height: auto;
        background: #fff;
        border-radius: .2rem;
        padding: .3rem .3rem 0;
        text-align: center;
        display: inline-block;
        width: 76%;
        overflow: hidden;
        img{
            width: .8rem;
            display: block;
            margin: 0 auto .3rem;
        }
        .color{
            font-size: .24rem;
            color: silver;
            margin: .15rem;
        }
        p{
            &:first-child{
                font-size: .4rem;
                color: #3cc144;
                margin: .1rem;
            }
        }
        >div{
            width: 120%;
            margin-left: -10%;
            height: .8rem;
            margin-top: .3rem;
            border-top: 1px solid #f4f4f4;
            button{
                    border: none;
            width: 50%;
            background: transparent;
            font-size: .3rem;
            line-height: .8rem;
            padding: 0;
            color: #3aacff;
            }
        }
    }
}
</style>
