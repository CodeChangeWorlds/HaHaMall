<template>
  <div class="container">
    <div class="loader"></div>
  </div>
</template>

<style lang="scss" scoped>
  :root {
    --color1: #6685F4;
    --color2: #EA4335;
    --color3: #FBBC05;
    --color4: #53AB34;
  }
  .loader {
    position: relative;
    width: 15px;
    height: 15px;
    transform: rotate(45deg);
  }

  .loader::after,
  .loader::before {
    position: absolute;
    content: '';
    top:50%;
    left: 50%;
    width: 15px;
    height: 15px;
    border-radius: 15px;
    transform: translate(-50%,-50%);
    animation: animate 1s ease-in-out infinite;
  }

  .loader::after {
    box-shadow: 15px 15px var(--color1), -15px -15px var(--color2);
  }

  .loader::before {
    box-shadow: 15px 15px var(--color3), -15px -15px var(--color4);
    transform: translate(-50%,-50%) rotate(90deg);
  }

  @keyframes animate{
    50%{
      width: 40px;
    }
  }
</style>>
