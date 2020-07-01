import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateState, setTimeoutID, clearT} from '../redux/reducers/play'
import './playgame.scss'

const Playgame = () => {
  let timeoutId = null
  const array = useSelector((store) => store.play.array)
  const size = useSelector((store) => store.play.size)
  const dispatch = useDispatch()

  const userScore = array.filter((it) => it.stat === 'user').length

  const computerScore = array.filter((it) => it.stat === 'computer').length

  const winner = () => {
    let data = ''
    if (computerScore >= array.length / 2) { data = 'Computer win'}
    if (userScore >= array.length / 2 ) { data = 'You win' }
    return data
  }

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
    }, 1000)
    dispatch(setTimeoutID(timeoutId))
    //   getRandomField()
  }

  useEffect(() => {
    if (selected !== null) {
      chooseNextRound(selected)
    }
  }, [selected])

  const x = size.iks

  return (

     <div className=" flex items-center justify-center border border-red-600 w-700px h-screen">
        <div className="flex flex-col border border-red-600" style={{ flexBasis: `${x * 48} px` }}>
        <div>  {winner() } </div>
  <div> Score: {userScore}</div>
          <div>
            <div
              className="flex flex-row flex-wrap border border-gray-700" style={{ flexBasis: `${x * 48} px`}}
            >
              <div>
                {array.map((it) => {
                  const classes = `
             ${it.stat === 'free' ? ' bg-gray-200' : ''}
             ${it.id === selected ? ' bg-yellow-200' : ''}
             ${it.stat === 'user' ? ' bg-green-200' : ''}
             ${it.stat === 'computer' ? ' bg-red-200' : ''}
            `
                  return (
                    <button
                      className={`box border-gray-500 h-25 w-25 hover:bg-blue-700 rounded border-2${classes}`}
                      key={it.id}
                      type="button"
                      aria-label="click"
                      onClick={() => {
                        if (it.id === selected) {
                          dispatch(updateState(it.id, 'user'))
                          dispatch(clearT(timeoutId))
                        }
                      }}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

Playgame.propTypes = {}

export default React.memo(Playgame)
