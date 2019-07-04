import { useEffect } from 'react'
import ReactDOM from 'react-dom';

const modalRoot = document.getElementById('modal-root');

export default function Modal({ children }) {
	// todo: add get or create...
	const el = document.createElement('div');
	el.classList.add('modal');

	useEffect(() => {
		modalRoot.appendChild(el);
		return () => modalRoot.removeChild(el);
	}, [el]);

	return ReactDOM.createPortal(children, el);
}