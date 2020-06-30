import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateState } from '../redux/reducers/play'

const Playgame = () => {
  let timeoutId = null
  const array = useSelector((store) => store.play.array)
  const size = useSelector((store) => store.play.size)
  const dispatch = useDispatch()

  const userScore = array.filter((it) => it.stat === 'user').length

  const computerScore = array.filter((it) => it.stat === 'computer').length

  const getRandomField = () => {
    if (userScore <= array.length / 2 && computerScore <= array.length / 2) {
      const gameFieldFree = array.filter((it) => it.stat === 'free')
      return gameFieldFree[Math.floor(Math.random() * gameFieldFree.length)].id
    }
    return null
  }

  const selected = getRandomField(array)

  function chooseNextRound() {
      timeoutId = setTimeout(() => {
        dispatch(updateState(selected, 'computer'))
      }, 3000)
      //  clearTimeout(timeoutId)
      getRandomField()
  }

  useEffect(() => {
    if (selected !== null) {
    chooseNextRound(selected)
  }}, [selected])

  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        Score: {userScore}
        <div className="flex flex-wrap" style={{ flexBasis: `${size.iks * 100}px` }}>
          {array.map((it) => {
            const classes = `
             ${it.stat === 'free' ? ' bg-gray-200' : ''}
             ${it.id === selected ? ' bg-yellow-200' : ''}
             ${it.stat === 'user' ? ' bg-green-200' : ''}
             ${it.stat === 'computer' ? ' bg-red-200' : ''}
            `
            return (
              <button
                className={`block box-border h-100px w-100x hover:bg-blue-700 text-white font-bold py-2 px-2 rounded ${classes}`}
                key={it.id}
                type="button"
                aria-label="click"
                onClick={() => {
                  if (it.id === selected) {
                    dispatch(updateState(it.id, 'user'))
                    clearTimeout(timeoutId)
                  }
                }}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

Playgame.propTypes = {}

export default React.memo(Playgame)
