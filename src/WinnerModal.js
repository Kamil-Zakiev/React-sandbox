import React, { useRef, useEffect } from 'react';
import Modal from './Modal'
import { currentStatus } from './calculateWinner'
import { connect } from 'react-redux'
import { SetAllowModal } from './store/actionCreators'

function WinnerModal({ status, onOkClicked }) {
  const ref = useFocusing();
  return (
    <Modal>
      <div className='winner-panel'>
        {status}
        <div>
          <button
            ref={ref}
            onClick={onOkClicked}
          >
            OK
          </button>
        </div>
      </div>
    </Modal>
  );
}

/**
 * Custom hook example
 */
function useFocusing() {
  const ref = useRef(null);
  useEffect(() => {
    ref.current.focus();
  });
  return ref;
}

function mapStateToProps(state) {
  const [status] = currentStatus(state.history[state.stepNumber]);
  return {
    status
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onOkClicked: () => dispatch(SetAllowModal(false))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WinnerModal);