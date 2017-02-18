import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { logout } from '../../actions';
import { jwtExpiration } from '../../selectors';

import TokenWatchdog from './TokenWatchdog';

const mapStateToProps = createStructuredSelector({
    expirationTime: jwtExpiration,
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
});

const ConnectedTokenWatchdog = connect(
  mapStateToProps,
  mapDispatchToProps
)(TokenWatchdog);

export default ConnectedTokenWatchdog;
