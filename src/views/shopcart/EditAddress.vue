<template>
  <div class="editAddress">
    <header class="header">
      <van-nav-bar
        title="编辑地址"
        left-arrow
        @click-left="onClickLeft"
      />
    </header>
    <div class="content">
     <van-address-edit
      :area-list="areaList"
      show-postal
      :address-info="info"
      show-delete
      show-set-default
      @save="onSave"
      @delete="onDelete"
    />
    </div>
  </div>
</template>

<script>
import areaList from '@/utils/area.js'
export default {
  name: 'editAddress',
  data () {
    return {
      areaList,
      phone: '',
      detailedAddress: '',
      info: {
        name: '',
        tel: 0,
        isDefault: true,
        postalCode: 0,
        areaCode: 0,
        addressDetail: ''
      }
    }
  },
  mounted () {
    this.$apis.addr({
      user_id: localStorage.getItem('_uuid'),
      _id: this.$route.params.id
    }).then(res => {
      const info = res.data.data[0]
      this.info.name = info.consignee
      this.info.tel = info.telephone
      this.info.addressDetail = info.detailedAddress
      this.info.isDefault = info.primary
      this.info.postalCode = info.postalCode
      this.info.areaCode = String(info.areaCode)
    })
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    // 删除地址
    onDelete () {
      const userId = localStorage.getItem('_uuid')
      this.$apis.delAddr({
        user_id: userId,
        _id: this.$route.params.id
      }).then(() => {
        this.$toast('地址删除成功')
        this.$router.back()
      })
    },
    onSave (data) {
      const id = localStorage.getItem('_uuid')
      let ck = false
      this.$apis.addr({
        user_id: id,
        _id: this.$route.params.id
      }).then(res => {
        ck = res.data.data[0].checked
        const updateParams = {
          areaCode: data.areaCode,
          consignee: data.name,
          telephone: data.tel,
          region: (data.province) + (data.city) + (data.county),
          detailedAddress: data.addressDetail,
          postalCode: data.postalCode,
          primary: data.isDefault,
          checked: ck
        }
        this.$apis.editAddr({
          user_id: id,
          updateParams,
          _id: this.$route.params.id
        }).then(() => {
          this.$toast('地址修改成功')
          this.$router.back()
        })
      })
    }
  }
}
</script>

<style>

</style>
