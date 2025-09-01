import { FaArrowLeftLong } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

const Goback = () => {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <>
      <div style={{ padding: '10px', cursor: 'pointer' }}>
        <i onClick={handleGoBack}>
          <FaArrowLeftLong size={30} />
        </i>
      </div>
    </>
  )
}
export default Goback
