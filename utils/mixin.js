import { mapGetters, mapActions } from 'vuex'
export const appMixin = {
  computed: {
    ...mapGetters([
        'deviceInfo',
        'loginKey'
    ])
  },
  data() {
    return {

    }
  },
  methods: {
    ...mapActions([
        'setDeviceInfo',
        'setLoginKey'
    ])
  }
}