<template>
  <div class="userInfo">
    <header class="header">
      <van-nav-bar
        title="个人信息"
        left-arrow
        @click-left="onClickLeft"
      />
    </header>
    <div class="content">
      <!-- 用户头像 -->
      <div class="avatar">
        <van-field
          readonly
          label="头像"
        />
      </div>
      <!-- 用户名 -->
      <div class="userName">
         <van-field
          readonly
          label="用户名"
          :value="userName"
        />
      </div>
      <!-- 昵称 -->
      <div class="nickName">
         <van-field
          readonly
          label="昵称"
          :value="nickName"
          is-link
        />
      </div>
      <!-- 性别 -->
      <div class="gender">
        <van-field
          readonly
          clickable
          label="性别"
          :value="value"
          @click="showPicker = true"
          is-link
        />
        <van-popup
          v-model="showPicker"
          round
          position="bottom"
          safe-area-inset-bottom
        >
          <van-picker
            visible-item-count="2"
            show-toolbar
            :columns="columns"
            @cancel="showPicker = false"
            @confirm="onConfirm"
          />
        </van-popup>
      </div>
      <!-- 出生日期 -->
      <div class="birthday">
        <van-field
          readonly
          clickable
          label="出生日期"
          :value="timeValue"
          @click="showTimePicker = true"
          is-link
        />
        <van-popup
          v-model="showTimePicker"
          round
          position="bottom"
          safe-area-inset-bottom
        >
         <van-datetime-picker
            @confirm="confirmFn"
             @cancel="showTimePicker = false"
            v-model="currentDate"
            type="date"
            :min-date="minDate"
            :max-date="maxDate"
          />
        </van-popup>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'userInfo',
  data () {
    return {
      userName: '',
      nickName: '',
      value: '',
      timeValue: '',
      showPicker: false,
      showTimePicker: false,
      columns: ['男', '女', '保密'],
      minDate: new Date(1930, 0, 1),
      maxDate: new Date(),
      currentDate: new Date()
    }
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    // 选择性别
    onConfirm (value) {
      this.value = value
      this.showPicker = false
      this.updateUser()
    },
    // 选择生日
    confirmFn () {
      this.timeValue = this.timeFormat(this.currentDate)
      this.showTimePicker = false
      this.updateUser()
    },
    // 时间格式化
    timeFormat (time) {
      const year = time.getFullYear()
      const month = time.getMonth() + 1
      const day = time.getDate()
      return year + '年' + month + '月' + day + '日'
    },
    // 更新用户信息
    updateUser () {
      let gender = 0
      if (this.value === '男') {
        gender = 1
      } else if (this.value === '女') {
        gender = 2
      } else {
        gender = -1
      }
      const update = {
        user_sex: gender,
        user_birthday: this.timeValue,
        user_nickname: this.nickName
      }
      this.$apis.updateUserInfo({
        user_id: localStorage.getItem('_uuid'),
        update
      })
    },
    // 获取用户信息
    getUserInfo () {
      const _uuid = localStorage.getItem('_uuid')
      this.$apis.getUserInfo({
        user_id: _uuid
      }).then(res => {
        const user = res.data.data
        this.userName = user.user_name
        this.nickName = user.user_nikename
        switch (user.user_sex) {
          case 1:
            this.value = '男'
            break
          case 2:
            this.value = '女'
            break
          case -1:
            this.value = '保密'
            break
        }
        this.timeValue = user.user_birthday
      })
    }
  },
  mounted () {
    this.getUserInfo()
  }
}
</script>

<style lang="stylus" scoped>
  .content
    height calc(100vh - .46rem)
    background #f7f7f7
    /deep/ .van-field__control
      color #ccc
      text-align right
</style>
