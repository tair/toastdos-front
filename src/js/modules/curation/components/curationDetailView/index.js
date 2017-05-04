import { connect } from 'react-redux';
import CurationDetailView from './curationDetailView';

const ConnectedCurationDetailView = connect(
  () =>({}),
  () =>({})
)(CurationDetailView);

export default ConnectedCurationDetailView;
