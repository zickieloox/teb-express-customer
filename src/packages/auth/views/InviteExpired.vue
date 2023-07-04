<template>
  <div class="pages page-blank">
    <div class="invite-expired">
      <div class="logo">
        <img alt="home" src="~@/assets/img/logo.svg" class="main-logo" />
      </div>
      <div class="info">
        <h1>Liên kết đã hết hạn</h1>
        <p>Bạn đã tạo tài khoản hoặc chủ sở hữu tài khoản đã xóa lời mời.</p>
        <p
          >Yêu cầu liên kết mời mới từ chủ sở hữu tài khoản hoặc
          <a href="/sign-in">đăng nhập</a>.</p
        >
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.invite-expired {
  background: #fff;
  width: 400px;
  margin: 100px auto;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -100%);
  padding: 24px;
  border-radius: 8px;

  .info {
    padding: 16px 0;
  }

  .logo {
    margin-bottom: 16px;
  }

  h1 {
    font-size: 24px;
    font-weight: 600;
    line-height: 28px;
  }

  p {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    margin-bottom: 8px;
  }

  a {
    color: #00908b;
  }

  @media (max-width: 450px) {
    width: 100%;
    position: relative;
    transform: translate(0, 0);
    left: 0;
    top: 0;
  }
}
</style>
