import { mapState } from 'vuex'
import VInput from '@/components/input.vue'
import VBox from '@/components/box.vue'
import VBtn from '@/components/btn'

export default {
  created() {
    document.title = this.$t('m.pageTitle.activationSuccess')
  },
  computed: {
    ...mapState('currentUser', ['currentUser']),
  },
  components: {
    VInput,
    VBox,
    VBtn,
  },
  methods: {
    login() {
      if (this.currentUser) {
        window.location.href = '/'
      } else {
        window.location.href = '/signin'
      }
    },
  },
}
