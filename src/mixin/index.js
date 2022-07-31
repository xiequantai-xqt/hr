export default {
  methods: {
    checkPerm(btnName) {
      return this.$store.state.user.userInfo.roles.points.includes(btnName)
    }
  }
}
