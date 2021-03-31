<template>
  <div class="address">
    <header class="header">
      <van-nav-bar
        title="地址列表"
        left-arrow
        @click-left="onClickLeft"
      />
    </header>
    <div class="content">
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
        @select="checked"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'changeAddress',
  data () {
    return {
      chosenAddressId: '',
      list: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    // 返回上一页
    onClickLeft () {
      this.$router.back()
    },
    // 新增地址
    onAdd () {
      this.$router.push('/addAddress')
    },
    // 选中地址
    checked (item) {
      this.$apis.selectAddr({
        user_id: localStorage.getItem('_uuid'),
        _id: item.id
      })
    },
    // 编辑地址
    onEdit (item) {
      this.$router.push(`editAddress/${item.id}`)
    },
    init () {
      const id = localStorage.getItem('_uuid')
      this.$apis.getAddr({
        user_id: id
      }).then(res => {
        this.list = this.transferData(res.data.data)
        if (!res.data.data.find(data => data.checked)) {
          return false
        } else {
          this.chosenAddressId = res.data.data.find(data => data.checked)._id
        }
      })
    },
    // 转换value
    transferData (list) {
      return list.map(item => (
        {
          id: item._id,
          name: item.consignee,
          tel: item.telephone,
          address: (item.region) + (item.detailedAddress),
          isDefault: item.primary
        }
      ))
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
