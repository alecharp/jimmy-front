export default {
  getDisplayName: state =>
    state.user ? `${state.user.firstName} ${state.user.lastName}` : ''
}
