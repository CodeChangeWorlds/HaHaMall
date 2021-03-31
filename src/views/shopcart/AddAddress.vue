<template>
  <div class="addAddr">
    <header class="header">
      <van-nav-bar
        title="新增地址"
        left-arrow
        @click-left="onClickLeft"
      />
    </header>
    <div class="content">
      <van-address-edit
        show-set-default
        :area-list="areaList"
        show-postal
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
      />
    </div>
  </div>
</template>

<script>
import areaList from '@/utils/area.js'
export default {
  name: 'addAddress',
  data () {
    return {
      areaList,
      searchResult: []
    }
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    onSave (data) {
      const id = localStorage.getItem('_uuid')
      this.$apis.addAddr({
        user_id: id,
        areaCode: data.areaCode,
        consignee: data.name,
        telephone: data.tel,
        region: (data.province) + (data.city) + (data.county),
        detailedAddress: data.addressDetail,
        postalCode: data.postalCode,
        primary: data.isDefault
      }).then(() => {
        this.$toast('地址添加成功')
        this.$router.back()
      })
    }
  }
}
</script>

<style>

</style>
