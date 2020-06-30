import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSizeone, setSiztwo } from '../redux/reducers/play'
import { history } from '../redux'

const Input = () => {
  const size = useSelector((store) => store.play.size)
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
    <div>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="X">
            X
          </label>
          <input
            className="shadow appearance-none border rounded w-10 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={size.iks}
            onChange={onChange1}
          />
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Y">
            Y
          </label>
          <input
            className="shadow appearance-none border rounded w-10 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={size.vert}
            onChange={onChange2}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={() => history.push('/board')}
          >
            Go
          </button>
        </div>
      </form>
    </div>
  )
}

Input.propTypes = {}

export default React.memo(Input)
