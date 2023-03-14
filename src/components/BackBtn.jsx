import { useLocation, useNavigate } from 'react-router-dom';
function BackBtn() {
  const navigate = useNavigate();
    const {pathname} = useLocation()
  const handleClick = () => {
    navigate(-1)
  }

  if (pathname === "/") {
    return null
  }


  return (
    <div className='absolute top-5 left-5'>
      <button onClick={handleClick}>☚</button>
    </div>
  );
}

export default BackBtn;