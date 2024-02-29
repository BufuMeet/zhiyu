<script setup>

</script>

<template>
  <footer>
    <div class="container">
    <div class="left">
      <img class="logo01" src="@/imgs/logo02.png" alt="">
      <img class="logo02" src="@/imgs/foot-factory.png" alt="">
    </div>
    <div class="center">
      <ul>
        <li>关于我们</li>
        <li>|</li>
        <li>联系我们</li>
        <li>|</li>
        <li>意见反馈</li>
        <li>|</li>
        <li>版权声明</li>
      </ul>
      <div>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus, consequuntur soluta facere totam eligendi recusandae earum hic, cum tenetur debitis quis exercitationem .</div>
      
    </div>
    <div class="right">
        <ul>
          <li>
            <img src="@/imgs/course.png" alt="">
            <span>官方微信</span>
          </li>
          <li>
            <img src="@/imgs/course.png" alt="">
            <span>指导老师微信</span>
          </li>
        </ul>
     
    </div>
  </div>
  </footer>
</template>

<style scoped>
footer{
  width: 100%;
    background-color: #3483FF;
  .container{
    width: 1000px;
  display: flex;
  width: 1000px;
  margin: 0 auto;
  justify-content: space-around;
  align-items: center;
  height: 187px;

  .left{
    display: flex;
    align-items: center;
    .logo01{
      width: 127px;
      height: 50px;
    }
    .logo02{
      height: 110px;
      width: 130px;
      padding-right:17px;
    }
  }
  .center{
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    font-size: 12px;

    ul{
      display: flex;
      align-items: center;
    }
    

  }
  .right{
        ul{
      display: flex;
      color: #fff;
      
      li{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-wrap: nowrap;
        padding: 10px;
        img{
          height: 70px;
          width: 70px;
          
        }
        span{
          margin-top: 5px;
        }
      }
    }
  }
}
}
</style>