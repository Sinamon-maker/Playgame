import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createArray, updateState } from '../redux/reducers/play'
import { history } from '../redux'
import './playgame.scss'

const Playgame = () => {
  const [tid, setTimeoutID] = useState(null)
  const [timeSwitch, setTimeswitch] = useState(1000)
  const gameFild = useSelector((store) => store.play.gameFild)
  const hard = useSelector((store) => store.play.hard)
  const iks = useSelector((store) => store.play.iks)
  const vert = useSelector((store) => store.play.vert)
  const selected = useSelector((store) => store.play.selected)
  const dispatch = useDispatch()

  const hardVal = () => {
    if (hard) {
      return 0.05 * timeSwitch
    }
    return 0
  }

  const userScore = gameFild.filter((it) => it.stat === 'user').length

  const computerScore = gameFild.filter((it) => it.stat === 'computer').length

  const winner = () => {
    let data = ''
    if (computerScore >= gameFild.length / 2) {
      data = 'Computer win'
    }
    if (userScore >= gameFild.length / 2) {
      data = 'You win'
    }
    return data
  }

  const updateRoundState = (id, parameter, val) => {
    dispatch(updateState(id, parameter))
    setTimeswitch(timeSwitch + val)
    clearTimeout(tid)
  }

  function chooseNextRound(selected2) {
    if (selected2 !== null) {
      const timeoutId = setTimeout(() => {
        updateRoundState(selected2, 'computer', hardVal())
      }, timeSwitch)
      setTimeoutID(timeoutId)
    }
  }

  useEffect(() => {
    chooseNextRound(selected)
  }, [selected])

  useEffect(() => {
    dispatch(createArray(iks, vert))
  }, [iks, vert])

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen w-screen">
        <div className="bg-yellow-400">
          <div className="h-10 px-2 py-1"> {winner()} </div>
          <div className="px-2 py-1">
            {' '}
            Score: {userScore} {timeSwitch}{' '}
          </div>
          <div
            className="flex flex-row flex-wrap"
            style={{ width: `${iks * 48}px`, height: `${vert * 48}px` }}
          >
            {gameFild.map((it) => {
              const classes = `
             ${it.stat === 'free' ? ' bg-orange-200' : ''}
             ${it.id === selected ? ' bg-yellow-400' : ''}
             ${it.stat === 'user' ? ' bg-green-300' : ''}
             ${it.stat === 'computer' ? ' bg-red-300' : ''}
            `
              return (
                <button
                  className={`box border-gray-500 rounded border-2${classes}`}
                  key={it.id}
                  type="button"
                  aria-label="click"
                  onClick={() => {
                    if (it.id === selected) {
                      updateRoundState(it.id, 'user', -1 * hardVal())
                    }
                  }}
                />
              )
            })}
          </div>
          <div className="h-20 flex justify-between">
            <div>
              <button
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 mt-4 rounded"
                type="button"
                onClick={() => history.push('/')}
              >
                Back
              </button>
            </div>
            <div>
              <button
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 mt-4 rounded"
                type="button"
                onClick={() => dispatch(createArray(iks, vert))}
              >
                New
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Playgame.propTypes = {}

export default React.memo(Playgame)
