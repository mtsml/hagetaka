import React, { useContext } from 'react'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact'
import { Store } from '../store/index'
import { onGame } from '../util/util'

const Table = () => {
    const {state} = useContext(Store)
    const _onGame = onGame(state.proc)

    return (
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
                                <td>{_onGame?player.rank:'―'}</td>
                                <td>{player.name}</td>
                                <td>{_onGame?player.point:'―'}</td>
                                <td>{_onGame?player.hand:'―'}</td>
                            </tr>
                        )
                    })}
                </MDBTableBody>
            </MDBTable>
        </div>
    )
}

export default Table