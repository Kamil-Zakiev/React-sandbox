import React, {useRef, useEffect} from 'react';
import Modal from './Modal'

export default function WinnerModal(props) {
    const ref = useFocusing();
    return (
        <Modal>
            <div className='winner-panel'>
                {props.status}
                <div>
                    <button
                        ref={ref}
                        onClick={props.onClick}
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