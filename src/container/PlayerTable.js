import React, { useContext } from 'react'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit'
import ShareButtons from './ShareButtons'
import { Store } from '../store/index'
import { onGame, getResultMessage } from '../util/util'
import { PROC, URL, MSG_SHARE } from '../util/const'

const PlayerTable = () => {
    const {state} = useContext(Store)
    const _onGame = onGame(state.proc)

    return (
        <>
            <div className='h-table'>
                <MDBTable>
                    <MDBTableHead>
                        <tr>
                            <th>順位</th>
                            <th>名前</th>
                            <th>ポイント</th>
                            <th>手札</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {state.players.map((player) => {
                            return (
                                <tr 
                                    className={
                                        _onGame?
                                            player.butting?
                                                'h-butting':
                                                player.id===state.id?
                                                    state.point>0?
                                                        'h-positive':
                                                        'h-negative'
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
                <ShareButtons message={MSG_SHARE} url={URL} title={getResultMessage(state)}/>
            }
        </>
    )
}

export default PlayerTable