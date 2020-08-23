import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSizeone, setSiztwo, setHardMode } from '../redux/reducers/play'
import { history } from '../redux'

const Input = () => {
  const hard = useSelector((store) => store.play.hard)
  const iks = useSelector((store) => store.play.iks)
  const vert = useSelector((store) => store.play.vert)
  const dispatch = useDispatch()
  const onChange1 = (e) => {
    if (typeof +e.target.value === 'number') {
      dispatch(setSizeone(Math.min(Math.max(+e.target.value, 0), 10)))
    }
  }

  const onChange2 = (e) => {
    if (typeof +e.target.value === 'number') {
      dispatch(setSiztwo(Math.min(Math.max(+e.target.value, 0), 10)))
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col w-64 h-64 bg-yellow-300 shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-10 py-2 px-3 mr-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={iks}
            onChange={onChange1}
          />
          <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="X">
            X
          </label>
        </div>
        <div>
          <input
            className="shadow appearance-none border rounded w-10 py-2 px-3 mr-4 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={vert}
            onChange={onChange2}
          />
          <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="Y">
            Y
          </label>
        </div>
        <div>
          <input
            className="shadow border rounded mr-2 mb-4 mt-4 ml-2"
            type="checkbox"
            checked={hard}
            onClick={() => {
              dispatch(setHardMode(!hard))
            }}
          />
          <label htmlFor="scales">Hard mode</label>
        </div>
        <div>
          <button
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 mt-4 rounded"
            type="button"
            onClick={() => history.push('/board')}
          >
            Go
          </button>
        </div>
      </div>
    </div>
  )
}

Input.propTypes = {}

export default React.memo(Input)
