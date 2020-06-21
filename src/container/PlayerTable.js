import React, { useContext } from 'react'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact'
import ShareButtons from './ShareButtons'
import { Store } from '../store/index'
import { onGame, getResultMessage, getRank } from '../util/util'
import { PROC, URL, MSG_SHARE } from '../util/const'

const PlayerTable = () => {
    const {state} = useContext(Store)
    const _onGame = onGame(state.proc)

    return (
        <>
            <div className='htable'>
                <MDBTable>
                    <MDBTableHead>
                        <tr>
                            <th>rank</th>
                            <th>name</th>
                            <th>point</th>
                            <th>hand</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {state.players.map((player) => {
                            return (
                                <tr 
                                    className={
                                        _onGame?
                                            player.butting?
                                                'butting':
                                                player.id===state.id?
                                                    state.point>0?
                                                        'winner':
                                                        'loser'
                                                    :''
                                            :''
                                    }
                                >
                                    <td>{_onGame?`${player.rank}位`:'―'}</td>
                                    <td>{player.name}</td>
                                    <td>{_onGame?`${player.point}P`:'―'}</td>
                                    <td>{_onGame?player.hand:'―'}</td>
                                </tr>
                            )
                        })}
                    </MDBTableBody>
                </MDBTable>
            </div>
            {state.proc===PROC.RESULT&&
                <ShareButtons message={MSG_SHARE} url={URL} title={getResultMessage(state.point, getRank(state))}/>
            }
        </>
    )
}

export default PlayerTable