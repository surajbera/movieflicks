// libraries
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import { ImCancelCircle } from "react-icons/im";

// styles
import "./SearchModal.scss";

type SearchModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = event.currentTarget.query.value;
    onClose();
    navigate(`/search?query=${encodeURIComponent(query)}`);
  };

  if (!isOpen) return null;

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div className='modal-overlay'>
      <div className='modal-content'>
        <form action='/search' method='GET' onSubmit={handleSubmit}>
          <input type='text' placeholder='Search movies...' name='query' autoFocus />
        </form>
        <button onClick={onClose}>
          <ImCancelCircle />
        </button>
      </div>
    </div>,
    modalRoot
  );
}
