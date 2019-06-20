import React, {useRef, useEffect} from 'react';
import Modal from './Modal'

import {connect} from 'react-redux'
import {SetAllowModal} from './store/actionCreators'

function WinnerModal(props) {
    const ref = useFocusing();
    return (
        <Modal>
            <div className='winner-panel'>
                {props.status}
                <div>
                    <button
                        ref={ref}
                        onClick={props.onOkClicked}
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

function mapDispatchToProps(dispatch) {
    return {
        onOkClicked: () => dispatch(SetAllowModal(false))
    };
}

export default connect(null, mapDispatchToProps)(WinnerModal);