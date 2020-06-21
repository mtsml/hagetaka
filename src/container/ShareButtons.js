import React from 'react'
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, LineShareButton, LineIcon} from 'react-share'

const ShareButtons = (props) => {
    return (
        <div className='share'>
            {props.message&&<h1 className='message'>{props.message}</h1>}
            <FacebookShareButton url={props.url} title={props.title}>
                <FacebookIcon size='32' round={true}/>
            </FacebookShareButton>
            <TwitterShareButton url={props.url} title={props.title}>
                <TwitterIcon size='32' round={true}/>
            </TwitterShareButton>
            <LineShareButton url={props.url} title={props.title}>
                <LineIcon size='32' round={true}/>
            </LineShareButton>
        </div>
    )    
}

export default ShareButtons